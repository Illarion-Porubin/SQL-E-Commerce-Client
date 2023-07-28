import * as React from 'react';
import { CollectionsSlider } from '../../components/slidersComp/CollectionsSlider';
import { Feature } from '../../components/featureComp/Feature';
import { Header } from '../../components/headerComp/Header';
import { Menu } from '../../components/menuComp/Menu';
import { Modern } from '../../components/modernComp/Modern';




export const Welcome: React.FC = () => {


    return (
        <>
            <Header />
            <div className='container'>
                <Menu />
                <CollectionsSlider />
                <Feature />
                <Modern />
            </div>
        </>
    )
}