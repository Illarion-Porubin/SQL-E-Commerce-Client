import * as React from 'react';
import { CollectionsSlider } from '../../components/slidersComp/CollectionsSlider';
import { Feature } from '../../components/featureComp/Feature';
import { Header } from '../../components/headerComp/Header';
import { Menu } from '../../components/menuComp/Menu';
import { Modern } from '../../components/modernComp/Modern';
import { Container } from '../../components/containerComp/Container';




export const Welcome: React.FC = () => {


    return (
        <>
            <Header />
            <Container children={[
                <Menu key={'Menu'}/>,
                <CollectionsSlider key={'CollectionsSlider'}/>,
                <Feature key={'Feature'}/>,
                <Modern key={'Modern'}/>
            ]} />
        </>
    )
}