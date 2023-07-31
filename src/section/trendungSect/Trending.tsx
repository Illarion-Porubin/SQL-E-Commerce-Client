import * as React from 'react';
import { Heading } from '../../components/headingComp/heading';
import { Categories } from '../../components/categoriesComp/Categories';
import { Container } from '../../components/containerComp/Container';
import { Cards } from '../../components/cardsComp/Cards';
import { Ofer } from '../../components/oferComp/Ofer';

export const Trending: React.FC = () => {
    const trendingCat = [
        'All Products',
        'Best Sellers',
        'New Arrivals',
        'Todays Deals'
    ]

    return (
        <section>
            <Heading title={'TRENDING'} />
            <Categories categorieList={trendingCat} />           
            <Container children={[<Cards key={'Cards'}/>, <Heading title={'SPECIAL OFFER'} key={'SPECIAL OFFER'} />, <Ofer key={'Ofer'}/>]} />
        </section>
    )
}