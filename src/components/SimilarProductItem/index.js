import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {title, brand, price, imageUrl, rating} = productDetails

  return (
    <li className="similar-product-item">
      <img src={imageUrl} alt={`similar product ${title}`} />
      <p>{title}</p>
      <p>{brand}</p>
      <p>{rating}</p>
      <p>Rs {price}</p>
    </li>
  )
}

export default SimilarProductItem
