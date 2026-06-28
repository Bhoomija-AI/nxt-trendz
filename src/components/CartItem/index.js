import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {item} = props
  const {id, title, brand, imageUrl, price, quantity} = item

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onIncrement = () => incrementCartItemQuantity(id)
        const onDecrement = () => decrementCartItemQuantity(id)
        const onRemove = () => removeCartItem(id)

        return (
          <li className="cart-item">
            <img src={imageUrl} alt={title} className="cart-product-image" />
            <div className="cart-item-details-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">{brand}</p>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  data-testid="minus"
                  onClick={onDecrement}
                  className="quantity-btn"
                >
                  <BsDashSquare />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  type="button"
                  data-testid="plus"
                  onClick={onIncrement}
                  className="quantity-btn"
                >
                  <BsPlusSquare />
                </button>
              </div>
              <p className="cart-total-price">{price * quantity}</p>
            </div>
            <button
              type="button"
              data-testid="remove"
              onClick={onRemove}
              className="remove-btn"
            >
              <AiFillCloseCircle />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
