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

export default Routermain