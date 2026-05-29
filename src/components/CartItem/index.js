import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const {cartItem} = props
      const {id, title, brand, imageUrl, price, quantity} = cartItem

      return (
        <li>
          <img src={imageUrl} alt={title} />

          <div>
            <p>{title}</p>

            {/* ✅ BRAND MUST BE DISPLAYED */}
            <p>{brand}</p>

            <div>
              <button
                type="button"
                data-testid="minus"
                onClick={() => decrementCartItemQuantity(id)}
              >
                <BsDashSquare />
              </button>

              {/* ✅ Quantity paragraph */}
              <p>{quantity}</p>

              <button
                type="button"
                data-testid="plus"
                onClick={() => incrementCartItemQuantity(id)}
              >
                <BsPlusSquare />
              </button>
            </div>

            {/* ✅ Price updates with quantity */}
            <p>Rs {price * quantity}</p>

            <button
              type="button"
              data-testid="remove"
              onClick={() => removeCartItem(id)}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
