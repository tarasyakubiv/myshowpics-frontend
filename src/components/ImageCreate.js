import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImageCreate extends Component {

  constructor() {
    super();
    this.state = {
      image: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { image } = this.state;

    axios.post('http://localhost:8090/image', { image })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const  { image } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD IMAGE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> IMAGES</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Image Link:</label>
                <input type="text" class="form-control" name="image" value={image} onChange={this.onChange} placeholder="Image" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCreate;