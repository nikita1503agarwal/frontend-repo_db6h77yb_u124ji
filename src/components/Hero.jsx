import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-white"></div>
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center px-6 py-20">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black text-sm mb-4">
            <span>Healthcare • Education • Technology</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black mb-4">
            Mental Health for IT Students
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Evidence-based assessments, interactive tools, and insights tailored for students in tech.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#assess" className="px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">Start Assessment</a>
            <a href="#tools" className="px-5 py-3 rounded-xl bg-gray-900/5 text-black font-semibold hover:bg-gray-900/10 transition">Explore Tools</a>
          </div>
        </div>
        <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10">
          <Spline scene="https://prod.spline.design/kow0cKDK6Tap7xO9/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
