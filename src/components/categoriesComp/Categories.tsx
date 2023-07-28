import * as React from 'react';
import s from './Categories.module.scss';

interface Props {
    categorieList: string[],
}

export const Categories: React.FC<Props> = ({ categorieList }) => {
    return (
        < nav className={s.categories}>
            <ul className={s.categories__list}>
                {categorieList.map((item) => (
                    <li className={s.categories__li} key={item}>
                        <a className={s.categories__link} href="/#">{item}</a>
                    </li>
                ))
                }
            </ul>
        </nav >
    )
}