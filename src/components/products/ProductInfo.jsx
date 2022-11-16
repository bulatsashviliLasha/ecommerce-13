import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProductToCart } from '../../actions/cartActions';
import PurifiedProductDescription from './ProductDescriptionPurify';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { pageTitle } from '../../utils/pageTitle';
const notyf = new Notyf();

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.checkUnselectedProductAttributes =
      this.checkUnselectedProductAttributes.bind(this);
  }

  checkUnselectedProductAttributes(allAttributes, selectedAttributes) {
    let unselectedAttributes = [];
    unselectedAttributes = allAttributes.filter(
      (attribute) => !Object.keys(selectedAttributes).includes(attribute.name)
    );

    let unselectedAttributesStr = '';
    for (let item of unselectedAttributes) {
      unselectedAttributesStr += '- ' + item.name + '\n ';
    }
    notyf.error(
      `Please select the \n ${unselectedAttributesStr} attribute(s) of the product before adding to cart.`
    );
  }
  render() {
    const { info, selectedCurrency, selectAttributes, addProductToCart } =
      this.props;
    let product = info;
    let productPrice = product.prices.filter(
      (price) => price.currency.symbol === selectedCurrency.symbol
    )[0];
    let productHasAttributes = product.attributes.length > 0;
    pageTitle(product.name);

    return (
      <div>
        <p className="brand-name">{product.brand}</p>
        <p className="product-name">{product.name}</p>

        {productHasAttributes ? (
          product.attributes.map((attribute, i) => {
            return (
              <Fragment key={product.id + attribute.name + i}>
                <p className="product-label">{attribute.name}</p>
                <div className="product-attribute-container">
                  {attribute.items.map((item, i) => {
                    return (
                      <button
                        key={'attr' + i}
                        className={
                          product.selectedAttributes &&
                          Object.keys(product.selectedAttributes).includes(
                            attribute.name
                          ) &&
                          product.selectedAttributes[attribute.name] ===
                            item.value
                            ? attribute.type === 'swatch'
                              ? 'product-attribute swatch-type selected-attribute'
                              : 'product-attribute selected-attribute'
                            : attribute.type === 'swatch'
                            ? 'product-attribute swatch-type'
                            : 'product-attribute'
                        }
                        onClick={() => {
                          selectAttributes(attribute.name, item.value);
                        }}
                        style={
                          attribute.type === 'swatch'
                            ? { backgroundColor: item.value, color: item.value }
                            : {}
                        }
                      >
                        {attribute.type === 'swatch' ? '' : item.value}
                      </button>
                    );
                  })}
                </div>
              </Fragment>
            );
          })
        ) : (
          <></>
        )}

        <p className="product-label">Price</p>
        <p className="product-price">
          {productPrice.currency.symbol + ' '}
          {productPrice.amount}
        </p>
        <button
          onClick={() => {
            if (!product.inStock) {
              notyf.error('Sold out');
            } else if (productHasAttributes) {
              if (!Object.keys(product).includes('selectedAttributes')) {
                this.checkUnselectedProductAttributes(product.attributes, {});
              } else if (
                product.attributes.length !==
                Object.keys(product.selectedAttributes).length
              ) {
                this.checkUnselectedProductAttributes(
                  product.attributes,
                  product.selectedAttributes
                );
              } else {
                addProductToCart({ ...product, count: 1 });
              }
            } else {
              addProductToCart({
                ...product,
                selectedAttributes: {},
                count: 1,
              });
            }
          }}
          className="add-btn"
        >
          Add to Cart
        </button>

        {/* First sanitize and purify the descripion html, to prevent CSS (Cross site scripting) threats. */}
        <PurifiedProductDescription description={product.description} />
      </div>
    );
  }
}

ProductInfo.propTypes = {
  selectedCurrency: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  selectAttributes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, { addProductToCart })(ProductInfo);
