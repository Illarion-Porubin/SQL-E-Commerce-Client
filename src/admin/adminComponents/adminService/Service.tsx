import * as React from 'react';
import s from './Service.module.scss';
import { Search } from '../../../components/searchComp/Search';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectCategoriesData } from '../../../redux/selectos';
import { fetchGetCategories } from '../../../redux/slices/categorySlyce';
import { Category } from '../../../types/types';

interface Props {
    setModalActive: (value: boolean) => void,
    modalActive: boolean,
    setProduct: (value: number | undefined) => void,
}

export const Service: React.FC<Props> = ({ setModalActive, modalActive, setProduct }) => {
    const dispatch = useCustomDispatch();
    const category = useCustomSelector(selectCategoriesData);
    const sortRef = React.useRef<HTMLDivElement>(null);
    const [search, setSearch] = React.useState<string>('');
    const [drop, setDrop] = React.useState<boolean>(false);



    React.useEffect(() => {
        dispatch(fetchGetCategories())
    }, [])

    const sort = (value: string) => {
        console.log(value)
    }

    const addProduct = (e: any) => {
        setProduct(undefined)
        setModalActive(!modalActive)
        e.stopPropagation()
    }

    return (
        <>
            <div className={s.service}>
                <button className={s.service__add_btn}
                    onClick={(e) => { addProduct(e) }}
                >+ Добавить
                </button>
                <div className={s.service__serch}>
                    <Search key={'Search'} showSelect={false} value={search} setSearch={setSearch} />
                </div>
                <div ref={sortRef} className={s.service__sort}>
                    <button className={s.service__dropdown_btn} onClick={() => setDrop(!drop)}>Категории</button>
                    <ul className={s.service__dropdown_list}>
                        {category.data.map((item: Category) => (
                            <li
                                className={drop ? `${s.service__dropdown_li} ${s.active}` : s.service__dropdown_li}
                                key={item.id}
                                onClick={() => sort(item.title)}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}