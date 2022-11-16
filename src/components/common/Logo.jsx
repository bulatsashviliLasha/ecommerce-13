import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
class Logo extends Component {
  render() {
    return (
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    );
  }
}

export default Logo;
