import * as React from 'react';
import s from "./Trending.module.scss";


interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>,
    checkPage: boolean
}

export const TrendingPaginate: React.FC<Props> = ({ setPage, checkPage }) => {

    return (
        <div className={s.trending}>
            <button className={`${s.trending__prev} ${s.trending__btn}`} onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)}>prev</button>
            <button className={`${s.trending__next} ${s.trending__btn}`} onClick={() => setPage(prev => checkPage ? prev : prev + 1)}>next</button>
        </div>
    )
}