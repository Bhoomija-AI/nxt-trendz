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
          {cartList.length === 0 ? <EmptyCartView /> : <CartListView />}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
