import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/shows/'+this.props.match.params.id)
      .then(res => {
        this.setState({ show: res.data });
        console.log(this.state.show);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/shows/'+id)
      .then((result) => {
        this.props.history.push("/shows")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Show Details
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back to Shows</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>
              {this.state.show.name}
              </dd>
            </dl>
            <dl>
              <dt>Contestants:</dt>
              <dd>
              </dd>
            </dl>
            <Link to={`/shows/edit/${this.state.show.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.show.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowShow;