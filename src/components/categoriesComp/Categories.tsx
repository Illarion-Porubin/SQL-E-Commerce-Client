import * as React from 'react';
import s from './Categories.module.scss';

interface Props {
    categorieList: {
        label: string,
        title: string,
    }[],
    setLabel: React.Dispatch<React.SetStateAction<string>>
    label: string,
}

export const Categories: React.FC<Props> = ({ categorieList, setLabel, label }) => {
    const sortByLabel = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, label: string) => {
        e.preventDefault()
        setLabel(label)
    }

 
    return (
        < nav className={s.categories}>
            <ul className={s.categories__list}>
                {categorieList.map((item) => (
                    <li className={s.categories__li} key={item.title}>
                        <a className={label === item.label? `${s.categories__link} ${s.active}` : `${s.categories__link}`} href="/#"
                            onClick={(e) => sortByLabel(e, item.label)}
                        >
                            {item.title}
                        </a>
                    </li>
                ))
                }
            </ul>
        </nav >
    )
}