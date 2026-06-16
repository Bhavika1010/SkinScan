const BASE = import.meta.env.VITE_API_URL || '/api'

export async function analyzeIngredients(ingredientText) {
  const res = await fetch(`${BASE}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: ingredientText }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Something went wrong')
  }
  return res.json()
}

export async function loadSample() {
  const res = await fetch(`${BASE}/sample`)
  if (!res.ok) throw new Error('Could not load sample')
  return res.json()
}
