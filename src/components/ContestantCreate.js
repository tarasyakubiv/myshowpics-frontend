import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ContestantCreate extends Component {

  constructor() {
    super();
    this.state = {
      fullName: '',
      gameShows: [],
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

    const { fullName, gameShows, images} = this.state;

    axios.post('http://localhost:8090/contestants', { fullName, gameShows, images })
      .then((result) => {
        this.props.history.push("/contestants")
      });
  }

  render() {
    const  { fullName, gameShows, images  } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD CONTESTANT
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/contestants"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> CONTESTANTS</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Contestant Name:</label>
                <input type="text" class="form-control" name="fullName" value={fullName} onChange={this.onChange} placeholder="Contestant" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContestantCreate;