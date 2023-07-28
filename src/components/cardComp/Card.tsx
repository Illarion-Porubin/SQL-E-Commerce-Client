import * as React from 'react';
import s from './Card.module.scss';

export const Card: React.FC = () => {
    return (
        <div className={s.card}>
            <span className={s.card__news}></span>
            <img className={s.card__main_img} src="" alt="" />
            <div className={s.card__icons}>
                <img className={s.card__icon} src="" alt="" />
                <img className={s.card__icon} src="" alt="" />
                <img className={s.card__icon} src="" alt="" />
                <img className={s.card__icon} src="" alt="" />
            </div>
        </div>
    )
}