import { useEffect, useMemo, useState } from 'react'

const A_MAP = {
  phq9: {
    title: 'PHQ-9 Depression Questionnaire',
    items: [
      'Little interest or pleasure in doing things',
      'Feeling down, depressed, or hopeless',
      'Trouble falling or staying asleep, or sleeping too much',
      'Feeling tired or having little energy',
      'Poor appetite or overeating',
      'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
      'Trouble concentrating on things, such as reading or coding tasks',
      'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless',
      'Thoughts that you would be better off dead, or of hurting yourself',
    ],
  },
  gad7: {
    title: 'GAD-7 Anxiety Questionnaire',
    items: [
      'Feeling nervous, anxious, or on edge',
      'Not being able to stop or control worrying',
      'Worrying too much about different things',
      'Trouble relaxing',
      'Being so restless that it is hard to sit still',
      'Becoming easily annoyed or irritable',
      'Feeling afraid, as if something awful might happen',
    ],
  },
}

const SCALE = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
]

export default function Assessments() {
  const [type, setType] = useState('phq9')
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const items = useMemo(() => A_MAP[type].items, [type])

  const setAnswer = (idx, value) => setAnswers(prev => ({ ...prev, [idx]: value }))

  const canSubmit = Object.keys(answers).length === items.length

  const submit = async () => {
    if (!canSubmit) return
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        assessment_key: type,
        answers: items.map((_, i) => Number(answers[i] ?? 0)),
      }
      const res = await fetch(`${base}/api/assessments/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="assess" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Mental Health Assessments</h2>
          <select value={type} onChange={e=>{setAnswers({});setResult(null);setType(e.target.value)}} className="px-3 py-2 border rounded-lg">
            <option value="phq9">PHQ-9</option>
            <option value="gad7">GAD-7</option>
          </select>
        </div>
        <div className="grid gap-6">
          {items.map((q, i) => (
            <div key={i} className="p-4 rounded-xl border bg-gray-50">
              <p className="font-medium mb-3">{i+1}. {q}</p>
              <div className="flex flex-wrap gap-2">
                {SCALE.map(s => (
                  <button
                    key={s.value}
                    onClick={()=>setAnswer(i, s.value)}
                    className={`px-3 py-2 rounded-lg border text-sm ${answers[i]===s.value? 'bg-black text-white border-black':'bg-white hover:bg-gray-100'}`}
                  >{s.label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button disabled={!canSubmit || loading} onClick={submit} className="px-5 py-3 rounded-xl bg-black text-white font-semibold disabled:opacity-50">
            {loading? 'Scoring...':'Get Result'}
          </button>
          {result && !result.error && (
            <div className="px-4 py-3 rounded-xl bg-green-50 text-green-800 border border-green-200">
              Score: <span className="font-bold">{result.score}</span> • Severity: <span className="font-bold">{result.severity}</span>
            </div>
          )}
          {result?.error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-red-800 border border-red-200">{result.error}</div>
          )}
        </div>
      </div>
    </section>
  )
}
