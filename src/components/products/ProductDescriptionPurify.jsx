import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

class PurifiedProductDescription extends Component {
  render() {
    const { description } = this.props;
    const safeDescription = DOMPurify.sanitize(description);
    return (
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></div>
    );
  }
}

PurifiedProductDescription.propTypes = {
  description: PropTypes.string,
};

export default PurifiedProductDescription;
