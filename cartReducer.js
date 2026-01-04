export const CART_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SET_QTY: 'SET_QTY',
  CLEAR: 'CLEAR',
  HYDRATE: 'HYDRATE',
}

// State shape: { items: { [productId]: { product, qty } } }
export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.HYDRATE: {
      const incoming = action.payload
      if (!incoming || typeof incoming !== 'object') return state
      if (!incoming.items || typeof incoming.items !== 'object') return state
      return { ...state, items: incoming.items }
    }

    case CART_ACTIONS.ADD: {
      const product = action.payload
      if (!product) return state
      if (product.stock <= 0) return state

      const existing = state.items[product.id]
      const nextQty = Math.min((existing?.qty ?? 0) + 1, product.stock)

      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: { product, qty: nextQty },
        },
      }
    }

    case CART_ACTIONS.REMOVE: {
      const id = action.payload
      if (!state.items[id]) return state
      const { [id]: _, ...rest } = state.items
      return { ...state, items: rest }
    }

    case CART_ACTIONS.SET_QTY: {
      const { id, qty } = action.payload || {}
      const entry = state.items[id]
      if (!entry) return state

      const safeQty = clampInt(qty, 1, entry.product.stock)
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...entry, qty: safeQty },
        },
      }
    }

    case CART_ACTIONS.CLEAR:
      return { ...state, items: {} }

    default:
      return state
  }
}

function clampInt(value, min, max) {
  const n = Number(value)
  if (!Number.isFinite(n)) return min
  const rounded = Math.trunc(n)
  return Math.max(min, Math.min(max, rounded))
}
