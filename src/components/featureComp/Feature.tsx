import * as React from 'react';
import Feature_1 from '../../asets/icons/feature_1.svg';
import Feature_2 from '../../asets/icons/feature_2.svg';
import Feature_3 from '../../asets/icons/feature_3.svg';
import Feature_4 from '../../asets/icons/feature_4.svg';
import s from "./Feature.module.scss";

export const Feature: React.FC = () => {

    return (
        <div className={s.feature}>
            <div className={s.feature__item_wrap}>
                <div className={s.feature__item}>
                    <img className={s.feature__img} src={Feature_1} alt="" />
                    <div className={s.feature__info}>
                        <p className={s.feature__title}>Free Shipping</p>
                        <p className={s.feature__text}>Orders over $100</p>
                    </div>
                </div>
                <div className={s.feature__item}>
                    <img className={s.feature__img} src={Feature_2} alt="" />
                    <div className={s.feature__info}>
                        <p className={s.feature__title}>Smart Gift Card</p>
                        <p className={s.feature__text}>Buy $1000 to get card</p>
                    </div>
                </div>
            </div>
            <div className={s.feature__item_wrap}>
                <div className={s.feature__item}>
                    <img className={s.feature__img} src={Feature_3} alt="" />
                    <div className={s.feature__info}>
                        <p className={s.feature__title}>Quick Payment</p>
                        <p className={s.feature__text}>100% secure payment</p>
                    </div>
                </div>
                <div className={s.feature__item}>
                    <img className={s.feature__img} src={Feature_4} alt="" />
                    <div className={s.feature__info}>
                        <p className={s.feature__title}>24/7 Support</p>
                        <p className={s.feature__text}>Quick support</p>
                    </div>
                </div>
            </div>
        </div>
    )
}