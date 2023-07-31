import * as React from 'react';
import s from './Cart.module.scss';
import product from '../../asets/png/Furniture1.png';
import { Link } from 'react-router-dom';
import { Container } from '../../components/containerComp/Container';

export const CartContent: React.FC = () => {
    const [productCount, setProductCount] = React.useState<number>(0)

    return (
        <>
            <h1>Cart</h1>
            <div className={s.cart}>
                <div className={s.cart__info}>
                    <Link to='/'>На главную</Link>
                    <button>приступить к оформлению</button>
                    <span className={s.cart_count}>количество товара {0}</span>
                </div>
                <div className={s.cart__list}>
                    <div className={s.cart__item}>
                        <img className={s.cart__item_img} src={product} alt="" />
                        <div className={s.cart__item_info}>
                            <p className={s.cart__item_cat}>Chair</p>
                            <p className={s.cart__item_desc}>Minimal LCD chair</p>
                        </div>
                        <p className={s.cart__item_price}><span>$</span>180</p>
                        <div className={s.cart__item_btn}>
                            <button className={s.cart__item_add} onClick={() => setProductCount((prev) => prev = prev +1)}>+</button>
                            <span className={s.cart__item_count}>{productCount}</span>
                            <button className={s.cart__item_less} onClick={() => setProductCount((prev) => prev ? prev = prev -1 : 0)}>-</button>
                        </div>
                        <button className={s.cart__item_delete}>X</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Cart: React.FC = () => {
    return (
        <>
            <Container children={[<CartContent key={`CartContent`} />]} />
        </>
    )
}