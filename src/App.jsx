import Hero from './components/Hero'
import Assessments from './components/Assessments'
import InteractiveTools from './components/InteractiveTools'
import Resources from './components/Resources'
import Team from './components/Team'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <a href="#home" className="font-extrabold tracking-tight text-xl">IT Mental Health</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#assess" className="hover:underline">Assessments</a>
            <a href="#tools" className="hover:underline">Tools</a>
            <a href="#resources" className="hover:underline">Resources</a>
            <a href="#team" className="hover:underline">Team</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <a href="#assess" className="px-3 py-2 rounded-lg bg-black text-white text-sm font-semibold">Start</a>
        </div>
      </header>

      <Hero />
      <Assessments />
      <InteractiveTools />
      <Resources />
      <Team />
      <Contact />

      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} IT Student Mental Health</p>
          <a href="/test" className="underline">System Check</a>
        </div>
      </footer>
    </div>
  )
}

export default App
