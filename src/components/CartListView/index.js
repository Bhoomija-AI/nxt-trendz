import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      return (
        <div className="cart-list-view">
          <div className="cart-header">
            <h1 className="my-cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
          </div>

          <ul className="cart-list">
            {cartList.map(eachItem => (
              <CartItem key={eachItem.id} item={eachItem} />
            ))}
          </ul>

          <CartSummary />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
