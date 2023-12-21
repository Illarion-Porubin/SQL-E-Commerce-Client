import * as React from 'react';
import { Heading } from '../../components/headingComp/Heading';
import { Categories } from '../../components/categoriesComp/Categories';
import { Container } from '../../components/containerComp/Container';
import { Cards } from '../../components/cardsComp/Cards';
import { Ofer } from '../../components/oferComp/Ofer';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectTrendingData } from '../../redux/selectos';
import { fetchGetTrendingByLabel } from '../../redux/slices/trendingSlice';
import { TrendingPaginate } from '../../components/trendingPaginate/TrendingPaginate';

export const Trending: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [label, setLabel] = React.useState<string>('top');
    const products = useCustomSelector(selectTrendingData);
    const [page, setPage] = React.useState<number>(1);
    const checkPage = products.data.length < 8;

    const trendingCat = [
        { label: 'top', title: 'Top Products' },
        { label: 'hit', title: 'Hit of the season' },
        { label: 'hot', title: 'Hot offer' },
    ]

    React.useEffect(() => {
        dispatch(fetchGetTrendingByLabel(JSON.stringify({ page: page - 1, label: label })))
    }, [dispatch, label, page])

    React.useEffect(() => {
        setPage(1)
    }, [label])
    return (
        <section>
            <Heading title={'TRENDING'} />
            <Categories categorieList={trendingCat} setLabel={setLabel} label={label} />
            <Container
                children={[
                    <Cards products={products} key={'Cards'} />,
                    <TrendingPaginate setPage={setPage} checkPage={checkPage} key={'TrendingPaginate'}/>,
                    <Heading title={'SPECIAL OFFER'} key={'Heading'} />,
                    <Ofer key={'Ofer'} />
                ]}
            />
        </section>
    )
}