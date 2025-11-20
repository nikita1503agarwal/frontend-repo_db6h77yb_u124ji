import { useEffect, useState } from 'react'

export default function Resources() {
  const [items, setItems] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${base}/api/resources`)
        const d = await r.json()
        setItems(d)
      } catch (e) {
        setItems([])
      }
    }
    load()
  }, [])

  return (
    <section id="resources" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Educational Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <a key={i} href={item.url} target="_blank" className="group p-6 border rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{item.category}</p>
              <h3 className="text-lg font-semibold text-black group-hover:underline">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
