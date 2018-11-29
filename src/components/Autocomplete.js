const React = require('react'),
  ReactDOM = require('react-dom'),
  request = require('axios')

const fD = ReactDOM.findDOMNode

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {options: this.props.options,
      filteredOptions: this.props.options,
      currentOption: ''
    }
    this.filter = this.filter.bind(this)
    this.addOption = this.addOption.bind(this)
  }
  componentDidMount() {
    if (this.props.url == 'test') return true
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
    // console.log(event)
    this.setState({
      currentOption: event.target.value,
      filteredOptions: (this.state.options.filter(function(option, index, list){
        return (event.target.value === option.name.substr(0, event.target.value.length))
      }))
    }, function(){
    })
  }
  addOption(event) {
    let currentOption = this.state.currentOption
    request
      .post(this.props.url, {name: currentOption})
      .then(response => request.patch("http://localhost:8090/"+this.props.parentName+"/"+this.props.parentId+"/"+this.props.collectionName+"/"+response.data.id))
      .then(() => {
        window.location.reload();
      })
      .catch(error=>{return console.error('Failed to save')})
  }
  addExisting(tagId) {
    request.patch("http://localhost:8090/"+this.props.parentName+"/"+this.props.parentId+"/"+this.props.collectionName+"/"+tagId)
    .then(() => {
      window.location.reload();
    })
    .catch(error=>{return console.error('Failed to save')})
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
          return <div key={option._id}>
              <button onClick={this.addExisting.bind(this, option.id)} class="btn btn-info">{option.name}</button>
          </div>
        })}
        {(()=>{
          if (this.state.filteredOptions.length == 0 && this.state.currentOption!='')
            return <a className="btn btn-info option-add" onClick={this.addOption}>
              Add #{this.state.currentOption}
            </a>
        })()}
      </div>
    )
  }
}

export default Autocomplete;