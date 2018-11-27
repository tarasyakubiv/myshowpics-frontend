import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowCreate extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      contestants: [],
      images: []
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, contestants, images } = this.state;

    axios.post('http://localhost:8090/shows', { name, contestants, images })
      .then((result) => {
        this.props.history.push("/shows")
      });
  }

  render() {
    const  { name, contestants, images } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD SHOW
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> SHOWS</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Show" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowCreate;