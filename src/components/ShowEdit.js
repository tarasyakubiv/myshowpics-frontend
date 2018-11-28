import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8090/image/'+this.props.match.params.id)
      .then(res => {
        this.setState({ show: res.data });
        console.log(this.state.show);
      });
  }

  onChange = (e) => {
    const state = this.state.show
    state[e.target.name] = e.target.value;
    this.setState({show:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, contestants, images } = this.state.show;

    axios.put('http://localhost:8090/shows/'+this.props.match.params.id, { name, contestants, images })
      .then((result) => {
        this.props.history.push("/shows/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Show
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/shows/show/${this.state.show.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Show View</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Show Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.show.name} onChange={this.onChange} placeholder="Show Name" />
              </div>
              <button type="submit" class="btn btn-default">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowEdit;