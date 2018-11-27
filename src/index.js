import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import ImageCreate from './components/ImageCreate';
import ImageEdit from './components/ImageEdit';
import ImageShow from './components/ImageShow';
import ShowsList from './components/ShowsList';
import ContestantsList from './components/ContestantsList';
import { Link } from 'react-router-dom';

ReactDOM.render(<Router>
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <Link to={`/images`}>
                IMAGES
              </Link>
            </h3>
            <h3 class="panel-title">
              <Link to={`/shows`}>
                SHOWS
              </Link>
            </h3>
            <h3 class="panel-title">
              <Link to={`/contestants`}>
                CONTESTANTS
              </Link>
            </h3>
          </div>
      <Route exact path='/' component={App} />
      <Route exact path='/images' component={App} />
      <Route path='/images/edit/:id' component={ImageEdit} />
      <Route path='/images/create' component={ImageCreate} />
      <Route path='/images/show/:id' component={ImageShow} />
      <Route exact path='/shows' component={ShowsList} />
      <Route path='/shows/edit/:id' component={ImageEdit} />
      <Route path='/shows/create' component={ImageCreate} />
      <Route path='/shows/show/:id' component={ImageShow} />
      <Route exact path='/contestants' component={ContestantsList} />
      <Route path='/contestants/edit/:id' component={ImageEdit} />
      <Route path='/contestants/create' component={ImageCreate} />
      <Route path='/contestants/show/:id' component={ImageShow} />
    </div>
    </div>

</Router>,
    document.getElementById('root'));

