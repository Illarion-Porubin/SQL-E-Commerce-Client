import * as React from 'react';
import s from './Paginate.module.scss';

interface Props {
    page: number,
    search: string,
    checkPage: boolean,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Paginate: React.FC<Props> = ({ search, page, setSearch, setPage, checkPage }) => {

    return (
        <div className={s.paginate}>
            <input type="text" placeholder='найти' onChange={(e) => setSearch(e.target?.value)} value={search} />
            <div className={s.paginate__wrap}>
                <button className={s.paginate__btn} onClick={() => setPage(prev => checkPage ? prev : prev + 1)}>Next page</button>
                <div className={s.paginate__block}>
                    <label className={s.paginate__label} htmlFor="">
                        <input className={s.paginate__page_count} type="text" value={page} readOnly={true} />
                    </label>
                    <p className={s.paginate__info}>of {100}</p>
                    <button className={s.paginate__prev} onClick={() => setPage(prev => prev === 1 ? prev : prev - 1)}>{`<`}</button>
                    <button className={s.paginate__next} onClick={() => setPage(prev => checkPage ? prev : prev + 1)}>{`>`}</button>
                </div>
            </div>
        </div>
    )
}