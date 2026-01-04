import React, { useCallback, useMemo, useState } from 'react'
import FiltersBar from '../components/FiltersBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { useDebouncedValue } from '../hooks/useDebouncedValue.js'
import { CART_ACTIONS, useCartDispatch } from '../cart/CartContext.jsx'

export default function ProductsPage() {
  const { products, categories, loading, error } = useProducts()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('none')

  // Bonus: debounced search
  const debouncedSearch = useDebouncedValue(search, 250)

  const dispatch = useCartDispatch()
  const addToCart = useCallback((product) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: product })
  }, [dispatch])

  const filtered = useMemo(() => {
    let list = products

    const q = debouncedSearch.trim().toLowerCase()
    if (q) {
      list = list.filter(p => p.title.toLowerCase().includes(q))
    }

    if (category !== 'all') {
      list = list.filter(p => p.category === category)
    }

    if (sort === 'low') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sort === 'high') {
      list = [...list].sort((a, b) => b.price - a.price)
    }

    return list
  }, [products, debouncedSearch, category, sort])

  const clear = () => {
    setSearch('')
    setCategory('all')
    setSort('none')
  }

  return (
    <div className="panel">
      <div className="panelHeader">
        <h2>Products</h2>
        <span style={{ color: 'rgba(168,176,194,0.9)', fontSize: 12 }}>
          Showing <strong style={{ color: 'rgba(234,238,247,0.95)' }}>{filtered.length}</strong> / {products.length}
        </span>
      </div>

      <div className="panelBody" style={{ display: 'grid', gap: 12 }}>
        <FiltersBar
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          onClear={clear}
        />

        {error ? (
          <div style={{ color: 'rgba(168,176,194,0.95)', fontSize: 12 }}>
            Note: {error}
          </div>
        ) : null}

        {loading ? (
          <div className="empty">Loading products…</div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <strong style={{ color: 'rgba(234,238,247,0.95)' }}>No products found</strong>
            <div style={{ marginTop: 6 }}>
              Try clearing filters or searching for a different term.
            </div>
          </div>
        ) : (
          <ProductGrid products={filtered} onAdd={addToCart} />
        )}
      </div>
    </div>
  )
}
