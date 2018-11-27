import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import ImageCreate from './components/ImageCreate';
import ImageEdit from './components/ImageEdit';
import ImageShow from './components/ImageShow';
import ImageTagCreate from './components/ImageTagCreate';
import ImageShowSet from './components/ImageShowSet';
import ShowsList from './components/ShowsList';
import ShowShow from './components/ShowShow';
import ShowEdit from './components/ShowEdit';
import ShowCreate from './components/ShowCreate';
import ContestantsList from './components/ContestantsList';
import ContestantShow from './components/ContestantShow';
import ContestantCreate from './components/ContestantCreate';
import ContestantEdit from './components/ContestantEdit';
import { Link } from 'react-router-dom';

ReactDOM.render(<Router>
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <span class="menu-blocks"><Link to={`/images`}>
                IMAGES
              </Link></span>
              <span class="menu-blocks"><Link to={`/shows`}>
                SHOWS
              </Link></span>
              <span class="menu-blocks">
              <Link to={`/contestants`}>
                CONTESTANTS
              </Link></span>
            </h3>
          </div>
      <Route exact path='/' component={App} />
      <Route exact path='/images' component={App} />
      <Route path='/images/edit/:id' component={ImageEdit} />
      <Route path='/images/create' component={ImageCreate} />
      <Route path='/images/show/:id' component={ImageShow} />
      <Route path='/images/:id/tags/create' component={ImageTagCreate} />
      <Route path='/images/:id/shows/set' component={ImageShowSet} />
      <Route exact path='/shows' component={ShowsList} />
      <Route path='/shows/edit/:id' component={ShowEdit} />
      <Route path='/shows/create' component={ShowCreate} />
      <Route path='/shows/show/:id' component={ShowShow} />
      <Route exact path='/contestants' component={ContestantsList} />
      <Route path='/contestants/show/:id' component={ContestantShow} />
      <Route path='/contestants/create' component={ContestantCreate} />
      <Route path='/contestants/edit/:id' component={ContestantEdit} />
    </div>
    </div>

</Router>,
    document.getElementById('root'));

