import * as React from 'react';
import s from './Cards.module.scss';
import { useCustomDispatch } from '../../../hooks/store';
import { ProductCardType } from '../../../types/types';
import ProductImage from '../../../asets/png/Furniture1.png';
import cross from "../../../asets/svg/cross.svg";
import pencil from "../../../asets/svg/pencil.svg";
import { fetchDeleteProduct, fetchFindProductByID } from '../../../redux/slices/productSlice';


interface Props {
    item: ProductCardType,
    setModalActive: (value: boolean) => void,
    setId: (value: number | undefined) => void,
}

export const CardContetn: React.FC<Props> = ({ item, setModalActive, setId }) => {
    const dispatch = useCustomDispatch();


    const deleteProduct = () => {
        dispatch(fetchDeleteProduct({ id: item.id }))
    }

    const changeProduct = () => {
        setId(item.id)
        setModalActive(true)
    }


    return (
        <>
            <div className={s.card__item}>
                <div className={s.card__item_wrap}>
                    <span className={s.card__news}>{item.label}</span>
                    <img className={s.card__main_img} src={item.img ? item.img : ProductImage} alt="armchair" onClick={() => changeProduct()}/>

                    <div className={s.card__icons}>

                        <button className={s.card__icon_circle}
                            onClick={() => deleteProduct()}
                        >
                            <img className={s.card__icon} src={cross} alt="cross" />
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
    setId: (value: number | undefined) => void,
}


export const Cards: React.FC<PropsProduct> = ({ products, setModalActive, setId }) => {
    return (
        <div className={s.card}>
            <div className={s.card__content}>
                {
                    products.isLoading === "loaded" && products.data.length
                        ?
                        products.data.map((item: ProductCardType, i: number) => (
                            <CardContetn item={item} key={item.desc + i} setModalActive={setModalActive} setId={setId}/>
                        ))
                        :
                        null
                }
            </div>
        </div>
    )
}