import * as React from 'react';
import { Heading } from '../../components/headingComp/heading';
import { Categories } from '../../components/categoriesComp/Categories';
import { Container } from '../../components/containerComp/Container';
import { Cards } from '../../components/cardsComp/Cards';
import { Ofer } from '../../components/oferComp/Ofer';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectProductData } from '../../redux/selectos';
import { fetchGetProducts } from '../../redux/slices/productSlice';

export const Trending: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [label, setLabel] = React.useState<string>('all');
    const productsState = useCustomSelector(selectProductData)

    // React.useEffect(() => {
    //     dispatch(fetchGetProducts(0))
    // }, [dispatch])

    const trendingCat = [
        {label: 'all', title: 'All Products'},
        {label: 'best', title: 'Best Sellers'},
        {label: 'new', title: 'New Arrivals'},
        {label: 'today', title: 'Today Deals'},
    ]

    return (
        <section>
            <Heading title={'TRENDING'} />
            <Categories categorieList={trendingCat} setLabel={setLabel} />
            <Container children={[<Cards products={productsState} key={'Cards'} />, <Heading title={'SPECIAL OFFER'} key={'SPECIAL OFFER'} />, <Ofer key={'Ofer'} />]} />
        </section>
    )
}