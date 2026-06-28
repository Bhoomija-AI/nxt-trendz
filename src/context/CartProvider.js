import {Component} from 'react'
import CartContext from './CartContext'

class CartProvider extends Component {
  state = {cartList: []}

  addCartItem = product => {
    this.setState(prev => {
      const existing = prev.cartList.find(each => each.id === product.id)
      if (existing) {
        return {
          cartList: prev.cartList.map(each =>
            each.id === product.id
              ? {...each, quantity: each.quantity + product.quantity}
              : each,
          ),
        }
      }
      return {cartList: [...prev.cartList, product]}
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        )
        .filter(each => each.quantity > 0),
    }))
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    const {children} = this.props

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }
}

export default CartProvider
