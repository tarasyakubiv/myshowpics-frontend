import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    images: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8090/images`)
      .then(res => {
        const images = res.data;
        this.setState({ images });
      })
  }

  render() {
    return (

          <div class="panel-body">
            <h4><Link to="/images/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Image</Link></h4>
            <div class="images-container">
              {this.state.images.map(i =>
                  <div class="image-div">
                    <Link to={`/images/show/${i.id}`}>
                      <img class ="image" src={i.image}></img>
                    </Link>
                  </div>
                )}
            </div>
          </div>
    )
  }
}

export default App;
