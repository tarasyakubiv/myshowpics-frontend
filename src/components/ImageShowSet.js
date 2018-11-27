import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ImageShowSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          shows: []
        };
      }

  componentDidMount() {
    axios.get(`http://localhost:8090/shows`)
      .then(res => {
        const shows = res.data;
        this.setState({ shows });
      })
  }

  setShow(showId) {
    axios.patch('http://localhost:8090/images/'+this.props.match.params.id+"/show/"+showId)
    .then((result) => {
        this.props.history.push("/images/show/"+this.props.match.params.id)
    });
  }

  render() {
    return (
        <div>
        <div class="panel-heading">
        <h3 class="panel-title">
          Image Details
        </h3>
      </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.shows.map(c =>
                  <tr>
                    <button onClick={this.setShow.bind(this, c.id)} class="btn btn-success">{c.name}</button>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
    )
  }
}

export default ImageShowSet;