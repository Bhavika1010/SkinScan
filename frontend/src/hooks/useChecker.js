import { useState, useCallback } from 'react'
import { analyzeIngredients, loadSample } from '../utils/api'

export function useChecker() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await analyzeIngredients(input)
      setResults(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [input])

  const fillSample = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await loadSample()
      setInput(data.ingredients)
      setResults(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setInput('')
    setResults(null)
    setError(null)
  }, [])

  return { input, setInput, results, loading, error, analyze, fillSample, reset }
}
