import React from 'react';
import s from './Header.module.scss';
import user from '../../asets/icons/user.svg';
import cart from '../../asets/icons/cart.svg';
import logo from '../../asets/icons/logo.svg';
import ring from '../../asets/icons/ring.svg';
import { Search } from '../searchComp/Search';
import { Container } from '../containerComp/Container';
import { Link } from 'react-router-dom';


export const HeaderContent: React.FC = () => {
    return (
        <>
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
                    <Search key={'Search'} />
                </div>
                <div className={s.header__icons}>
                    <Link to='/cart'>
                        <img className={s.header__icon} src={cart} alt="cart" />
                        <span className={s.header__icon_cart}>4</span>
                    </Link>
                    <Link to='/'>
                        <img className={s.header__icon} src={ring} alt="ring" />
                    </Link>
                    <Link to='/'>
                        <img className={s.header__icon} src={user} alt="user" />
                    </Link>
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
