<<<<<<< HEAD
import { Fragment } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import TechStack from '../components/TechStack'
import Services from '../components/Services'
import Process, { makeSteps } from '../components/Process'
import Timeline from '../components/Timeline'
import WhoWeHelp from '../components/whowehelp'
import Stats from '../components/Stats'
import Portfolio from '../components/Portfolio'
import JoinTeam from '../components/JoinTeam'
import Blog from '../components/Blog'
import Testimonials from '../components/Testimonials'
// import Branches from '../components/Branches'
import FAQ from '../components/FAQ'
import TrustedBrands from '../components/TrustedBy'
import Branding1 from '../components/branding1'
import GlobalPresence from '../components/newBranches'
import ContactSection from '../components/newContact'
import contactus from "../assets/lottie/Discover.json"
import research from "../assets/lottie/thinking.json"
import str from "../assets/lottie/stre.json"
import design from "../assets/lottie/designnew.json"
import develop from "../assets/lottie/Programming.json"
import test from "../assets/lottie/qa.json"
import deploy from "../assets/lottie/cloud.json"
import gro from "../assets/lottie/Conversation.json"


const Home = () => {
const steps = makeSteps(contactus, research, str, design, develop, test, deploy, gro)

    return (
        <Fragment>
            <Hero />
            <About />
            <Branding1 />
            <WhyChooseUs />
            <TechStack />
            <Services />
            <TrustedBrands />
            <Process steps={steps}/>
            <WhoWeHelp />
            <Timeline />
            <Stats />
            <Portfolio />
            <JoinTeam />
            <Blog />
            <Testimonials />
            <GlobalPresence />
            <FAQ />
            <ContactSection />
        </Fragment>
    )
}

=======
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

>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
export default Home