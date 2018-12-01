import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import ImageSearch from './components/ImageSearch';
import ImageUpdate from './components/ImageUpdate';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      tags: [],
      shows: [],
      contestants: [],
      toggleChange: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setImages = this.setImages.bind(this)
  }

  setImages(images) {
    this.setState({images})
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
            <h4><Link to="/image/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Image</Link></h4>
           <div>
             SEARCH
             <label class="switch">
                <input name="toggleChange" type="checkbox" checked={this.state.toggleChange}
                onChange={this.handleInputChange}
                />
                <span class="slider round"></span>
              </label>
              UPDATE
              {this.state.toggleChange ? <ImageUpdate images={this.state.images} /> : <ImageSearch setImages = {this.setImages} images={this.state.images} />}
          </div>
          </div>
    )
  }
}

export default App;
