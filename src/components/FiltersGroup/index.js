import './index.css'

const FiltersGroup = props => {
  const {
    searchInput,
    categoryOptions,
    ratingsList,
    changeSearchInput,
    enterSearchInput,
    activeCategoryId,
    activeRatingId,
    changeCategory,
    changeRating,
    clearFilters,
  } = props

  const onChangeSearch = event => {
    changeSearchInput(event.target.value)
  }

  const onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  return (
    <div className="filters-group-container">
      <input
        type="search"
        value={searchInput}
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearch}
        onKeyDown={onKeyDownSearch}
      />

      <h2 className="filter-heading">Category</h2>
      <ul className="categories-list">
        {categoryOptions.map(category => (
          <li
            key={category.categoryId}
            className={`category-item ${
              activeCategoryId === category.categoryId ? 'active-category' : ''
            }`}
            onClick={() => changeCategory(category.categoryId)}
          >
            <p className="category-name">{category.name}</p>
          </li>
        ))}
      </ul>

      <h2 className="filter-heading">Rating</h2>
      <ul className="ratings-list">
        {ratingsList.map(rating => (
          <li
            key={rating.ratingId}
            className={`rating-item ${
              activeRatingId === rating.ratingId ? 'active-rating' : ''
            }`}
            onClick={() => changeRating(rating.ratingId)}
          >
            <img
              src={rating.imageUrl}
              alt={`rating ${rating.ratingId}`}
              className="rating-img"
            />
            <p className="rating-label">&amp; up</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
