import * as React from 'react';
import s from './Modal.module.scss';
import { UploadWidget } from '../../../components/upLoad/upLoadWidget';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectCategoriesData } from '../../../redux/selectos';
import { Category } from '../../../types/types';
import { fetchAddProduct, fetchGetProducts } from '../../../redux/slices/productSlice';

interface Props {
    setModalActive: (value: boolean) => void,
    modalActive: boolean,
}
export const Modal: React.FC<Props> = ({ modalActive, setModalActive }) => {
    const dispatch = useCustomDispatch()
    const [url, setUrl] = React.useState('');
    const categorys = useCustomSelector(selectCategoriesData);
    const labls = ['Top', 'New', 'Hot', 'Hit', 'Best', 'Today'];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(data.entries())
        const newProduct = {
            category: value.category,
            desc: value.desc,
            label: value.label,
            img: url,
            newprice: value.newPrice,
            oldprice: value.oldPrice
        }
        dispatch(fetchAddProduct(newProduct))
        setTimeout(() => {
            dispatch(fetchGetProducts())
        }, 300);
    }

    return (
        <>
            <div className={modalActive ? `${s.modal} ${s.active}` : s.modal} onClick={() => setModalActive(false)}>
                <form className={modalActive ? `${s.modal__content} ${s.active}` : s.modal__content}
                    onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleSubmit(e)}
                >
                    <div className={s.modal__drop_label_list}>
                        <label htmlFor="add-label"></label>
                        <select name="label" id="add-label" required>
                            <option value="">Выберите маркировку</option>
                            {labls.map((item: string) => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <UploadWidget url={url} setUrl={setUrl} admin={true} />
                    <div className={s.modal__drop_category_list}>
                        <label htmlFor="add-category"></label>
                        <select name="category" id="add-category" required>
                            <option value="">Выберите категорию</option>
                            {categorys.data.map((item: Category) => (
                                <option value={item.title} key={item.id}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="add-desc"></label>
                    <input className={s.modal__title_input}
                        name='desc'
                        id='add-desc'
                        type="text"
                        placeholder='Desc'
                        required
                    />
                    <div className={s.modal__inputs}>
                        <label htmlFor="add-newPrice"></label>
                        <input className={s.modal__input}
                            name='newPrice'
                            id='add-newPrice'
                            type="number"
                            placeholder='New price'
                            min="1"
                            required
                        />
                        <label htmlFor="add-oldPrice"></label>
                        <input className={s.modal__input}
                            name='oldPrice'
                            id='add-oldPrice'
                            type="number"
                            placeholder='Old price'
                            min="10"
                            required
                        />
                    </div>
                    <label htmlFor="add-rating"></label>
                        <input className={s.modal__input}
                            name='rating'
                            id='add-rating'
                            type="number"
                            placeholder='Rating'
                            min="1" max="5000"
                            required
                        />
                    <input className={s.modal__btn} type="submit" value='Сохранить' />
                </form>
            </div>
        </>
    )
}