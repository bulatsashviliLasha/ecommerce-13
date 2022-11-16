import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { pageTitle } from '../../utils/pageTitle';

class PageNotFound extends Component {
  render() {
    pageTitle('Page Not Found');
    return (
      <div className="center-pt50">
        <div>404</div>
        <div>Page Not Found </div>
        <Link className="back-link" to="/">
          Go back home
        </Link>
      </div>
    );
  }
}

export default PageNotFound;
