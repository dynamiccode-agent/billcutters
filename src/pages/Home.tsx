import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Team from '../components/Team'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Team />
      <Contact />
      <Footer />
    </div>
  )
}
