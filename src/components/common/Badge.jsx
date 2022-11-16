import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Badge extends Component {
  render() {
    const { value } = this.props;
    return (
      <div className="badge">
        <span className="badge-value">{value}</span>
      </div>
    );
  }
}

Badge.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Badge;
