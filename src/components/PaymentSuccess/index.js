import {Component} from 'react'
import CartContext from '../../context/CartContext'

class PaymentSuccess extends Component {
  componentDidMount() {
    const {removeAllCartItems} = this.context
    removeAllCartItems()
  }

  render() {
    return (
      <div>
        <h1>Your order has been placed successfully</h1>
      </div>
    )
  }
}

PaymentSuccess.contextType = CartContext

export default PaymentSuccess
