import React, { memo } from 'react'
import ProductCard from './ProductCard.jsx'

function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid" role="list">
      {products.map((p) => (
        <div key={p.id} role="listitem">
          <ProductCard product={p} onAdd={onAdd} />
        </div>
      ))}
    </div>
  )
}

export default memo(ProductGrid)
