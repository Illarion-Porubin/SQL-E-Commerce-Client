import * as React from 'react';
import { Container } from '../../../components/containerComp/Container';
import { Cards } from '../adminCards/Cards';
import { selectProductData } from '../../../redux/selectos';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { fetchGetProductsByLabel, fetchSearchProduct } from '../../../redux/slices/productSlice';
import { Paginate } from '../../../components/paginateComp/Paginate';
import useDebounce from '../../../hooks/useDebounce';
import s from './Products.module.scss';
import { Categories } from '../../../components/categoriesComp/Categories';
import { Service } from '../adminService/Service';
import { Modal } from '../adminModal/Modal';


export const ProductsContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [search, setSearch] = React.useState<string>(``)
    const [label, setLabel] = React.useState<string>('all');
    const [page, setPage] = React.useState<number>(1);
    const [modalActive, setModalActive] = React.useState<boolean>(false)
    const [id, setId] = React.useState<number | undefined>();

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
            <Modal setModalActive={setModalActive} modalActive={modalActive} id={id} setId={setId}/>
            <>
                <div className={s.products}>
                    <Service setModalActive={setModalActive} modalActive={modalActive} setId={setId}/>
                </div>
                <Cards products={products} key={'Cards'} setModalActive={setModalActive} setId={setId} />
                <div className={s.paginate}>
                    <Paginate
                        key={'Paginate'}
                        page={page}
                        search={search}
                        setSearch={setSearch}
                        setPage={setPage}
                        checkPage={checkPage}
                    />,
                </div>
            </>
        </>
    )
}

export const Products: React.FC = () => {
    return (
        <Container children={[<ProductsContent key={`ProductsContent`} />]} />
    )
}