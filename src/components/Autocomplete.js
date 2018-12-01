const React = require('react'),
  request = require('axios')

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {options: [],
      filteredOptions: [],
      currentOption: ''
    }
    this.filter = this.filter.bind(this)
    this.addOption = this.addOption.bind(this)
  }
  componentDidMount() {
    request({url: this.props.url})
      .then(response=>response.data)
      .then(body => {
        if(!body){
          return console.error('Failed to load')
        }
      this.setState({options: body})
      })
      .catch(console.error)
  }

  filter(event) {
    this.setState({
      currentOption: event.target.value,
      filteredOptions: (this.state.options.filter(function(option){
        return ( event.target.value.length>0?option.name.toLowerCase().includes(event.target.value.toLowerCase()):false)
      }))
    }, function(){
    })
  }

  addOption() {
    this.props.createHandler(this.props.options, this.props.collectionName, this.state.currentOption);
    this.setState({ currentOption: "", filteredOptions: []}, () => {
      document.getElementById(this.props.collectionName+"-autocomplete").value = ""
    })
    
  }
  addExisting(item) {
    this.props.addHandler(this.props.options, this.props.collectionName, item);
    this.setState({ currentOption: "", filteredOptions: []}, () => {
      document.getElementById(this.props.collectionName+"-autocomplete").value = ""
    })
  }

  render() {
    return (
      <div className="form-group">
        <input type="text" id={`${this.props.collectionName}-autocomplete`}
          onKeyUp={(event)=>(event.keyCode==13)?this.addOption():''}
          className="form-control option-name"
          onChange={this.filter}
          value={this.currentOption}
          placeholder={this.props.placeholder}>
        </input>
        <div class={`${this.props.collectionName}-options`}>
        {this.state.filteredOptions.map((option)=>{
          return <div class="fl-left" key={option._id}>
              <button onClick={this.addExisting.bind(this, option)} class="btn btn-info">{option.name}</button>
          </div>
        })}
        {(()=>{
          if (this.state.filteredOptions.length == 0 && this.state.currentOption!='' && this.props.creator !== "false")
            return <a className="btn btn-info option-add" onClick={this.addOption}>
              Add {this.state.currentOption}
            </a>
        })()}
        </div>
      </div>
    )
  }
}

export default Autocomplete;