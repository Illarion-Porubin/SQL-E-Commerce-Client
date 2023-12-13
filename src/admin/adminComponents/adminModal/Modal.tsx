import * as React from 'react';
import s from './Modal.module.scss';
import { UploadWidget } from '../../../components/upLoad/upLoadWidget';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectCategoriesData, selectProductData } from '../../../redux/selectos';
import { Category, ProductForm, ProductType } from '../../../types/types';
import { fetchAddProduct, fetchGetProducts, fetchUpdateProduct } from '../../../redux/slices/productSlice';


interface Props {
    setModalActive: (value: boolean) => void,
    modalActive: boolean,
    product: any,
    setProduct: (value: any) => void,
}
export const Modal: React.FC<Props> = ({ modalActive, setModalActive, product, setProduct }) => {
    const dispatch = useCustomDispatch()
    const [url, setUrl] = React.useState('');
    const categorys = useCustomSelector(selectCategoriesData);
    const labls = ['Top', 'New', 'Hot', 'Hit', 'Best', 'Today'];


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(formData.entries())
        if (product.id) {
            const formProduct: ProductForm = {
                id: product.id,
                desc: value.desc,
                label: value.label,
                img: product.img,
                newprice: value.newPrice,
                oldprice: value.oldPrice,
                rating: value.rating,
                CategoryId: value.category,
            }
            console.log(formProduct)
            dispatch(fetchUpdateProduct(formProduct))
            dispatch(fetchGetProducts)
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
            dispatch(fetchAddProduct(newProduct))
        }
    }

    const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setUrl('')
        setTimeout(() => {
            setProduct(undefined)
        }, 300)
        setModalActive(false)
    }

    return (
        <>
            <div className={modalActive ? `${s.modal} ${s.active}` : s.modal} onClick={(e) => close(e)}>
                <form className={modalActive ? `${s.modal__content} ${s.active}` : s.modal__content}
                    onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleSubmit(e)}
                >
                    <div className={s.modal__drop_label_list}>
                        <label htmlFor="add-label"></label>
                        <select name="label" id="add-label" required>{ }
                            <option value={product?.label || ''}>{product?.label || 'Выберите маркировку'}</option>
                            {labls.map((item: string) => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <UploadWidget url={url || product?.img} setUrl={setUrl} admin={true} />
                    <div className={s.modal__drop_category_list}>
                        <label htmlFor="add-category"></label>
                        <select name="category" id="add-category" required>
                            <option value={product?.CategoryId || ''}>{categorys?.data[product?.CategoryId - 1]?.title || 'Выберите категорию'}</option>
                            {categorys.data.map((item: Category) => (
                                <option value={String(item.id)} key={item.id}>{item.title}</option>
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
                        onChange={e => setProduct({ ...product, desc: e.target.value })}
                        value={product?.desc || ''}
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
                            value={product?.newprice || ''}
                            onChange={e => setProduct({ ...product, newprice: e.target.value })}
                        />
                        <label htmlFor="add-oldPrice"></label>
                        <input className={s.modal__input}
                            name='oldPrice'
                            id='add-oldPrice'
                            type="number"
                            placeholder='Old price'
                            min="10"
                            required
                            value={product?.oldprice || ''}
                            onChange={e => setProduct({ ...product, oldprice: e.target.value })}
                        />
                    </div>
                    {/* <label htmlFor="add-rating"></label>
                    <input className={s.modal__input}
                        name='rating'
                        id='add-rating'
                        type="number"
                        placeholder='Rating'
                        min="1" max="5000"
                        required
                        value={product?.rating || ''}
                        onChange={e => setProduct({ ...product, rating: e.target.value })}
                    /> */}
                    <input className={s.modal__btn} type="submit" value='Сохранить' />
                </form>
            </div>
        </>
    )
}