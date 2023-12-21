import React from 'react';
import s from './Header.module.scss';
import DefaultAvatar from '../../asets/icons/user.svg';
import cartIcon from '../../asets/icons/cart.svg';
import logo from '../../asets/icons/logo.svg';
import ring from '../../asets/icons/ring.svg';
import { Search } from '../searchComp/Search';
import { Container } from '../containerComp/Container';
import { Link } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData, selectCartData } from '../../redux/selectos';
import { authSlice } from '../../redux/slices/authSlice';


export const HeaderContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const cart = useCustomSelector(selectCartData);
    const auth = useCustomSelector(selectAuthData);
    const [mobMenu, setMobMenu] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>(``);
    const userAvatar = `https://res.cloudinary.com/dnd2lc6qw/image/upload/f_auto/q_auto/${auth?.data?.user?.avatar}?_a=BAJFJtWI0`;
    const checkAvatar = auth?.data?.user?.avatar ? userAvatar : DefaultAvatar;
    const isActivatedUser = auth.data?.user?.isActivated;

    const userLogout = () => {
        if (window.confirm(`Вы точно хотите выйти?`)) {
            if (auth.data?.provider === 'default') {
                dispatch(authSlice.actions.logout())
                window.localStorage.removeItem('token')
            }
            else {
                window.open("http://localhost:5000/auth/logout", "_self");
            }
        }
    }

    const checkProviderAvatar = () => {
        if (auth.data?.provider === 'default' || auth.data?.provider === undefined) {
            return (
                isActivatedUser ?
                    <Link to='/accaunt'>
                        <img className={s.header__icon} src={checkAvatar} alt="user" />
                    </Link>
                    :
                    <img className={s.header__icon} src={checkAvatar} alt="user" onClick={() => window.alert('Авторизируйтесь или залогиньтесь со стороннего сервиса.')} />
            )
        }
        else {
            return (
                <a href={auth.data?.user.profileUrl}>
                    <img className={s.header__icon} src={checkAvatar} alt="user" />
                </a>
            )
        }
    }

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
                                    {
                                        !!isActivatedUser ?
                                            <Link className={s.header__mobile_link} to={'/'} onClick={() => userLogout()}>
                                                Logout
                                            </Link>
                                            :
                                            <Link className={s.header__mobile_link} to={'/login'}>
                                                Login
                                            </Link>

                                    }
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
                        {
                            isActivatedUser ?
                                <Link to='/accaunt'>
                                    <img className={s.header__icon} src={checkAvatar} alt="user" />
                                </Link>
                                :
                                <img className={s.header__icon} src={checkAvatar} alt="user" onClick={() => window.alert('Авторизируйтесь')} />
                        }
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
                        {
                            !!isActivatedUser ?
                                <Link className={s.header__auth} to={'/'} onClick={() => userLogout()}>
                                    Logout
                                </Link>
                                :
                                <Link className={s.header__auth} to={'/login'}>
                                    Login
                                </Link>

                        }
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
                        {checkProviderAvatar()}
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
