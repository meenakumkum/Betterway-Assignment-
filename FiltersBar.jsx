import React from 'react'

export default function FiltersBar({
  search,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onClear,
}) {
  return (
    <div className="filters">
      <div className="span2">
        <label htmlFor="search">Search by name</label>
        <input
          id="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Try: iPhone, perfume, shoes..."
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All' : c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort">Sort (price)</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="none">None</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      <div className="span2" style={{ display: 'flex', gap: 10, alignItems: 'end', justifyContent: 'flex-end' }}>
        <button className="btn" onClick={onClear} type="button">
          Clear all filters
        </button>
      </div>
    </div>
  )
}
