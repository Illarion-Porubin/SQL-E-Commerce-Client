import * as React from 'react';
import s from './Cards.module.scss';
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store';
import { cartSlice } from '../../../redux/slices/cartSlice';
import { ProductCardType, ProductCartType } from '../../../types/types';
import { selectCartData } from '../../../redux/selectos';
import ProductImage from '../../../asets/png/Furniture1.png';
import cross from "../../../asets/svg/cross.svg";
import pencil from "../../../asets/svg/pencil.svg";


interface Props {
    item: ProductCardType
}

export const CardContetn: React.FC<Props> = ({ item }) => {
    const dispatch = useCustomDispatch();


    const deleteProduct = () => {
        console.log(item)
    }

    const changeProduct = () => {
        console.log(item)
    }

    return (
        <>
            <div className={s.card__item}>
                <div className={s.card__item_wrap}>
                    <span className={s.card__news}>{item.label}</span>
                    <img className={s.card__main_img} src={item.img ? item.img : ProductImage} alt="armchair" />

                    <div className={s.card__icons}>

                        <span className={s.card__icon_circle}
                            onClick={() => deleteProduct()}
                        >
                            <img className={s.card__icon} src={cross} alt="cross" />
                        </span>

                        <span className={s.card__icon_circle}
                            onClick={() => changeProduct()}
                        >
                            <img className={s.card__icon} src={pencil} alt="pencil" />
                        </span>

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
}

export const Cards: React.FC<PropsProduct> = ({ products }) => {


    return (
        <div className={s.card}>
            <div className={s.card__content}>
                {
                    products.isLoading === "loaded" && products.data.length
                        ?
                        products.data.map((item: ProductCardType, i: number) => (
                            <CardContetn item={item} key={item.desc + i} />
                        ))
                        :
                        null
                }
            </div>
        </div>
    )
}