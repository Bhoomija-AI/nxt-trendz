import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = ({history}) => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <nav className="nav-header">
            <div className="nav-content">
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                  <span className="cart-count">{cartList.length}</span>
                </li>
                <li className="nav-menu-item">
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
