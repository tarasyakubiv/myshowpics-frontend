import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
          children: []
        };
      }

  componentDidMount() {
    axios.get(`http://localhost:8090/${this.props.match.params.children}`)
      .then(res => {
        const children = res.data;
        this.setState({ children });
      })
  }

  addChild(showId) {
    axios.patch('http://localhost:8090/'+this.props.match.params.parent+'/'+this.props.match.params.id+"/"
    +this.props.match.params.children+"/"+showId)
    .then((result) => {
        this.props.history.push("/"+this.props.match.params.parent+"/details/"+this.props.match.params.id)
    });
  }

  render() {
    return (
        <div>
        <div class="panel-heading">
        <h3 class="panel-title">
           Set {this.props.match.params.children}
        </h3>
      </div>
      <h4><Link to={`/${this.props.match.params.parent}/${this.props.match.params.children}/${this.props.match.params.id}`}>
      <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Image View</Link>
      </h4>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.children.map(c =>
                  <tr>
                    <button onClick={this.addChild.bind(this, c.id)} class="btn btn-success">{c.name}</button>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
    )
  }
}

export default AddChild;