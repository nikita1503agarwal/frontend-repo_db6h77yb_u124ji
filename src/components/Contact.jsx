import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', subject:'', message:''})
  const [sent, setSent] = useState(false)
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${base}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setSent(true)
    setForm({name:'', email:'', subject:'', message:''})
  }

  return (
    <section id="contact" className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Contact</h2>
        {sent && <p className="mb-4 p-3 rounded-lg bg-green-50 text-green-800 border border-green-200">We received your message. Thank you!</p>}
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="px-4 py-3 border rounded-xl" />
            <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="px-4 py-3 border rounded-xl" />
          </div>
          <input required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="Subject" className="px-4 py-3 border rounded-xl" />
          <textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Message" className="px-4 py-3 border rounded-xl min-h-[140px]" />
          <button className="px-5 py-3 rounded-xl bg-black text-white font-semibold w-fit">Send</button>
        </form>
      </div>
    </section>
  )
}
