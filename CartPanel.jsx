import React, { useMemo } from 'react'
import CartItem from './CartItem.jsx'
import { CART_ACTIONS, useCartDispatch, useCartState } from '../cart/CartContext.jsx'

export default function CartPanel() {
  const { items } = useCartState()
  const dispatch = useCartDispatch()

  const entries = useMemo(() => Object.values(items), [items])

  const totals = useMemo(() => {
    let totalItems = 0
    let totalPrice = 0
    for (const e of entries) {
      totalItems += e.qty
      totalPrice += e.qty * e.product.price
    }
    return { totalItems, totalPrice }
  }, [entries])

  const onRemove = (id) => dispatch({ type: CART_ACTIONS.REMOVE, payload: id })
  const onSetQty = (id, qty) => dispatch({ type: CART_ACTIONS.SET_QTY, payload: { id, qty } })
  const onClear = () => dispatch({ type: CART_ACTIONS.CLEAR })

  return (
    <div className="panel">
      <div className="panelHeader">
        <h2>Cart</h2>
        <button className="btn" type="button" onClick={onClear} disabled={entries.length === 0}>
          Clear cart
        </button>
      </div>

      <div className="panelBody">
        {entries.length === 0 ? (
          <div className="empty">
            <strong style={{ color: 'rgba(234,238,247,0.95)' }}>Empty cart</strong>
            <div style={{ marginTop: 6 }}>
              Add an item from the product list to get started.
            </div>
          </div>
        ) : (
          <div className="cartList">
            {entries.map((entry) => (
              <CartItem
                key={entry.product.id}
                entry={entry}
                onRemove={onRemove}
                onSetQty={onSetQty}
              />
            ))}
          </div>
        )}

        <div className="totals">
          <div>Total items: <strong>{totals.totalItems}</strong></div>
          <div>Total price: <strong>₹{formatMoney(totals.totalPrice)}</strong></div>
        </div>

        <div className="hint">
          Rules enforced:
          <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            <li>Quantity can’t exceed available stock.</li>
            <li>Out-of-stock items can’t be added.</li>
            <li>Cart updates reflect immediately.</li>
          </ul>
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
