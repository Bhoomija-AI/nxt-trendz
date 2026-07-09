import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true},
  {id: 'NET BANKING', displayText: 'Net Banking', isDisabled: true},
  {id: 'UPI', displayText: 'UPI', isDisabled: true},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true},
  {id: 'CASH ON DELIVERY', displayText: 'Cash on Delivery', isDisabled: false},
]

const Payment = () => {
  const {cartList} = useContext(CartContext)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  )

  return (
    <div className="payments-container">
      {isOrderPlaced ? (
        <p className="success-message">
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <h1 className="payments-heading">Payments Details</h1>

          <ul className="payment-method-inputs">
            {paymentOptionsList.map(each => (
              <li key={each.id} className="payment-method-input-container">
                <input
                  type="radio"
                  id={each.id}
                  name="payment"
                  disabled={each.isDisabled}
                  onChange={e => setPaymentMethod(e.target.id)}
                />
                <label
                  htmlFor={each.id}
                  className={`payment-method-label ${
                    each.isDisabled ? 'disabled-label' : ''
                  }`}
                >
                  {each.displayText}
                </label>
              </li>
            ))}
          </ul>

          <p>Total Price: Rs {totalPrice}/-</p>

          <button
            type="button"
            disabled={!paymentMethod}
            className="confirm-order-button"
            onClick={() => setIsOrderPlaced(true)}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
