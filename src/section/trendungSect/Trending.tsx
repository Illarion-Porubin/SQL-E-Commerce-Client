import * as React from 'react';
import { Heading } from '../../components/headingComp/heading';
import { Categories } from '../../components/categoriesComp/Categories';
import { CardList } from '../../components/carListComp/CardList';
import { Container } from '../../components/containerComp/Container';

export const Trending: React.FC = () => {
    const categorieList = [
        'All Products',
        'Best Sellers',
        'Best Sellers',
        'Todays Deals'
    ]

    return (
        <>
            <Heading title={'TRENDING'} />
            <Categories categorieList={categorieList} />
            <Container children={[<CardList countCards={1}/>]} />
        </>
    )
}