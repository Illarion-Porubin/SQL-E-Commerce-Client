import * as React from 'react';
import { Heading } from '../../components/headingComp/heading';
import { Categories } from '../../components/categoriesComp/Categories';

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
            <Categories categorieList={categorieList}/>
        </>
    )
}