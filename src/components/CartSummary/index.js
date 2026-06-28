import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

class CartSummary extends Component {
  state = {
    paymentMethod: '',
    orderPlaced: false,
  }

  onChangePayment = event => {
    this.setState({paymentMethod: event.target.value})
  }

  onConfirmOrder = () => {
    this.setState({orderPlaced: true})
  }

  render() {
    const {paymentMethod, orderPlaced} = this.state
    const isCodSelected = paymentMethod === 'cashOnDelivery'

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const totalAmount = cartList.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          )
          const totalItems = cartList.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )

          return (
            <div className="cart-summary-container">
              <h1 className="order-total-heading">Order Total</h1>
              <h1 className="order-total-value">{totalAmount}</h1>
              <p className="total-items-count">{totalItems} Items in cart</p>

              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div className="popup-container">
                    <button
                      type="button"
                      className="popup-close-btn"
                      onClick={() => {
                        this.setState({paymentMethod: '', orderPlaced: false})
                        close()
                      }}
                    >
                      &times;
                    </button>

                    {orderPlaced ? (
                      <p className="order-success-msg">
                        Your order has been placed successfully
                      </p>
                    ) : (
                      <>
                        <h1 className="popup-title">Complete your Order</h1>

                        <div className="order-summary-box">
                          <p className="summary-detail">
                            Number of items: <span>{totalItems}</span>
                          </p>
                          <p className="summary-detail">
                            Total cost: <span>{totalAmount}</span>
                          </p>
                        </div>

                        <div className="payment-methods">
                          <h2 className="payment-title">Payment Method</h2>

                          <div className="payment-option">
                            <input
                              type="radio"
                              id="card"
                              name="payment"
                              value="card"
                              disabled
                            />
                            <label htmlFor="card">Card</label>
                          </div>

                          <div className="payment-option">
                            <input
                              type="radio"
                              id="netBanking"
                              name="payment"
                              value="netBanking"
                              disabled
                            />
                            <label htmlFor="netBanking">Net Banking</label>
                          </div>

                          <div className="payment-option">
                            <input
                              type="radio"
                              id="upi"
                              name="payment"
                              value="upi"
                              disabled
                            />
                            <label htmlFor="upi">UPI</label>
                          </div>

                          <div className="payment-option">
                            <input
                              type="radio"
                              id="wallet"
                              name="payment"
                              value="wallet"
                              disabled
                            />
                            <label htmlFor="wallet">Wallet</label>
                          </div>

                          <div className="payment-option">
                            <input
                              type="radio"
                              id="cashOnDelivery"
                              name="payment"
                              value="cashOnDelivery"
                              onChange={this.onChangePayment}
                            />
                            <label htmlFor="cashOnDelivery">
                              Cash on Delivery
                            </label>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="confirm-order-btn"
                          disabled={!isCodSelected}
                          onClick={this.onConfirmOrder}
                        >
                          Confirm Order
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
