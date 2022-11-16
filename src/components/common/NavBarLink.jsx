import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSelectedCategory } from '../../actions/categoriesActions';
import { fetchProductByCategory } from '../../actions/productActions';
import { Link } from 'react-router-dom';

class MyNavBarLink extends Component {
  render() {
    const { name, changeSelectedCategory, fetchProductByCategory, isSelected } =
      this.props;
    const scrollTop = () => window.scrollTo(0, 0);
    return (
      <Link
        to={'/'}
        onClick={() => {
          changeSelectedCategory(name);
          fetchProductByCategory(name);
          scrollTop();
        }}
        className={isSelected ? 'link link-active' : 'link'}
      >
        {name}
      </Link>
    );
  }
}

MyNavBarLink.propTypes = {
  changeSelectedCategory: PropTypes.func.isRequired,
  fetchProductByCategory: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default connect(null, {
  changeSelectedCategory,
  fetchProductByCategory,
})(MyNavBarLink);
