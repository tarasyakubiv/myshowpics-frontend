const React = require('react'),
  ReactDOM = require('react-dom'),
  request = require('axios')

const fD = ReactDOM.findDOMNode

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
        return ( option.name.toLowerCase().includes(event.target.value.toLowerCase()))
      }))
    }, function(){
    })
  }
  addOption(event) {
    this.props.createHandler(this.props.options, this.props.collectionName, this.state.currentOption);
  }
  addExisting(item) {
    this.props.addHandler(this.props.options, this.props.collectionName, item);
  }
  render() {
    return (
      <div className="form-group">
        <input type="text"
          onKeyUp={(event)=>(event.keyCode==13)?this.addOption():''}
          className="form-control option-name"
          onChange={this.filter}
          value={this.currentOption}
          placeholder={this.props.placeholder}>
        </input>
        {this.state.filteredOptions.map((option)=>{
          return <div class="fl-left" key={option._id}>
              <button onClick={this.addExisting.bind(this, option)} class="btn btn-info">{option.name}</button>
          </div>
        })}
        {(()=>{
          if (this.state.filteredOptions.length == 0 && this.state.currentOption!='')
            return <a className="btn btn-info option-add" onClick={this.addOption}>
              Add {this.state.currentOption}
            </a>
        })()}
      </div>
    )
  }
}

export default Autocomplete;