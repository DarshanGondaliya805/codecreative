import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import FrontendHirePage from '../components/hireDeveloper/FrontendHirePage';
import BackendHirePage from '../components/hireDeveloper/BackendHirePage';
import DesignHirePage from '../components/hireDeveloper/DesignHirePage';
import DevOpsHirePage from '../components/hireDeveloper/DevOpsHirePage';
import AlmlHirePageLight from '../components/hireDeveloper/AlmlHirePage';
import FullStackHirePage from '../components/hireDeveloper/FullStackHirePage';
import MobileHirePage from '../components/hireDeveloper/MobileHirePage';
import SeoHirePage from '../components/hireDeveloper/SeoHirePage';
import SocialHirePage from '../components/hireDeveloper/SocialHirePage';

const HireDev = () => {
    const { type } = useParams<{ type: string }>();

    const handleLayouts = (type: string) => {
        switch (type) {
            case 'fronted':
                return <FrontendHirePage />
            case 'backend':
                return <BackendHirePage />
            case 'designer':
                return <DesignHirePage />
            case 'devops':
                return <DevOpsHirePage />
            case 'alml':
                return <AlmlHirePageLight />
            case 'fullstack':
                return <FullStackHirePage />
            case 'mobileapp':
                return <MobileHirePage />
            case 'seoexpert':
                return <SeoHirePage />
            case 'socialmediaexpert':
                return <SocialHirePage />
            
        }
    }
    return (
       <Fragment>{type && handleLayouts(type)}</Fragment>
    )
}

export default HireDev