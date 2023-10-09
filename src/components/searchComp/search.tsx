import * as React from 'react';
import zoom from '../../asets/icons/zoom.svg';
import s from './Search.module.scss';


interface Props {
    showSelect: boolean,
    value: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const Search: React.FC<Props> = ({ showSelect, value, setSearch }) => {
    return (
        <>
            <div className={s.search}>
                <div className={s.search__wrap}>
                    <input className={s.search__input}
                        type="text" 
                        placeholder={showSelect ? `Just visually searching` : `Looking for something?`}
                        value={value}
                        onChange={(e) => setSearch(e.target?.value)}
                    />
                    <span className={s.search__input__wall}></span>
                    {
                        showSelect ?
                            <select className={s.search__select} id="categories">
                                <option value="Categories">Categories</option>
                                <option value="Products">Products</option>
                                <option value="Any">Any</option>
                            </select>
                            :
                            null
                    }
                </div>
                <div className={s.search__btn}>
                    <img className={s.search__btn__img} src={zoom} alt="" />
                </div>
            </div>
        </>
    )
}