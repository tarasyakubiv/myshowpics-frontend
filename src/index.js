import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import ImageCreate from './components/ImageCreate';
import ImageEdit from './components/ImageEdit';

import ImageDetails from './components/ImageDetails';
import ShowDetails from './components/ShowDetails';
import ContestantDetails from './components/ContestantDetails';
import TagDetails from './components/TagDetails';

import CollectionList from './components/CollectionList';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faTimes } from '@fortawesome/free-solid-svg-icons'


library.add(fab, faCheckSquare, faTimes)

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
              <span class="menu-blocks">
              <Link to={`/tags`}>
                TAGS
              </Link></span>
            </h3>
          </div>
      <Route exact path='/' component={App} />
      <Route exact path='/images' component={App} />
      <Route exact path='/shows' render={(props) => <CollectionList {...props} name="shows"/>} />
      <Route exact path='/contestants' render={(props) => <CollectionList {...props} name="contestants"/>} />
      <Route exact path='/tags' render={(props) => <CollectionList {...props} name="tags"/>} />

      <Route path='/image/edit/:id' component={ImageEdit} />

      <Route path='/image/details/:id' component={ImageDetails} />
      <Route path='/shows/details/:id' component={ShowDetails} />
      <Route path='/contestants/details/:id' component={ContestantDetails} />
      <Route path='/tags/details/:id' component={TagDetails} />
    </div>
    </div>

</Router>,
    document.getElementById('root'));

