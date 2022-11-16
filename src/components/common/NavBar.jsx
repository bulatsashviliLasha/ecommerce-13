import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartNav from './CartNav';
import CurrencyOptions from './CurrencyOptions';
import Logo from './Logo';
import MyNavBarLink from './NavBarLink';
import './navbarStyles.css';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../../actions/categoriesActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="nav-bar-container">
        <div className="nav-bar">
          <div className="nav-bar-content">
            <div>
              {categories.items.length > 0 &&
                categories.items.map((category, i) => (
                  <MyNavBarLink
                    key={category.name}
                    name={category.name}
                    isSelected={categories.selectedCategory === category.name}
                  />
                ))}
            </div>
            <Logo />
            <div className="flex">
              <CurrencyOptions />
              <CartNav />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.object,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { fetchAllCategories })(NavBar);
