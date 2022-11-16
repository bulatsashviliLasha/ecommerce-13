import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class CartItemAttributes extends Component {
  render() {
    const { attributes, isMiniCart, selectedAttributes } = this.props;
    return (
      <>
        {attributes && attributes.length > 0 ? (
          attributes.map((attribute, i) => {
            return (
              <Fragment
                key={
                  isMiniCart
                    ? 'miniOutAttr' + i + attribute.name
                    : 'fullOutAttr' + i + attribute.name
                }
              >
                <p className="product-label">{attribute.name}</p>
                <div className="cart-item-attribute-container">
                  {attribute.items.map((item, i) => {
                    return (
                      <button
                        key={
                          isMiniCart
                            ? 'miniAttr' + i + item.id
                            : 'fullAttr' + i + item.id
                        }
                        className={
                          selectedAttributes &&
                          Object.keys(selectedAttributes).includes(
                            attribute.name
                          ) &&
                          selectedAttributes[attribute.name] === item.value
                            ? attribute.type === 'swatch'
                              ? 'product-attribute swatch-type selected-attribute'
                              : 'product-attribute selected-attribute'
                            : attribute.type === 'swatch'
                            ? 'product-attribute swatch-type'
                            : 'product-attribute'
                        }
                        style={
                          attribute.type === 'swatch'
                            ? {
                                backgroundColor: item.value,
                                color: item.value,
                              }
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
      </>
    );
  }
}

CartItemAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
  isMiniCart: PropTypes.bool,
  selectedAttributes: PropTypes.object,
};

export default CartItemAttributes;
