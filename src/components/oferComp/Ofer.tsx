import * as React from 'react';
import s from './Ofer.module.scss';
import ofer from '../../asets/png/ofer.png'

export const OferContetn: React.FC = () => {
    return (
        <div className={s.ofer__item}>
            <img className={s.ofer__img} src={ofer} alt="ofer" />
            <span className={s.ofer__discont}>{40}% off</span>
            <div className={s.ofer__info}>
                <p className={s.ofer__title}>Living Room Furniture</p>
                <p className={s.ofer__text}>You don't have a chair. Are you ready for growth? Shop with us 40% discount!</p>
                <div className={s.ofer__price}>
                    <p className={s.ofer__price_new}><span>$</span>150</p>
                    <p className={s.ofer__price_old}><span>$</span>250</p>
                    <a className={s.ofer__btn_link} href="/#">
                        <button className={s.ofer__btn}>SHOP NOW</button>
                    </a>
                </div>
            </div>
            <div className={s.ofer__time}>
                <div className={s.ofer__circle}>
                    <span className={s.ofer__circle_count}>10</span>
                    <span className={s.ofer__circle_desc}>Days</span>
                </div>
                <div className={s.ofer__circle}>
                    <span className={s.ofer__circle_count}>15</span>
                    <span className={s.ofer__circle_desc}>HRS</span>
                </div>
                <div className={s.ofer__circle}>
                    <span className={s.ofer__circle_count}>30</span>
                    <span className={s.ofer__circle_desc}>MIN</span>
                </div>
                <div className={s.ofer__circle}>
                    <span className={s.ofer__circle_count}>22</span>
                    <span className={s.ofer__circle_desc}>secs</span>
                </div>
            </div>
        </div> 
    )
}


export const Ofer: React.FC = () => {
    return (
        <div className={s.ofer} >
            {
                [...Array(2)].map((_, i) => (
                    <OferContetn key={i} />
                ))
            }
        </div>
    )
}