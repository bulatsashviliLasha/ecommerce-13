import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencyOptionsModal from './CurrencyModal';

class CurrencyOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrencyModalOpen: false,
    };
    this.toggleCurrencyModal = this.toggleCurrencyModal.bind(this);
    this.closeCurrencyModal = this.closeCurrencyModal.bind(this);
  }

  toggleCurrencyModal() {
    this.setState((prevState) => ({
      isCurrencyModalOpen: !prevState.isCurrencyModalOpen,
    }));
  }

  closeCurrencyModal() {
    this.setState({
      isCurrencyModalOpen: false,
    });
  }

  render() {
    const { selectedCurrency } = this.props;
    return (
      <>
        <div
          className="currency-container"
          onClick={(e) => {
            e.stopPropagation();
            this.toggleCurrencyModal();
          }}
        >
          <span className="currency-icon">{selectedCurrency.symbol}</span>
          <span className="caret-icon">
            <i
              className={
                this.state.isCurrencyModalOpen
                  ? 'fa fa-angle-up'
                  : 'fa fa-angle-down'
              }
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <div
          className={
            this.state.isCurrencyModalOpen ? 'currency-overlay' : 'hidden'
          }
          onClick={this.toggleCurrencyModal}
        >
          <div className="currency-overlay-container">
            <CurrencyOptionsModal
              showOptions={this.state.isCurrencyModalOpen}
              toggleModal={this.toggleCurrencyModal}
              closeModal={this.closeCurrencyModal}
            />
          </div>
        </div>
      </>
    );
  }
}

CurrencyOptions.propTypes = {
  selectedCurrency: PropTypes.object,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(CurrencyOptions);
