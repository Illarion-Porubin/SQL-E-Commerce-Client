import * as React from 'react';
import s from './Paginate.module.scss';

export const Paginate: React.FC = () => {
    const [countPage, setCountPage] = React.useState<number>(1)
    return (
        <div className={s.paginate}>
            <div className={s.paginate__wrap}>
                <button className={s.paginate__btn} onClick={() => setCountPage(prev => prev === 100 ? prev : prev + 1)}>Next page</button>
                <div className={s.paginate__block}>
                    <label className={s.paginate__label} htmlFor="">
                        Page
                        <input className={s.paginate__page_count} type="text" value={countPage} readOnly={true} />
                    </label>
                    <p className={s.paginate__info}>of {100}</p>
                    <button className={s.paginate__prev} onClick={() => setCountPage(prev => prev === 1 ? prev : prev - 1)}>{`<`}</button>
                    <button className={s.paginate__next} onClick={() => setCountPage(prev => prev === 100 ? prev : prev + 1)}>{`>`}</button>
                </div>
            </div>
        </div>
    )
}