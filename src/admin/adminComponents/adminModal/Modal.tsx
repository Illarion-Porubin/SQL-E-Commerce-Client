import * as React from 'react';
import s from './Modal.module.scss';
import { UploadWidget } from '../../../components/upLoad/upLoadWidget';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectCategoriesData, selectProductData } from '../../../redux/selectos';
import { Category, ProductForm, ProductType } from '../../../types/types';
import { fetchAddProduct, fetchGetProducts, fetchUpdateProduct } from '../../../redux/slices/productSlice';
import axios from 'axios';

interface Props {
    setModalActive: (value: boolean) => void,
    modalActive: boolean,
    id: number | undefined,
    setId: (value: number | undefined) => void,
}
export const Modal: React.FC<Props> = ({ modalActive, setModalActive, id, setId }) => {
    const dispatch = useCustomDispatch()
    const [url, setUrl] = React.useState('');
    const categorys = useCustomSelector(selectCategoriesData);
    const labls = ['Top', 'New', 'Hot', 'Hit', 'Best', 'Today'];
    const [data, setData] = React.useState<ProductType | undefined>();

    if (id && !data) {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/product/${id}`,
        })
            .then(data => setData(data.data))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(formData.entries())
        if (!data && id) {
            const formProduct: ProductForm = {
                id: id,  
                desc: value.desc,
                label: value.label,
                img: url,
                newprice: value.newPrice,
                oldprice: value.oldPrice,
                rating: value.rating,
                CategoryId: value.category,
            }
            console.log(1)
            dispatch(fetchUpdateProduct(formProduct))
        } else {
            const newProduct = {
                desc: value.desc,
                label: value.label,
                img: url,
                newprice: value.newPrice,
                oldprice: value.oldPrice,
                rating: value.rating,
                CategoryId: value.category,
            }
            console.log(2)

            dispatch(fetchAddProduct(newProduct))
        }
        setTimeout(() => {
            dispatch(fetchGetProducts())
        }, 300);
    }

    const close = () => {
        setId(undefined)
        setTimeout(() => {
            setData(undefined)
        }, 300)
        setModalActive(false)
    }

    return (
        <>
            <div className={modalActive ? `${s.modal} ${s.active}` : s.modal} onClick={() => close()}>
                <form className={modalActive ? `${s.modal__content} ${s.active}` : s.modal__content}
                    onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleSubmit(e)}
                >
                    <div className={s.modal__drop_label_list}>
                        <label htmlFor="add-label"></label>
                        <select name="label" id="add-label" required>
                            <option value={data?.label || ''}>{data?.label || 'Выберите маркировку'}</option>
                            {labls.map((item: string) => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <UploadWidget url={data?.img || url} setUrl={setUrl} admin={true} />
                    <div className={s.modal__drop_category_list}>
                        <label htmlFor="add-category"></label>
                        <select name="category" id="add-category" required>
                            <option value={data?.CategoryId || ''}>{data?.CategoryId || 'Выберите категорию'}</option>
                            {categorys.data.map((item: Category) => (
                                <option value={item.id} key={item.id}>{item.title}</option>
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
                        onChange={e => setData({ ...data, desc: e.target.value })}
                        value={data?.desc || ''}
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
                            value={data?.newprice || ''}
                            onChange={e => setData({ ...data, newprice: e.target.value })}
                        />
                        <label htmlFor="add-oldPrice"></label>
                        <input className={s.modal__input}
                            name='oldPrice'
                            id='add-oldPrice'
                            type="number"
                            placeholder='Old price'
                            min="10"
                            required
                            value={data?.oldprice || ''}
                            onChange={e => setData({ ...data, oldprice: e.target.value })}
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
                        value={data?.rating || ''}
                        onChange={e => setData({ ...data, rating: e.target.value })}
                    />
                    <input className={s.modal__btn} type="submit" value='Сохранить' />
                </form>
            </div>
        </>
    )
}