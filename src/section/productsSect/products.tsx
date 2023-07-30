import * as React from 'react';
import { Categories } from '../../components/categoriesComp/Categories';
import { Heading } from '../../components/headingComp/heading';
import { Container } from '../../components/containerComp/Container';
import { Cards } from '../../components/cardsComp/Cards';
import { Paginate } from '../../components/paginateComp/Paginate';
import { CustomerSlider } from '../../components/slidersComp/CustomerSlider';

export const Products: React.FC = () => {

    const productsCategories = [
        'All Products',
        'Best Sellers',
        'New Arrivals',
        'Todays Deals'
    ]

    return (
        <>
            <Heading title={"OUR PRODUCTS"} />
            <Categories categorieList={productsCategories} key={'Categories'} />,
            <Container children={[
                <Cards key={'Cards'} />,
                <Paginate key={'Paginate'} />,
                <CustomerSlider key={'CustomerSlider'} />
            ]} />
        </>
    )
}