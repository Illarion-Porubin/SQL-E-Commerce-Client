import * as React from 'react';
import ReactDOM from 'react-dom';
import s from './PopupOrder.module.scss';
import InputMask from 'react-input-mask';

const portal: any = document.getElementById(`portal`);

interface Props {
    setConferm: (valu: boolean) => void;
    setPhone: (value: string) => void;
    order: () => void;
    phone: string,
}

export const PopupOrder: React.FC<Props> = ({setConferm, phone, setPhone, order}) => {


    return (
        ReactDOM.createPortal(
            <div className={s.order}>
                    <div className={s.order__content}>
                        <p className={s.order__title}>Укажите ваш номер телефона</p>
                        <p className={s.order__back} onClick={() => setConferm(false)}>x</p>
                        <InputMask
                            className={s.order__input}
                            mask="9 (999) 999-99-99"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder='9 (999) 999-99-99'
                            autoFocus={true}
                            />
                        {/* <input className={s.order__input}
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            type="text"
                        /> */}
                        <button className={s.order__btn} onClick={order}>заказать</button>
                    </div>
                </div>
            , 
            portal
        )
    )
}

