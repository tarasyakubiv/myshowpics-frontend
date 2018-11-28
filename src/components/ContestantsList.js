import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ContestantsList extends Component {
  state = {
    contestants: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8090/contestants`)
      .then(res => {
        const contestants = res.data;
        this.setState({ contestants });
      })
  }

  render() {
    return (
          <div class="panel-body">
            <h4><Link to="/contestants/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Contestant</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Full Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contestants.map(c =>
                  <tr>
                    <td><Link to={`/contestants/show/${c.id}`}>{c.name}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    )
  }
}

export default ContestantsList;