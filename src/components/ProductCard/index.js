import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, price, imageUrl, rating} = productData

  return (
    <div className="product-item">
      <img src={imageUrl} alt={title} className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
          <p className="rating">{rating}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
