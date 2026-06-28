import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductData = async () => {
    const {match} = this.props
    const {id} = match.params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedProductData = this.getFormattedData(data)
      const updatedSimilarProducts = data.similar_products.map(each =>
        this.getFormattedData(each),
      )

      this.setState({
        productData: updatedProductData,
        similarProductsData: updatedSimilarProducts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
      </div>
    </>
  )

  renderFailureView = () => {
    const {history} = this.props

    const onContinueShopping = () => {
      history.replace('/products')
    }

    return (
      <>
        <Header />
        <div className="error-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="error view"
            className="error-view-image"
          />
          <h1 className="product-not-found-heading">Product Not Found</h1>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </>
    )
  }

  renderSuccessView = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, quantity, similarProductsData} = this.state
        const {
          title,
          price,
          description,
          brand,
          imageUrl,
          rating,
          totalReviews,
          availability,
        } = productData

        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...productData, quantity})
        }

        return (
          <>
            <Header />
            <div className="product-details-success-view">
              <div className="product-details-container">
                <img src={imageUrl} alt="product" className="product-image" />
                <div className="product-info">
                  <h1 className="product-name">{title}</h1>
                  <p className="price-details">{price}</p>
                  <div className="rating-and-reviews-count">
                    <p className="rating">{rating}</p>
                    <p className="reviews-count">{totalReviews}</p>
                  </div>
                  <p className="product-description">{description}</p>
                  <div className="label-value-container">
                    <p className="label">Availability:</p>
                    <p className="value">{availability}</p>
                  </div>
                  <div className="label-value-container">
                    <p className="label">Brand:</p>
                    <p className="value">{brand}</p>
                  </div>
                  <hr className="horizontal-line" />
                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      data-testid="minus"
                      onClick={this.onDecrementQuantity}
                    >
                      <BsDashSquare className="quantity-controller-icon" />
                    </button>
                    <p className="quantity">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-controller-button"
                      data-testid="plus"
                      onClick={this.onIncrementQuantity}
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="button add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>

              <h1 className="similar-products-heading">Similar Products</h1>
              <ul className="similar-products-list">
                {similarProductsData.map(each => (
                  <li key={each.id} className="similar-product-item">
                    <img
                      src={each.imageUrl}
                      alt={`similar product ${each.title}`}
                      className="similar-product-image"
                    />
                    <p className="similar-product-title">{each.title}</p>
                    <p className="similar-product-brand">{each.brand}</p>
                    <p className="similar-product-rating">{each.rating}</p>
                    <p className="similar-product-price">{each.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderProductDetails()
  }
}

export default ProductItemDetails
