import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

class ShowShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: {},
      contestants: [],
      images: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/shows/'+this.props.match.params.id)
      .then(res => {
        this.setState({ show: res.data });
      })
      axios.get('http://localhost:8090/shows/'+this.props.match.params.id+"/images")
      .then(res => {
        this.setState({ images: res.data });
      })
      axios.get('http://localhost:8090/shows/'+this.props.match.params.id+"/contestants")
      .then(res => {
        this.setState({ contestants: res.data });
      })

  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8090/shows/'+id)
      .then((result) => {
        this.props.history.push("/shows")
      });
  }

  deleteContestant(id) {
    axios.delete('http://localhost:8090/shows/'+this.props.match.params.id+"/contestants/"+id)
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
              Show Details
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/shows"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back to Shows</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>
              {this.state.show.name}
              </dd>
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
              <Link to={`/shows/${this.state.show.id}/contestants/set`} class="btn btn-success">Set Contestants</Link>&nbsp;
            </dl>
            <dl>
              <dt>Images:</dt>
              <dd>
              <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/image/show/${i.id}`}>
                      <img class ="image" src={i.image}></img>
                    </Link>
                  </div>
                )}
            </div>
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