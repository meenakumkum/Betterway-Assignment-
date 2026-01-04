import React, { memo } from 'react'

function ProductCard({ product, onAdd }) {
  const inStock = product.stock > 0

  return (
    <div className="card">
      <div className="thumb" aria-hidden="true">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        ) : (
          <span style={{ color: 'rgba(168,176,194,0.8)', fontSize: 12 }}>No image</span>
        )}
      </div>

      <div className="cardBody">
        <h3 className="cardTitle" title={product.title}>{product.title}</h3>

        <div className="metaRow">
          <span className="pill">
            <span className="price">₹{formatMoney(product.price)}</span>
          </span>
          <span className="pill" title="Category">
            {product.category}
          </span>
          <span className="pill" title="Stock status">
            <span className={`dot ${inStock ? '' : 'out'}`} />
            {inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        <div className="cardFooter">
          <span style={{ color: 'rgba(168,176,194,0.9)', fontSize: 12 }}>
            Stock: <strong style={{ color: 'rgba(234,238,247,0.95)' }}>{product.stock}</strong>
          </span>

          <button
            className="btn btnPrimary"
            onClick={() => onAdd(product)}
            disabled={!inStock}
            type="button"
            aria-disabled={!inStock}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

function formatMoney(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return '0'
  return num.toFixed(2)
}

export default memo(ProductCard)
