import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductImagePreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allImages: [],
      selectedImage: '',
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({
      allImages: this.props.gallery,
      selectedImage: this.props.gallery[0],
    });
  }
  render() {
    const productThumbnails = this.state.allImages.map((image, i) => {
      return (
        <img
          key={image + i}
          src={image}
          className={
            this.state.selectedImage === image
              ? 'image-thumbnail selected-thumbnail'
              : 'image-thumbnail'
          }
          onClick={() => {
            this.setState({ selectedImage: image });
          }}
          alt=""
        />
      );
    });
    return (
      <div className="product-image-previewer">
        <div className="image-thumbnail-container">{productThumbnails}</div>
        <div className="selected-image-container">
          <img
            src={this.state.selectedImage}
            className="selected-image"
            alt=""
          />
        </div>
      </div>
    );
  }
}

ProductImagePreviewer.propTypes = {
  gallery: PropTypes.array,
};

export default ProductImagePreviewer;
