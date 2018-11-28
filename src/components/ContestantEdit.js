import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ContestantEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contestant: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/contestants/'+this.props.match.params.id)
      .then(res => {
        this.setState({ contestant: res.data });
        console.log(this.state.contestant);
      });
  }

  onChange = (e) => {
    const state = this.state.contestant
    state[e.target.name] = e.target.value;
    this.setState({contestant:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, gameShows, images } = this.state.contestant;

    axios.put('http://localhost:8090/contestants/'+this.props.match.params.id, { name, gameShows, images})
      .then((result) => {
        this.props.history.push("/contestants/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Contestant
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/contestants/show/${this.state.contestant.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Contestant View</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Contestant:</label>
                <input type="text" class="form-control" name="Contestant" value={this.state.contestant.name} onChange={this.onChange} placeholder="Contestant Nme" />
              </div>
              <button type="submit" class="btn btn-default">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContestantEdit;