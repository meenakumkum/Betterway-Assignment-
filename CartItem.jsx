import React from 'react'

export default function CartItem({ entry, onRemove, onSetQty }) {
  const { product, qty } = entry

  return (
    <div className="cartItem">
      <div>
        <p className="cartItemTitle">{product.title}</p>
        <p className="cartItemSub">
          ₹{formatMoney(product.price)} • Stock {product.stock} • Category {product.category}
        </p>

        <div className="statusRow">
          <span>Line total: <strong style={{ color: 'rgba(234,238,247,0.95)' }}>₹{formatMoney(product.price * qty)}</strong></span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
        <div className="qty" aria-label={`Quantity controls for ${product.title}`}>
          <button
            className="btn"
            type="button"
            onClick={() => onSetQty(product.id, Math.max(1, qty - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            title="Decrease"
          >
            −
          </button>

          <input
            inputMode="numeric"
            value={qty}
            onChange={(e) => onSetQty(product.id, e.target.value)}
            aria-label="Quantity"
            title="Quantity"
          />

          <button
            className="btn"
            type="button"
            onClick={() => onSetQty(product.id, Math.min(product.stock, qty + 1))}
            disabled={qty >= product.stock}
            aria-label="Increase quantity"
            title="Increase"
          >
            +
          </button>
        </div>

        <button className="btn btnDanger" onClick={() => onRemove(product.id)} type="button">
          Remove
        </button>
      </div>
    </div>
  )
}

function formatMoney(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return '0'
  return num.toFixed(2)
}
