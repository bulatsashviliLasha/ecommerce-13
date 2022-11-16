import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductImagePreviewer from './ProductImagePreviewer';
import './productDetail.css';
import { withRouter } from '../common/routerUtil';
import ProductInfo from './ProductInfo';
import queryApolloClient from '../../queries';
import { GET_PRODUCT_BY_ID_Q } from '../../queries/allQueries';
import Loading from '../errors/Loading';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.selectAttributes = this.selectAttributes.bind(this);
  }

  async fetchProductDetails(id) {
    let data = await queryApolloClient(GET_PRODUCT_BY_ID_Q, {
      id,
    });
    this.setState({ product: data.product });
  }

  selectAttributes(attrName, value) {
    let newProductState = {
      ...this.state.product,
    };

    let newAttribute = { [attrName]: value };

    if (Object.keys(newProductState).includes('selectedAttributes')) {
      newProductState = {
        ...newProductState,
        selectedAttributes: {
          ...newProductState.selectedAttributes,
          ...newAttribute,
        },
      };
    } else {
      newProductState = {
        ...newProductState,
        selectedAttributes: { ...newAttribute },
      };
    }

    this.setState({ product: newProductState });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchProductDetails(id);
  }

  render() {
    if (this.state.product === null) return <Loading />;

    return (
      <div className="product-container">
        <ProductImagePreviewer gallery={this.state.product.gallery} />
        <ProductInfo
          info={this.state.product}
          selectAttributes={this.selectAttributes}
          key={this.state.product.id}
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
};

export default withRouter(ProductDetails);
