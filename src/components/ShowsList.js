import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ShowsList extends Component {
  state = {
    shows: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8090/shows`)
      .then(res => {
        const shows = res.data;
        this.setState({ shows });
      })
  }

  render() {
    return (
          <div class="panel-body">
            <h4><Link to="/images/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Show</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.shows.map(c =>
                  <tr>
                    <td><Link to={`/shows/show/${c.id}`}>{c.name}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    )
  }
}

export default ShowsList;