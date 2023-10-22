import * as React from 'react';
import ReactDOM from 'react-dom';
import s from './PopupOrder.module.scss';
import InputMask from 'react-input-mask';
import cross from '../asets/svg/cross.svg';

const portal: any = document.getElementById(`portal`);

interface Props {
    setConferm: (valu: boolean) => void;
    setPhone: (value: string) => void;
    order: () => void;
    phone: string,
    conferm: boolean
}

interface InputsType {
    id: string,
    placeholder: string,
    label: string,
    name: 'phone',
    type: string,
    required: boolean,
}

export const PopupOrder: React.FC<Props> = ({ setConferm, phone, setPhone, order, conferm }) => {
    const [active, setActive] = React.useState<boolean>(false);

    const hidePopup = () => {
        setActive(false)
        setTimeout(() => {
            setConferm(false)
        }, 200);
    }

    React.useEffect(() => {
        setActive(conferm)
    }, [])

    const phoneInput: InputsType = {
        id: '1',
        placeholder: 'Phone',
        label: 'Phone',
        name: 'phone',
        type: 'phone',
        required: true,
    }

    const checkPhone = !(/\d+/g).test(String(phone)) || (/[\s _]/gi).test(String(phone));
    return (
        ReactDOM.createPortal(
            <div className={active ? `${s.wrapper} ${s.active}` : s.wrapper}>
                <form className={s.order}>
                    <div className={active ? `${s.order__content} ${s.active}` : s.order__content}>
                        <p className={s.order__title}>Укажите ваш номер телефона</p>
                        <span className={checkPhone ? `${s.order__error} ${s.action}` : s.order__error}>{checkPhone ? 'Введите номер целиком' : null}</span>
                        <img className={s.order__back} onClick={hidePopup} src={cross} alt="x" />
                        <InputMask
                            {...phoneInput}
                            className={s.order__input}
                            mask="9(999)999-99-99"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder='9(999)999-99-99'
                            autoFocus={true}
                            action={(checkPhone).toString()}
                        />
                        <button className={!checkPhone ? `${s.order__btn} ${s.action}` : s.order__btn } onClick={order} disabled={checkPhone}>заказать</button>
                    </div>
                </form>
            </div>
            ,
            portal
        )
    )
}

