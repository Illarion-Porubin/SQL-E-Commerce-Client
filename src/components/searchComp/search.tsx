import * as React from 'react';
import zoom from '../../asets/icons/zoom.svg';
import s from './Search.module.scss';


export const Search = () => {
    return (
        <>
            <div className={s.search}>
                <div className={s.search__wrap}>
                    <input className={s.search__input}
                        type="text"
                        placeholder='Search here'
                    />
                    <span className={s.search__input__wall}></span>
                    <select className={s.search__select} id="categories">
                        <option value="Categories">Categories</option>
                        <option value="Products">Products</option>
                        <option value="Any">Any</option>
                    </select>
                </div>
                <button className={s.search__btn}>
                    <img className={s.search__btn__img} src={zoom} alt="" />
                </button>
            </div>
        </>
    )
}