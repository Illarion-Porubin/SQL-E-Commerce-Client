import * as React from 'react';
import s from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '../../components/containerComp/Container';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData, selectCartData } from '../../redux/selectos';
import { cartSlice, fetchOrder } from '../../redux/slices/cartSlice';
import { ProductCartType } from '../../types/types';
import { PopupOrder } from '../../popup/PopupOrder';

export const CartContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const userProducts = useCustomSelector(selectCartData);
    const auth = useCustomSelector(selectAuthData);
    const [conferm, setConferm] = React.useState<boolean>(false)
    const [phone, setPhone] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [id, setId] = React.useState<string | null>(null);

    React.useEffect(() => {   
        if(auth.data?.user) {         
            setPhone(auth.data?.user.phone)
            setEmail(auth.data?.user.email)
            setId(auth.data?.user.id)
        } 
    }, [auth.data?.user])

    const addProduct = (product: ProductCartType, id: string) => {
        dispatch(cartSlice.actions.addOrder({ ...product, id }))
    }

    const deleteProduct = (product: ProductCartType) => {
        dispatch(cartSlice.actions.deleteOrder(product))
    }

    const countProducts = userProducts.data.reduce((sum: number, product: ProductCartType) => {
        return sum + product.count;
    }, 0)

    const totalAmount = userProducts.data.reduce((sum: number, product: ProductCartType) => {
        return sum + (product.count * Number(product.newprice));
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
            userId: id || '',
            email: email || '',
            phone: phone || '',
            userCart: message,
            amount: countProducts,
            totalsum: totalAmount
        }


        if (userProducts.data.length) {
            dispatch(fetchOrder(userOrder));
            setTimeout(() => {
                setConferm(false)
            }, 200);
            dispatch(cartSlice.actions.deleteUserOrders(null))
            alert('Заказ оформлен')
        } else {
            setTimeout(() => {
                setConferm(false)
            }, 200);
            alert("Корзина пуста, вернитесь к покупкам")
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
                            userProducts.data.map((product: ProductCartType, index: number) => (
                                <div className={s.cart__item} key={index}>
                                    <img className={s.cart__item_img} src={product.img} alt="" />
                                    <div className={s.cart__item_info}>
                                        <p className={s.cart__item_cat}>{product.type}</p>
                                        <p className={s.cart__item_desc}>{product.desc}</p>
                                    </div>
                                    <p className={s.cart__item_price}><span>$</span>{Number(product.newprice) * product.count}</p>
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
            </div>
            {
                    conferm ?
                        <PopupOrder
                            setConferm={setConferm}
                            phone={phone ? phone : ''}
                            setPhone={setPhone}
                            order={order}
                            conferm={conferm}
                        />
                        :
                        null
                }
        </>
    )
}

export const Cart: React.FC = () => {
    return <Container children={[<CartContent key={`CartContent`} />]} />
}