import React from 'react';
import s from './Header.module.scss';
import user from '../../asets/icons/user.svg';
import cartIcon from '../../asets/icons/cart.svg';
import logo from '../../asets/icons/logo.svg';
import ring from '../../asets/icons/ring.svg';
import { Search } from '../searchComp/Search';
import { Container } from '../containerComp/Container';
import { Link } from 'react-router-dom';
import { useCustomSelector } from '../../hooks/store';
import { selectCartData } from '../../redux/selectos';


export const HeaderContent: React.FC = () => {
    const cart = useCustomSelector(selectCartData);
    const [mobMenu, setMobMenu] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>(``)

    return (
        <>
            <div className={s.header__mobile}>
                <div className={s.header__mobile_title}>
                    <p className={s.header__text}>Welcome to our online shop</p>
                    <button className={mobMenu ? `${s.header__mobile_btn} ${s.active}` : s.header__mobile_btn} onClick={() => setMobMenu(!mobMenu)}></button>
                </div>
                <div className={mobMenu ? `${s.header__mobile_menu} ${s.active}` : s.header__mobile_menu}>
                    <div className={s.header__mobile_logo_wrap}>
                        <a className={`${s.header__logo} ${s.header__mobile_logo}`} href="/#">
                            <img className={s.header__logo_img} src={logo} alt="logo" />
                            <span className={s.header__logo_text}>Furniking</span>
                        </a>
                    </div>
                    <div className={s.header__mobile_navigate}>
                        <nav>
                            <ul>
                                <li className={s.header__mobile_li}>
                                    <a className={s.header__mobile_link} href="/#">HOME</a>
                                </li>
                                <li className={s.header__mobile_li}>
                                    <a className={s.header__mobile_link} href="/#">SHOP</a>
                                </li>
                                <li className={s.header__mobile_li}>
                                    <a className={s.header__mobile_link} href="/#">BLOG</a>
                                </li>
                                <li className={s.header__mobile_li}>
                                    <a className={s.header__mobile_link} href="/#">ABOUT</a>
                                </li>
                                <li className={s.header__mobile_li}>
                                    <a className={s.header__mobile_link} href="/#">CONTACT US</a>
                                </li>
                                <li className={s.header__mobile_li}>
                                    <a className={s.header__mobile_link} href="/#">ALL COLLECTIONS</a>
                                </li>
                                <li className={`${s.header__mobile_li} ${s.header__mobile_auth}`} >
                                    <a className={s.header__mobile_link} href="/#">Login or Sign up</a>
                                </li>
                                <li className={s.header__mobile_li}>
                                    <select className={`${s.header__lang} ${s.header__lang_mobile}`} id="selectLang">
                                        <option value="Eng">English (USD)</option>
                                        <option value="Rus">Russian (RUS)</option>
                                    </select>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={`${s.header__icons} ${s.header__icons_mobile}`}>
                        <Link to='/cart'>
                            <img className={s.header__icon} src={cartIcon} alt="cart" />
                            <span className={s.header__icon_cart}>{!cart.data ? 0 : cart.data.length}</span>
                        </Link>
                        <Link to='/'>
                            <img className={s.header__icon} src={ring} alt="ring" />
                        </Link>
                        <Link to='/'>
                            <img className={s.header__icon} src={user} alt="user" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className={s.header__desc}>
                <div className={s.header__wrap}>
                    <p className={s.header__text}>Welcome to our online shop</p>
                    <div className={s.header__services}>
                        <select className={s.header__lang} id="selectLang">
                            <option value="Eng">English (USD)</option>
                            <option value="Rus">Russian (RUS)</option>
                        </select>
                        <Link className={s.header__auth} to={'/login'}>
                            Login or Sign up
                        </Link>
                    </div>
                </div>
                <div className={s.header__info}>
                    <a className={s.header__logo} href="/#">
                        <img className={s.header__logo_img} src={logo} alt="logo" />
                        <span className={s.header__logo_text}>Furniking</span>
                    </a>
                    <div className={s.header__search}>
                        <Search key={'Search'} showSelect={true} value={search} setSearch={setSearch} />
                    </div>
                    <div className={s.header__icons}>
                        <Link to='/cart'>
                            <img className={s.header__icon} src={cartIcon} alt="cart" />
                            <span className={s.header__icon_cart}>{!cart.data ? 0 : cart.data.length}</span>
                        </Link>
                        <Link to='/'>
                            <img className={s.header__icon} src={ring} alt="ring" />
                        </Link>
                        <Link to='/'>
                            <img className={s.header__icon} src={user} alt="user" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export const Header: React.FC = () => {
    return (
        <div className={s.header}>
            <Container children={[<HeaderContent key={'HeaderContent'} />]} />
        </div>
    )
}
