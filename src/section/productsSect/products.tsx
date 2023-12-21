import * as React from 'react';
import { Categories } from '../../components/categoriesComp/Categories';
import { Heading } from '../../components/headingComp/Heading';
import { Container } from '../../components/containerComp/Container';
import { Cards } from '../../components/cardsComp/Cards';
import { Paginate } from '../../components/paginateComp/Paginate';
import { CustomerSlider } from '../../components/slidersComp/CustomerSlider';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectProductData } from '../../redux/selectos';
import { fetchGetProductsByLabel, fetchSearchProduct } from '../../redux/slices/productSlice';
import useDebounce from '../../hooks/useDebounce';

export const Products: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [search, setSearch] = React.useState<string>(``)
    const [label, setLabel] = React.useState<string>('all');
    const [page, setPage] = React.useState<number>(1);

    const debounce = useDebounce(search, 400);
    const products = useCustomSelector(selectProductData);
    const checkPage = products.data.length < 8;

    React.useEffect(() => {
        if (debounce) {
            dispatch(fetchSearchProduct(JSON.stringify({word: debounce, page: page - 1})));
        }
        else {
            dispatch(fetchGetProductsByLabel(JSON.stringify({ page: page - 1, label: label })));
        }
    }, [dispatch, debounce, page, label])

    React.useEffect(() => {
        setPage(1)
    }, [label])

    const productsCategories = [
        { label: 'all', title: 'All Products' },
        { label: 'best', title: 'Best Sellers' },
        { label: 'new', title: 'New Arrivals' },
        { label: 'today', title: 'Today Deals' },
    ]

    return (
        <section>
            <Heading title={"OUR PRODUCTS"} />
            <Categories categorieList={productsCategories} key={'Categories'} setLabel={setLabel} label={label} />,
            <Container children={[
                <Cards products={products} key={'Cards'} />,
                <Paginate
                    key={'Paginate'}
                    page={page}
                    search={search}
                    setSearch={setSearch}
                    setPage={setPage}
                    checkPage={checkPage}
                />,
                <CustomerSlider key={'CustomerSlider'} />
            ]} />
        </section>
    )
}