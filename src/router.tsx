<<<<<<< HEAD
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AboutPage from "./pages/about";
import HireDev from "./pages/hire";
import Service from "./pages/service";
import ContactPage from "./pages/contactPage";
import EngagementModelsPage from "./pages/engagementmodelspage";
import PrivacyPolicyPage from "./pages/privacyPolicyPage";
import TermsPage from "./pages/termsPage";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Solution from "./pages/solution";
import SolutionDetailPage from "./components/solution/Solutiondetailpage";
import CareersPage from "./pages/career";
import TechStackPage from "./pages/techstack";
import HireDevelopersPage from "./components/hireDeveloper/hireDeveloper";
import ProcessPage from "./pages/ourProcess";
import PortfolioPage from "./pages/casestudy";
import Servicepage from "./components/services/servicepage";

function Layout() { return (<> <Navbar /> <Outlet /> <Footer /> </>); }

const Routermain = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/service" element={<Servicepage />} />
                <Route path="/service/:type" element={<Service />} />
                <Route path="/solution" element={<Solution />} />
                <Route path="/solution/:type" element={<SolutionDetailPage />} />
                <Route path="/aboutus" element={<AboutPage />} />
                <Route path="/hiredeveloper" element={<HireDevelopersPage />} />
                <Route path="/hiredeveloper/:type" element={<HireDev />} />
                <Route path="/contactus" element={<ContactPage />} />
                <Route path="/engagementmodel" element={<EngagementModelsPage />} />
                <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                <Route path="/termsofuse" element={<TermsPage />} />
                <Route path="/career" element={<CareersPage />} />
                <Route path="/ourprocess" element={<ProcessPage />} />
                <Route path="/techstack" element={<TechStackPage />} />
                <Route path="/casestudy" element={<PortfolioPage />} />
                <Route path="/casestudy/:type" element={<PrivacyPolicyPage />} />
                <Route path="/blog" element={<PrivacyPolicyPage />} />
                <Route path="/blog/:type" element={<PrivacyPolicyPage />} />
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}

=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Servicepage from "./components/services/servicepage";
import MobileServicePage from "./components/services/appDevelopment";
import CloudSolutionsPage from "./components/services/cloudDevelopment";
import BackendDevelopment from "./components/services/backendDevelopment";
import UiUxDevelopment from "./components/services/uiuxdevelopment";
import Webdesigning from "./components/services/webdesigningdevelopment";
import Digitalmarketing from "./components/services/digitalmarketing";
import Qadevelopment from "./components/services/qaDevelopment";
import FullStack from "./components/services/fullStack";

const Routermain = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service/:type" element={<FullStack />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
export default Routermain