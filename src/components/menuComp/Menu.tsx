import * as React from 'react';
import s from './Menu.module.scss';

export const Menu: React.FC = () => {
    const [drop, setDrop] = React.useState<boolean>(true)

    return (
        <div className={s.menu}>
                <div className={s.menu__wrap}>
                    <nav className={s.menu__dropdown}>
                        <button className={s.menu__dropdown_btn} onClick={() => setDrop(!drop)}>ALL COLLECTIONS</button>
                        <ul className={s.menu__dropdown_list}>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    All
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    New Arrivals
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    Hot Sale
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    Furniture
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    All
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    New Arrivals
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    Hot Sale
                                </a>
                            </li>
                            <li className={drop ? `${s.menu__dropdown_li} ${s.active}` : s.menu__dropdown_li}>
                                <a className={s.menu__dropdown_link} href="/#">
                                    Furniture
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <ul className={s.menu__list}>
                        <a href="/#">
                            <li className={s.menu__list_li}>HOME</li>
                        </a>
                        <a href="/#">
                            <li className={s.menu__list_li}>SHOP</li>
                        </a>
                        <a href="/#">
                            <li className={s.menu__list_li}>BLOG</li>
                        </a>
                        <a href="/#">
                            <li className={s.menu__list_li}>ABOUT</li>
                        </a>
                        <a href="/#">
                            <li className={s.menu__list_li}>CONTACT US</li>
                        </a>
                    </ul>
                </div>
        </div>
    )
}