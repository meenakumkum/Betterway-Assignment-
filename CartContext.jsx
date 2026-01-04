import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { CART_ACTIONS, cartReducer } from './cartReducer.js'

const CartStateContext = createContext(null)
const CartDispatchContext = createContext(null)

const STORAGE_KEY = 'mini_ecom_cart_v1'

function getInitialState() {
  return { items: {} }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    // hydrate from localStorage (bonus)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return getInitialState()
      const parsed = JSON.parse(raw)
      return { ...getInitialState(), ...parsed }
    } catch {
      return getInitialState()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  // Important: provide stable dispatch so Product listing doesn't rerender on cart updates.
  const dispatchValue = useMemo(() => dispatch, [])

  return (
    <CartDispatchContext.Provider value={dispatchValue}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export function useCartState() {
  const ctx = useContext(CartStateContext)
  if (!ctx) throw new Error('useCartState must be used within CartProvider')
  return ctx
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext)
  if (!ctx) throw new Error('useCartDispatch must be used within CartProvider')
  return ctx
}

export { CART_ACTIONS }
