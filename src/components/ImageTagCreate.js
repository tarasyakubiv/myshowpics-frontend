import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImageTagCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;

    axios.post('http://localhost:8090/tags', { name})
      .then((result) => {
        axios.patch('http://localhost:8090/images/'+this.props.match.params.id+'/tags/'+result.data.id).
        then((result) => {
          this.props.history.push("/images/show/"+this.props.match.params.id)
        })
      });
  }

  render() {
    const  { name } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD TAG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/images/show/${this.props.match.params.id}`}><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Image View</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Tag Name" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageTagCreate;