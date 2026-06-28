import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import CartProvider from './context/CartProvider'
import Login from './components/Login'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/product-details/:id"
          component={ProductItemDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartProvider>
  </BrowserRouter>
)

export default App
