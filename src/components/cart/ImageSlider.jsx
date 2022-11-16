import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: props.gallery,
      activeImageIndex: 0,
      selectedImage: props.gallery[0],
    };
    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
  }

  showNextImage() {
    if (this.state.activeImageIndex < this.state.gallery.length - 1) {
      let newActiveIndex = this.state.activeImageIndex + 1;
      let newSelectedImage = this.state.gallery[newActiveIndex];

      this.setState({
        activeImageIndex: newActiveIndex,
        selectedImage: newSelectedImage,
      });
    } else {
      let newSelectedImage = this.state.gallery[0];

      this.setState({
        activeImageIndex: 0,
        selectedImage: newSelectedImage,
      });
    }
  }

  showPrevImage() {
    if (this.state.activeImageIndex > 0) {
      let newActiveIndex = this.state.activeImageIndex - 1;
      let newSelectedImage = this.state.gallery[newActiveIndex];

      this.setState({
        activeImageIndex: newActiveIndex,
        selectedImage: newSelectedImage,
      });
    } else {
      let newSelectedImage = this.state.gallery[this.state.gallery.length - 1];

      this.setState((prevState) => ({
        activeImageIndex: prevState.gallery.length - 1,
        selectedImage: newSelectedImage,
      }));
    }
  }

  render() {
    const { isMiniCart } = this.props;
    return (
      <div className="image-slider">
        {this.state.gallery.length > 1 && !isMiniCart ? (
          <div className="image-slider-btns">
            <button className="prev-btn" onClick={this.showPrevImage}>
              &lt;
            </button>
            <button className="next-btn" onClick={this.showNextImage}>
              &gt;
            </button>
          </div>
        ) : (
          <></>
        )}

        <img
          className="cart-item-image"
          alt=""
          src={this.state.selectedImage}
        />
      </div>
    );
  }
}

ImageSlider.propTypes = {
  gallery: PropTypes.array,
  isMiniCart: PropTypes.bool,
};

export default ImageSlider;
