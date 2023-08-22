import * as React from 'react';
import { Heading } from '../../components/headingComp/heading';
import { Article } from '../../components/articlesComp/Article';
import { Container } from '../../components/containerComp/Container';
import { FooterNav } from '../../components/footerNavComp/FooterNav';
import { Footer } from '../../components/footerComp/Footer';

export const Articles: React.FC = () => {
    return (
        <section>
            <Heading title={'Our Latest Articles'} />
            <Container children={[
                <Article key={'Article'} />,
                <FooterNav key={'FooterNav'} />,
            ]} />
            <Footer />
        </section>
    )
}