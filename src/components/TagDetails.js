import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

class TagDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: {},
      images: []
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_HOST+'tags/'+this.props.match.params.id)
      .then(res => {
        this.setState({ tag: res.data });
      })
      axios.get(process.env.REACT_APP_API_HOST+'tags/'+this.props.match.params.id+"/images")
      .then(res => {
        this.setState({ images: res.data });
      })
  }

  delete(id){
    console.log(id);
    axios.delete(process.env.REACT_APP_API_HOST+'tags/'+id)
      .then((result) => {
        this.props.history.push("/tags")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Tag Details
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Name:</dt>
              <dd>
              {this.state.tag.name}
              </dd>
            </dl>
            <div class="cl-b">
              <dt>Images:</dt>
              <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/image/details/${i.id}`}>
                      <img class ="image"  alt={`${i.name}`} src={i.thumb}></img>
                    </Link>
                  </div>
                )}
            </div>
              </div>
            <div class="cl-b">
            <button onClick={this.delete.bind(this, this.state.tag.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TagDetails;