import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImageShow extends Component {

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

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/contestants/'+id)
      .then((result) => {
        this.props.history.push("/contestants")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Contestant Details
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/contestants"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back to Contestants</Link></h4>
            <dl>
              <dt>Full Name:</dt>
              <dd>
              {this.state.contestant.fullName}
              </dd>
            </dl>
            <dl>
              <dt>Shows:</dt>
              <dd>
              </dd>
            </dl>
            <dl>
              <dt>Images:</dt>
              <dd>
              </dd>
            </dl>
            <Link to={`/contestants/edit/${this.state.contestant.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.contestant.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;