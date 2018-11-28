import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImageEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/image/'+this.props.match.params.id)
      .then(res => {
        this.setState({ image: res.data });
        console.log(this.state.image);
      });
  }

  onChange = (e) => {
    const state = this.state.image
    state[e.target.name] = e.target.value;
    this.setState({image:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { image, gameShow, contestants, tags } = this.state.image;

    axios.put('http://localhost:8090/image/'+this.props.match.params.id, { image, gameShow, contestants, tags })
      .then((result) => {
        this.props.history.push("/image/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Image
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/image/show/${this.state.image.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Image View</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Image Link:</label>
                <input type="text" class="form-control" name="image" value={this.state.image.image} onChange={this.onChange} placeholder="Image Link" />
              </div>
              <button type="submit" class="btn btn-default">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageEdit;