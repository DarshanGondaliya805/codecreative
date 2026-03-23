<<<<<<< HEAD
import Routermain from './router'

function App() {

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
        <Routermain />
=======
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Routermain from './router'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      <Navbar />
      <Routermain />
      <Footer />
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
    </div>
  )
}

export default App
