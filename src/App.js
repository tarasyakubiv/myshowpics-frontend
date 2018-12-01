import React, { Component } from 'react';
import './App.css';
import ImageSearch from './components/ImageSearch';
import ImageUpdate from './components/ImageUpdate';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      searchTags: [],
      searchShows: [],
      searchContestants: [],
      andTag: false,
      andContestant: false,
      updateTags: [],
      updateShows: '',
      updateContestants: [],
      toggleChange: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this)
    this.setUpdateData = this.setUpdateData.bind(this)
  }

  setSearchResults(images, tags, shows, contestants, andTag, andContestant) {
    this.setState({images, searchTags: tags, searchShows: shows, 
      searchContestants: contestants, andTag, andContestant })
  }

  setUpdateData(tags, shows, contestants) {
    this.setState({updateTags: tags, updateShows: shows, updateContestants: contestants})
  }

  handleInputChange(event) {
    const target = event.target;
    const value =  target.checked;
    const name = target.name;
    this.setState({[name]: value})
  }

  render() {
    return (
          <div class="panel-body"> 
          <div>
             SEARCH
             <label class="switch">
                <input name="toggleChange" type="checkbox" checked={this.state.toggleChange}
                onChange={this.handleInputChange}
                />
                <span class="slider round"></span>
              </label>
              UPDATE
              {this.state.toggleChange ? <ImageUpdate setUpdateData={this.setUpdateData} tags={this.state.updateTags} 
              shows={this.state.updateShows} contestants = {this.state.updateContestants} images={this.state.images} /> 
              : <ImageSearch setImages = {this.setSearchResults} tags={this.state.searchTags} shows={this.state.searchShows}
                contestants = {this.state.searchContestants} andTag={this.state.andTag} andContestant={this.state.andContestant}
                images={this.state.images} />}
          </div>
          </div>
    )
  }
}

export default App;
