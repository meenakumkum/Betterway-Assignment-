import React from 'react'
import { CartProvider } from './cart/CartContext.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import CartPanel from './components/CartPanel.jsx'

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <div className="header">
          <div>
            <h1 className="title">Mini E-Commerce Product & Cart</h1>
            <p className="subtitle">
              Product listing with search, category filter, price sort, and a cart with quantity rules.
              Built with React functional components and clean state management.
            </p>
          </div>
        </div>

        <div className="layout">
          <ProductsPage />
          <CartPanel />
        </div>

        <div className="hint" style={{ marginTop: 14 }}>
          <strong>Note for candidates:</strong> Please share pictures of any rough work you do while solving the assignment.
          Only candidates who submit their worksheets will be considered for the next interview round.
        </div>
      </div>
    </CartProvider>
  )
}
