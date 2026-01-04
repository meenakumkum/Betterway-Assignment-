import { useEffect, useMemo, useState } from 'react'
import { mockProducts } from '../data/mockProducts.js'

/**
 * Product model used across the app:
 * { id, title, price, category, stock, thumbnail }
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      try {
        // API option (primary). Falls back to mock data on failure.
        const res = await fetch('https://dummyjson.com/products?limit=20', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        const mapped = (data.products || []).map((p) => ({
          id: p.id,
          title: p.title,
          price: Number(p.price),
          category: p.category,
          stock: Number(p.stock ?? 0),
          thumbnail: p.thumbnail || (p.images && p.images[0]) || '',
        }))

        if (isMounted) setProducts(mapped.length ? mapped : mockProducts)
      } catch (e) {
        if (e?.name === 'AbortError') return
        if (isMounted) {
          setProducts(mockProducts)
          setError('Could not fetch from API. Using mock data.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean))
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [products])

  return { products, categories, loading, error }
}
