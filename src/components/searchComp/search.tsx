import * as React from 'react';
import s from './search.module.scss';


export const Search = () => {
    return (
        <>
            <div className={s.search}>
                <input className={s.search_input} type="text" placeholder='Search' />
            </div>
        </>
    )
}