import { Fragment } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import TechStack from '../components/TechStack'
import Services from '../components/Services'
import Process from '../components/Process'
import Timeline from '../components/Timeline'
import WhoWeHelp from '../components/whowehelp'
import Stats from '../components/Stats'
import Portfolio from '../components/Portfolio'
import JoinTeam from '../components/JoinTeam'
import Blog from '../components/Blog'
import Testimonials from '../components/Testimonials'
import Branches from '../components/Branches'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import TrustedBrands from '../components/TrustedBy'

const Home = () => {
    return (
        <Fragment>
            <Hero />
            <About />
            <WhyChooseUs />
            <TechStack />
            <Services />
            <TrustedBrands />
            <Process />
            <WhoWeHelp />
            <Timeline />
            <Stats />
            <Portfolio />
            <JoinTeam />
            <Blog />
            <Testimonials />
            <Branches />
            <FAQ />
            <Contact />
        </Fragment>
    )
}

export default Home