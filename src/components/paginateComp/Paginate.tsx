import * as React from 'react';
import s from './Paginate.module.scss';
import { Search } from '../searchComp/Search';

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
            <div className={s.paginate__search}>
                <Search key={'Search'} showSelect={false} value={search} setSearch={setSearch}/>
            </div>
            <div className={s.paginate__wrap}>
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