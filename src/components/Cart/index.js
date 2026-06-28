import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <>
          <Header />
          <div className="cart-route-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
              alt="cart"
              className="cart-img"
            />
            {cartList.length === 0 ? <EmptyCartView /> : <CartListView />}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
