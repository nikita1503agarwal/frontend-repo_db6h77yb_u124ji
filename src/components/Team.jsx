export default function Team(){
  return (
    <section id="team" className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{name:'Ava Patel',role:'Clinical Advisor'},{name:'Liam Chen',role:'Data Analyst'},{name:'Sara Gomez',role:'Frontend'},{name:'Noah Singh',role:'Backend'}].map((m)=> (
            <div key={m.name} className="p-6 border rounded-2xl bg-white">
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mb-4">{m.name.split(' ').map(x=>x[0]).join('')}</div>
              <h3 className="font-semibold text-black">{m.name}</h3>
              <p className="text-gray-600 text-sm">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
