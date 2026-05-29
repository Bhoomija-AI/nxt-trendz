import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalItems = cartList.reduce(
        (sum, item) => sum + item.quantity,
        0,
      )

      const totalCost = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      return (
        <div>
          <h1>Order Total: Rs {totalCost}</h1>

          {/* ✅ Number of items paragraph */}
          <p>{totalItems} Items in cart</p>

          {/* ✅ Checkout button REQUIRED */}
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary