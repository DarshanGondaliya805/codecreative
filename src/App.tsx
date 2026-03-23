import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Routermain from './router'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      <Navbar />
      <Routermain />
      <Footer />
    </div>
  )
}

export default App
