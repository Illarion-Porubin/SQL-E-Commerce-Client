import * as React from 'react';
import s from './CategoryList.module.scss';
import cross from '../../../asets/svg/cross.svg';
import update from '../../../asets/svg/pencil.svg';
import { Category } from '../../../types/types';
import { useCustomDispatch } from '../../../hooks/store';
import { fetchUpdateCategory } from '../../../redux/slices/categorySlyce';

interface Props {
    value: Category,
    close: () => void,
    deleteCategory: (id: number) => void,
}

export const CategoryList: React.FC<Props> = ({ value, close, deleteCategory, }) => {
    const dispatch = useCustomDispatch();
    const [category, setCategory] = React.useState<string>(value.title);

    const updateCategory = (id: number) => {
        dispatch(fetchUpdateCategory({ id, title: category }))
    }

    return (
        <>
            <div className={s.categories__item} key={value.id}>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <img
                    className={`${s.categories__item_svg} ${s.categories__accept}`}
                    onClick={() => updateCategory(value.id)}
                    src={update} alt="update"
                />
                <img
                    className={`${s.categories__item_svg} ${s.categories__cross}`}
                    onClick={() => deleteCategory(value.id)}
                    src={cross} alt="cross"
                />
            </div>
        </>
    )
}