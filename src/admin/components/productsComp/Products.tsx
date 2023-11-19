import * as React from 'react';
import { Container } from '../../../components/containerComp/Container';
import s from './Products.module.scss';
import { Cards } from '../../../components/cardsComp/Cards';
import { selectProductData } from '../../../redux/selectos';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { fetchGetProductsByLabel, fetchSearchProduct } from '../../../redux/slices/productSlice';
import { Paginate } from '../../../components/paginateComp/Paginate';
import useDebounce from '../../../hooks/useDebounce';


export const ProductsContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [search, setSearch] = React.useState<string>(``)
    const [label, setLabel] = React.useState<string>('all');
    const [page, setPage] = React.useState<number>(1);

    const debounce = useDebounce(search, 400);
    const products = useCustomSelector(selectProductData);

    const checkPage = products.data.length < 8;

    React.useEffect(() => {
        if (debounce) {
            dispatch(fetchSearchProduct(JSON.stringify({ word: debounce, page: page - 1 })));
        }
        else {
            dispatch(fetchGetProductsByLabel(JSON.stringify({ page: page - 1, label: label })));
        }
    }, [dispatch, debounce, page, label])

    React.useEffect(() => {
        setPage(1)
    }, [label])


    return (
        <>
            <Cards products={products} key={'Cards'} />,
            <Paginate
                key={'Paginate'}
                page={page}
                search={search}
                setSearch={setSearch}
                setPage={setPage}
                checkPage={checkPage}
            />,
        </>
    )
}

export const Products: React.FC = () => {
    return (
        <Container children={[<ProductsContent key={`ProductsContent`} />]} />
    )
}