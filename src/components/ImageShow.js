import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImageShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/images/'+this.props.match.params.id)
      .then(res => {
        this.setState({ image: res.data });
        console.log(this.state.image);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/images/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Image Details
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back to Images</Link></h4>
            <dl>
              <dt>Image link:</dt>
              <dd>
              <a href={this.state.image.image}>{this.state.image.image}</a>
              </dd>
            </dl>
            <dl>
              <dt>Full image</dt>
              <dd>
              <img src={this.state.image.image}></img>
              </dd>
            </dl>
            <dl>
              <dt>Tags:</dt>
            </dl>
            <dl>
              <dt>Show:</dt>
              <dd>
              </dd>
            </dl>
            <dl>
              <dt>Contestants:</dt>
              <dd>
              </dd>
            </dl>
            <Link to={`/images/edit/${this.state.image.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.image.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;