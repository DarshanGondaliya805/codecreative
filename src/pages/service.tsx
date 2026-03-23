import { useParams } from "react-router-dom";
import Servicepage from "../components/services/servicepage";
import { Fragment } from "react";
import MobileServicePage from "../components/services/appDevelopment";
import CloudSolutionsPage from "../components/services/cloudDevelopment";
import EcommercePage from "../components/services/EcommercePage";
import MicroServicePage from "../components/services/apimicroservice";
import Webdesigning from "../components/services/webdesigningdevelopment";
import FullStack from "../components/services/fullStack";
import UiUxDevelopment from "../components/services/uiuxdevelopment";
import Qadevelopment from "../components/services/qaDevelopment";
import Digitalmarketing from "../components/services/digitalmarketing";
import BackendDevelopment from "../components/services/backendDevelopment";
import AIVision from "../components/services/aimldevelopment";
import SeoDevelopment from "../components/services/seodevelopment";

const Service = () => {
    const { type } = useParams<{ type: string }>();

    const handleLayouts = (type: string) => {
        switch (type) {
            case 'webdevelopment':
                return <Servicepage />
            case 'appdevelopment':
                return <MobileServicePage />
            case 'clouddevelopment':
                return <CloudSolutionsPage />
            case 'seo':
                return <SeoDevelopment />
            case 'ecommercedevelopment':
                return <EcommercePage />
            case 'fullstachdevelopment':
                return <FullStack />
            case 'uiuxdevelopment':
                return <UiUxDevelopment />
            case 'qa&automation':
                return <Qadevelopment />
            case 'webdesigning':
                return <Webdesigning />
            case 'digitalmarketing':
                return <Digitalmarketing />
            case 'backenddevelopment':
                return <BackendDevelopment />
            case 'aimldevelopment':
                return <AIVision />
            case 'microservice':
                return <MicroServicePage />
        }
    }
    return (
        <Fragment>{type && handleLayouts(type)}</Fragment>
    )
}

export default Service