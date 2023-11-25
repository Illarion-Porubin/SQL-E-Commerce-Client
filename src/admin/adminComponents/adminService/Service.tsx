import * as React from 'react';
import s from './Service.module.scss';
import { Search } from '../../../components/searchComp/Search';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectCategoriesData } from '../../../redux/selectos';
import { fetchGetCategories } from '../../../redux/slices/categorySlyce';


export const Service = () => {
    const dispatch = useCustomDispatch();
    const category = useCustomSelector(selectCategoriesData);
    const sortRef = React.useRef<HTMLDivElement>(null);
    const [search, setSearch] = React.useState<string>('');

    React.useEffect(() => {
        dispatch(fetchGetCategories())
    }, [])

    const addCategory = () => {

    }

    return (
        <>
            <div className={s.service}>
                <button className={s.service__add_btn}>+ Добавить</button>
                <div className={s.service__serch}>
                    <Search key={'Search'} showSelect={false} value={search} setSearch={setSearch} />
                </div>
                <div className={s.service__wrap}>
                    <div ref={sortRef} className={s.service__sort}>
                        <div className={s.service__label}>
                            <b>Категории</b>
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={s.service__arrow}
                            >
                                <path
                                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                    fill="#FFFFFF"
                                />
                            </svg>
                        </div>
                        <div >
                            <ul className={s.service__list}>
                                {category.data.map((item: any, index: number) => (
                                    <li
                                        className={s.service__category}
                                        key={item.id}
                                    // onClick={() => selectSort(index, value.sort)}
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}