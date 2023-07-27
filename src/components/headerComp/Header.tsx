import * as React from 'react';
import s from './header.module.scss';
import user from '../../asets/icons/user.svg';
import cart from '../../asets/icons/cart.svg';
import logo from '../../asets/icons/logo.svg';
import zoom from '../../asets/icons/zoom.svg';
import ring from '../../asets/icons/ring.svg';
import { HeaderSlider } from '../sliders/HeaderSlider';



export const Header: React.FC = () => {
    const [drop, setDrop] = React.useState<boolean>(true)


    return (
        <>
            <div className={s.header}>
                <div className='container'>
                    <div className={s.header__wrap}>
                        <p className={s.header__text}>Welcome to our online shop</p>
                        <div className={s.header__services}>
                            <select className={s.header__lang} id="selectLang">
                                <option value="Eng">English (USD)</option>
                                <option value="Rus">Russian (RUS)</option>
                            </select>
                            <a className={s.header__auth} href="/#">Login or Sign up</a>
                        </div>
                    </div>
                    <div className={s.header__info}>
                        <a className={s.header__logo} href="/#">
                            <img className={s.header__logo_img} src={logo} alt="logo" />
                            <span className={s.header__logo_text}>Furniking</span>
                        </a>
                        <div className={s.header__search_wrap}>
                            <div className={s.header__search}>
                                <input className={s.header__search_input}
                                    type="text"
                                    placeholder='Search here'
                                />
                                <span className={s.header__search_input_wall}></span>
                                <select className={s.header__search_select} id="categories">
                                    <option value="Categories">Categories</option>
                                    <option value="Products">Products</option>
                                    <option value="Any">Any</option>
                                </select>
                            </div>
                            <button className={s.header__search_btn}>
                                <img className={s.header__search_btn_img} src={zoom} alt="" />
                            </button>
                        </div>
                        <div className={s.header__icons}>
                            <img className={s.header__icon} src={cart} alt="cart" />
                            <span className={s.header__icon_cart}>4</span>
                            <img className={s.header__icon} src={ring} alt="ring" />
                            <img className={s.header__icon} src={user} alt="user" />
                        </div>
                    </div>
                </div>
                <div className={s.menu}>
                    <div className='container'>
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
                </div>
                <HeaderSlider />
            </div>
        </>
    )
}