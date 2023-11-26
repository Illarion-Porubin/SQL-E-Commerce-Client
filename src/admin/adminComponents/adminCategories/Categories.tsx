import * as React from 'react';
import { Container } from '../../../components/containerComp/Container';
import s from './Categories.module.scss';
import cross from '../../../asets/svg/cross.svg';
import accept from '../../../asets/svg/check.svg';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { fetchAddCategory, fetchDeleteCategory, fetchGetCategories } from '../../../redux/slices/categorySlyce';
import { selectCategoriesData } from '../../../redux/selectos';
import { Category } from '../../../types/types';



export const CategoriesContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const categories = useCustomSelector(selectCategoriesData);
    const [add, setAdd] = React.useState<boolean>(true);
    const [category, setCategory] = React.useState<string>('')

    const close = () => {
        setCategory('')
        setAdd(true)
    }

    const addCategory = () => {
        dispatch(fetchAddCategory({ title: category }))
        setCategory('')
        setAdd(true)
    }

    const updateCategory = (id: number) => {
        dispatch(fetchAddCategory({ title: category }))
    }

    const deleteCategory = (value: number) => {
        dispatch(fetchDeleteCategory({ id: value }))
        setTimeout(() => {
            dispatch(fetchGetCategories())
        }, 300)
    }

    React.useEffect(() => {
        dispatch(fetchGetCategories())
    }, [])

    return (
        <>
            <div className={s.categories}>
                <div className={s.categories__content}>
                    {add ?
                        <button className={s.categories__add_btn} onClick={() => setAdd(false)}>+ Добавить</button>
                        :
                        <div className={s.categories__add}>
                            <input
                                className={s.categories__add_input}
                                type="text"
                                placeholder='Добавьте категорию'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <img
                                className={`${s.categories__add_svg} ${s.categories__accept}`}
                                onClick={() => addCategory()}
                                src={accept} alt="accept"
                            />
                            <img
                                className={`${s.categories__add_svg} ${s.categories__cross}`}
                                onClick={() => close()}
                                src={cross} alt="cross"
                            />
                        </div>
                    }

                    {
                        //создать компонент categoryList [category, setCategory]
                        categories.data.map((value: Category) => (
                            <div className={s.categories__item} key={value.id}>
                                <input type="text" value={value.title} />
                                <img
                                    className={`${s.categories__item_svg} ${s.categories__accept}`}
                                    onClick={() => close()}
                                    src={accept} alt="accept"
                                />
                                <img
                                    className={`${s.categories__item_svg} ${s.categories__cross}`}
                                    onClick={() => deleteCategory(value.id)}
                                    src={cross} alt="cross"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export const Categories: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<CategoriesContent key={`ProductsContent`} />]} />
        </div>
    )
}