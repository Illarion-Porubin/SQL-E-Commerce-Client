import * as React from 'react';
import s from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '../../components/containerComp/Container';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectCartData } from '../../redux/selectos';
import { cartSlice, fetchOrder } from '../../redux/slices/cartSlice';
import { ProductType } from '../../types/types';

export const CartContent: React.FC = () => {
    const [conferm, setConferm] = React.useState<boolean>(false)
    const [phone, setPhone] = React.useState<string>('')

    const dispatch = useCustomDispatch();
    const userProducts = useCustomSelector(selectCartData);

    const addProduct = (product: ProductType, id: string) => {
        dispatch(cartSlice.actions.addOrder({ ...product, id }))
    }

    const deleteProduct = (product: ProductType) => {
        dispatch(cartSlice.actions.deleteOrder(product))
    }

    const countProducts = userProducts.data.reduce((sum: number, product: ProductType) => {
        return sum + product.count;
    }, 0)

    const totalAmount = userProducts.data.reduce((sum: number, product: ProductType) => {
        return sum + (product.count * product.newprice);
    }, 0)


    const order = () => {
        const emailBody = userProducts.data.map((item) => {
            return (
                `
                <div>
                    <p>ID товара: ${item.productId}</p>
                    <p>Цена товара: $${item.newprice}</p>
                    <p>Количество товара: ${item.count}</p>
                </div>
                `
            )
        })

        const message = `<div>${emailBody}</div>`

        const userOrder = {
            userId: "",
            email: "",
            phone: "8989778777",
            userCart: message,
            amount: countProducts,
            totalsum: totalAmount
        }

        if (userProducts.isLoading === "loaded" && userProducts.data.length) {
            dispatch(fetchOrder(userOrder));
            alert('Заказ офрмлен')
        } else {
            alert("Произошла ошибка или корзина пуста")
        }
    }

    return (
        <>
            <div className={s.cart}>
                <div className={s.cart__info}>
                    <h1 className={s.cart__title}>Cart</h1>
                    <Link className={s.cart__main} to='/'>На главную</Link>
                </div>
                <div className={s.cart__list}>
                    {
                        userProducts ?
                            userProducts.data.map((product: ProductType, index: number) => (
                                <div className={s.cart__item} key={index}>
                                    <img className={s.cart__item_img} src={product.img} alt="" />
                                    <div className={s.cart__item_info}>
                                        <p className={s.cart__item_cat}>{product.type}</p>
                                        <p className={s.cart__item_desc}>{product.desc}</p>
                                    </div>
                                    <p className={s.cart__item_price}><span>$</span>{product.newprice * product.count}</p>
                                    <div className={s.cart__item_btn}>
                                        <button className={s.cart__item_less} id="minus" onClick={(e) => addProduct(product, (e.target as Element).id)}>-</button>
                                        <span className={s.cart__item_count}>{product.count}</span>
                                        <button className={s.cart__item_add} id="plus" onClick={(e) => addProduct(product, (e.target as Element).id)}>+</button>
                                    </div>
                                    <button className={s.cart__item_delete} onClick={() => deleteProduct(product)}>X</button>
                                </div>
                            ))
                            :
                            null
                    }
                </div>
                <div className={s.cart__action}>
                    <button className={s.cart__btn_oder} onClick={() => setConferm(true)}>оформить заказ</button>
                    <div className={s.cart__total_amount}>общая стоитмость <span className={s.cart__sum}>{totalAmount}</span>$</div>
                    <div className={s.cart__count_info}>количество товара <span className={s.cart__count}>{countProducts}</span></div>
                </div>
                {
                    conferm ?
                        <div className={s.cart__order_wrap}>
                            <div className={s.cart__order}>
                                <p className={s.cart__order_title}>Укажите ваш номер телефона</p>
                                <p className={s.cart__order_back} onClick={() => setConferm(false)}>x</p>
                                <input className={s.cart__order_input}
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    type="text"
                                />
                                <button className={s.cart__order_btn} onClick={order}>заказать</button>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </>
    )
}

export const Cart: React.FC = () => {
    return <Container children={[<CartContent key={`CartContent`} />]} />
}