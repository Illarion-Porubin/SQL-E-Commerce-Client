import * as React from 'react';
import s from './Products.module.scss';
import { Container } from '../../../components/containerComp/Container';
import { Cards } from '../adminCards/Cards';
import { selectProductData } from '../../../redux/selectos';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { fetchGetProductsByCategory, fetchSearchProduct } from '../../../redux/slices/productSlice';
import { Paginate } from '../../../components/paginateComp/Paginate';
import { Modal } from '../adminModal/Modal';
import { Service } from '../adminService/Service';
import useDebounce from '../../../hooks/useDebounce';


export const ProductsContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [search, setSearch] = React.useState<string>(``)
    const [page, setPage] = React.useState<number>(1);
    const [modalActive, setModalActive] = React.useState<boolean>(false)
    const [product, setProduct] = React.useState<any>();
    const [category, setCategory] = React.useState<string>('all');
    const products = useCustomSelector(selectProductData);
    const checkPage = products.data.length < 8;
    const debounce = useDebounce(search, 400);

   

    React.useEffect(() => {
        if (debounce) {
            dispatch(fetchSearchProduct(JSON.stringify({word: debounce, page: page - 1})));
        }
        else {
            dispatch(fetchGetProductsByCategory(JSON.stringify({ page: page - 1, category: category })));
        }
    }, [dispatch, debounce, page, category])

    React.useEffect(() => {
        setPage(1)
    }, [category])

    console.log(products)

    return (
        <>
            <Modal setModalActive={setModalActive} modalActive={modalActive} product={product} setProduct={setProduct} />
            <>
                <div className={s.products}>
                    <Service setModalActive={setModalActive} modalActive={modalActive} setProduct={setProduct} setCategory={setCategory}/>
                </div>
                <Cards products={products} key={'Cards'} setModalActive={setModalActive} setProduct={setProduct} />
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