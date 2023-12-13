import * as React from 'react';
import s from './Cards.module.scss';
import ProductImage from '../../../asets/png/Furniture1.png';
import { useCustomDispatch } from '../../../hooks/store';
import { ProductCardType } from '../../../types/types';
import { StarRating } from '../../../components/ratingComp/StarRating';
import { fetchDeleteProduct, fetchDeletePhoto } from '../../../redux/slices/productSlice';


interface Props {
    item: ProductCardType,
    setModalActive: (value: boolean) => void,
    setProduct: (value: any) => void,
}

export const CardContetn: React.FC<Props> = ({ item, setModalActive, setProduct }) => {
    const dispatch = useCustomDispatch();
    const deleteProduct = () => {
        dispatch(fetchDeleteProduct({ id: item.id }))
        setTimeout(() => {
            dispatch(fetchDeletePhoto(item.img.slice(-24, -4)))
        }, 300);
    }

    const changeProduct = () => {
        setProduct(item)
        setModalActive(true)
    }

    return (
        <>
            <div className={s.card__item}>
                <div className={s.card__item_wrap}>
                    <span className={s.card__news}>{item.label}</span>
                    <img className={s.card__main_img} src={item.img ? item.img : ProductImage} alt="armchair" onClick={() => changeProduct()} />

                    <div className={s.card__icons}>

                        <button className={s.card__icon_circle}
                            onClick={() => deleteProduct()}
                        >
                            <svg className={s.card__icon} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" fill="white" />
                                <path d="M5 7.5H19L18 21H6L5 7.5Z" stroke="#000000" strokeLinejoin="round" />
                                <path d="M15.5 9.5L15 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 9.5V19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.5 9.5L9 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8" stroke="#000000" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>
                </div>
                <div className={s.card__item_desc}>
                    <p className={s.card__item_title}>{item.type}</p>
                    <p className={s.card__item_text}>{item.desc}</p>
                    <div className={s.card__info_price}>
                        <div className={s.card__price_block}>
                            <p className={s.card__price_new}>$<span>{item.newprice}</span></p>
                            <p className={s.card__price_old}>$<span>{item.oldprice}</span></p>
                        </div>
                        <div>
                            <StarRating starRating={item.Ratings} productId={item.id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface PropsProduct {
    products: {
        data: ProductCardType[];
        error: string | null;
        isLoading: "idle" | "loading" | "loaded" | "error";
    }
    setModalActive: (value: boolean) => void,
    setProduct: (value: any) => void,
}


export const Cards: React.FC<PropsProduct> = ({ products, setModalActive, setProduct }) => {
    return (
        <div className={s.card}>
            <div className={s.card__content}>
                {
                    products.isLoading === "loaded" && products.data.length
                        ?
                        products.data.map((item: ProductCardType, i: number) => (
                            <CardContetn item={item} key={item.desc + i} setModalActive={setModalActive} setProduct={setProduct} />
                        ))
                        :
                        null
                }
            </div>
        </div>
    )
}