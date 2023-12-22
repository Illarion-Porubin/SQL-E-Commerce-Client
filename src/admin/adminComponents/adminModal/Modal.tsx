import * as React from 'react';
import s from './Modal.module.scss';
import { UploadWidget } from '../../../components/upLoad/upLoadWidget';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { selectCategoriesData, selectProductData } from '../../../redux/selectos';
import { Category, ProductCardType, ProductForm, ProductType } from '../../../types/types';
import { fetchAddProduct, fetchGetProducts, fetchUpdateProduct, addNewProduct, deleteProduct } from '../../../redux/slices/productSlice';


interface Props {
    setModalActive: (value: boolean) => void,
    modalActive: boolean,
}
export const Modal: React.FC<Props> = ({ modalActive, setModalActive }) => {
    const dispatch = useCustomDispatch()
    const [url, setUrl] = React.useState('');
    const productData = useCustomSelector(selectProductData);
    const categorys = useCustomSelector(selectCategoriesData);
    const labls = ['Top', 'New', 'Hot', 'Hit', 'Best', 'Today'];
    const [product, setProduct] = React.useState<null | undefined | ProductType>();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(formData.entries())
        if (product?.id) {
            const formProduct: ProductForm = {
                id: product?.id,
                desc: value.desc,
                label: value.label,
                img: url || (product?.img || ""),
                newprice: value.newPrice,
                oldprice: value.oldPrice,
                rating: value.rating,
                CategoryId: value.category,
            }     
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
            dispatch(fetchAddProduct(newProduct))
        }
    }

    const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setTimeout(() => {
            setProduct(undefined)
        }, 300)
        setModalActive(false)
    }

    if(modalActive && product === undefined){
        setProduct(productData.product)
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
                    <UploadWidget url={url || product?.img} setUrl={setUrl} admin={true}/>
                    <div className={s.modal__drop_category_list}>
                        <label htmlFor="add-category"></label>
                        <select name="category" id="add-category" required>
                            <option value={product?.CategoryId || ''}>{categorys?.data[product?.CategoryId ? product?.CategoryId - 1 : 0]?.title || 'Выберите категорию'}</option>
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
                    <input className={s.modal__btn} type="submit" value='Сохранить' />
                </form>
            </div>
        </>
    )
}