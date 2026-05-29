import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const showEmptyView = cartList.length === 0

      return (
        <div>
          {showEmptyView ? (
            <>
              <h1>Your Cart Is Empty</h1>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="cart empty"
              />
              <Link to="/products">
                <button type="button">Shop Now</button>
              </Link>
            </>
          ) : (
            <>
              <h1>My Cart</h1>
              <button type="button" onClick={removeAllCartItems}>
                Remove All
              </button>

              {/* ✅ MUST BE ul */}
              <ul>
                {cartList.map(each => (
                  <CartItem key={each.id} cartItem={each} />
                ))}
              </ul>

              <CartSummary />
            </>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart