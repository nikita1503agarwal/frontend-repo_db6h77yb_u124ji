import { useEffect, useState } from 'react'

const MOODS = [
  { key: 'great', label: 'Great', color: 'bg-emerald-500' },
  { key: 'good', label: 'Good', color: 'bg-green-500' },
  { key: 'okay', label: 'Okay', color: 'bg-yellow-500' },
  { key: 'low', label: 'Low', color: 'bg-orange-500' },
  { key: 'down', label: 'Down', color: 'bg-red-500' },
]

export default function InteractiveTools() {
  const [mood, setMood] = useState(null)
  const [note, setNote] = useState('')
  const [stats, setStats] = useState(null)
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submitMood = async () => {
    if (!mood) return
    await fetch(`${base}/api/mood`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, note }),
    })
    setNote('')
    setMood(null)
    loadStats()
  }

  const loadStats = async () => {
    try {
      const res = await fetch(`${base}/api/mood/stats`)
      const data = await res.json()
      setStats(data)
    } catch (e) {
      setStats({ total: 0, counts: {} })
    }
  }

  useEffect(() => { loadStats() }, [])

  return (
    <section id="tools" className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Interactive Mental Health Tools</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Quick Mood Check-in</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {MOODS.map(m => (
                <button key={m.key} className={`px-4 py-2 rounded-full text-white ${m.color} ${mood===m.key?'ring-4 ring-black/10':''}`} onClick={()=>setMood(m.key)}>
                  {m.label}
                </button>
              ))}
            </div>
            <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a short note (optional)" className="w-full border rounded-xl p-3 min-h-[100px]"></textarea>
            <button onClick={submitMood} className="mt-3 px-4 py-2 rounded-xl bg-black text-white font-semibold">Save Check-in</button>
          </div>

          <div className="p-6 bg-white border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Mood Statistics</h3>
            {!stats ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Total Entries" value={stats.total} />
                {Object.entries(stats.counts).map(([k,v]) => (
                  <Stat key={k} label={k.charAt(0).toUpperCase()+k.slice(1)} value={v} />
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">Tip: Track your mood daily to spot trends during exams and project sprints.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }){
  return (
    <div className="p-4 rounded-xl border bg-gray-50">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value ?? 0}</p>
    </div>
  )
}
