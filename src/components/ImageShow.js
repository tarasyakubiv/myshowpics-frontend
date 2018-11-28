import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImageShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: {},
      show: {},
      contestants: [],
      tags: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/image/'+this.props.match.params.id)
      .then(res => {
        this.setState({ image: res.data, contestants: res.data.contestants, tags: res.data.tags});
        if(res.data.gameShow != null) {
          this.setState({ show: res.data.gameShow });
        }
      });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/image/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  deleteTag(tagId) {
    axios.delete('http://localhost:8090/image/'+this.props.match.params.id+"/tags/"+tagId)
    .then((result) => {
      window.location.reload();
    });
  }

  deleteContestant(id) {
    axios.delete('http://localhost:8090/image/'+this.props.match.params.id+"/contestants/"+id)
    .then((result) => {
      window.location.reload();
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
              <dd>
              {this.state.tags.map(tag =>
                  <li>
                    {tag.name}
                    <button onClick={this.deleteTag.bind(this, tag.id)} class="btn btn-danger">Remove</button>
                  </li>
                )}
              <Link to={`/image/${this.state.image.id}/tags/create`} class="btn btn-success">Add Tag</Link>&nbsp;
              </dd>
            </dl>
            <dl>
              <dt>Show:</dt>
              <dd>
              {this.state.show.name}
              </dd>
              <Link to={`/image/${this.state.image.id}/shows/set`} class="btn btn-success">Set Show</Link>&nbsp;
            </dl>
            <dl>
              <dt>Contestants:</dt>
              <dd>
              {this.state.contestants.map(c =>
                  <li>
                    {c.name}
                    <button onClick={this.deleteContestant.bind(this, c.id)} class="btn btn-danger">Remove</button>
                  </li>
                )}
              </dd>
              <Link to={`/image/${this.state.image.id}/contestants/set`} class="btn btn-success">Set Contestants</Link>&nbsp;
            </dl>
            <Link to={`/image/edit/${this.state.image.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.image.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageShow;