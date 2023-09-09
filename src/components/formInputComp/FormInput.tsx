import * as React from 'react';
import s from './FormInput.module.scss';
import cancel from '../../asets/svg/cancel.svg';
import { useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import InputMask from 'react-input-mask';


interface Props {
    name: 'username' | 'phone' | 'email' | 'oldpass' | 'newpass' | 'confirmpass' | 'password';
    placeholder: string;
    value: string | number | readonly string[] | undefined;
    id: string;
    label: string;
    errorMessage: string;
    maxLength: number | undefined;
    minLength: number | undefined;
    pattern: string | undefined,
    required: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    clearValue: (value: 'username' | 'email' | 'phone' | 'oldpass' | 'newpass' | 'confirmpass' | 'password') => void;
}


const checkClass = (curenValue: string, dataValue: string | number | readonly string[] | undefined) => {
    return curenValue === dataValue || dataValue === '' ? `${s.forminput__input_btn}` : `${s.forminput__input_btn} ${s.active}`
}


declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        action?: string | undefined
    }
}

export const FormInput: React.FC<Props> = (props) => {
    const auth = useCustomSelector(selectAuthData);
    const [focused, setFocused] = React.useState<boolean>(false);
    const { label, onChange, clearValue, errorMessage, id, ...inputProps } = props;


    return (
        <>
            <label className={s.forminput__input_label} htmlFor={label}>{label}</label>
            <div className={s.forminput__input_wrap}>
                {
                    inputProps.name === "phone" ?
                        <InputMask
                            className={s.forminput__input}
                            id={label}
                            {...inputProps}
                            mask="9 (999) 999-99-99"
                            onChange={onChange}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            action={focused.toString()}
                        />
                        :
                        <input
                            className={s.forminput__input}
                            id={label}
                            {...inputProps}
                            onChange={onChange}
                            maxLength={inputProps.maxLength}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            action={focused.toString()}
                        />
                }
                {
                   auth.data?.user &&
                   <input
                       className={checkClass(auth.data?.user[inputProps.name] ?? '', inputProps.value)}
                       type='image'
                       onClick={() => clearValue(inputProps.name)}
                       src={cancel} alt="check"
                   />

                }
                <span className={s.forminput__error}>{errorMessage}</span>
            </div>
        </>
    )
}