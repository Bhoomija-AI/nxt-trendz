import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

class PrimeDealsSection extends Component {
  state = {
    primeDeals: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    const {isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.prime_deals.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        imageUrl: eachItem.image_url,
        brand: eachItem.brand,
        price: eachItem.price,
        rating: eachItem.rating,
      }))

      this.setState({
        primeDeals: updatedData,
        isLoading: false,
      })
    }
  }

  renderPrimeDeals = () => {
    const {primeDeals} = this.state

    return (
      <ul className="prime-deals-list">
        {primeDeals.map(eachItem => (
          <li key={eachItem.id}>
            <img
              src={eachItem.imageUrl}
              alt={eachItem.title}
              className="prime-deal-image"
            />
            <p>{eachItem.title}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="prime-deals-section">
        {isLoading ? this.renderLoader() : this.renderPrimeDeals()}
      </div>
    )
  }
}

export default PrimeDealsSection
