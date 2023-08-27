import * as React from 'react';
import s from './FormInput.module.scss';
import check from '../../asets/svg/check.svg';
import cancel from '../../asets/svg/cancel.svg';
import { useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import InputMask from 'react-input-mask';

interface Props {
    name: 'username' | 'phone' | 'email';
    placeholder: string;
    value: string | number | readonly string[] | undefined;
    id: string;
    label: string;
    errorMessage: string;
    maxLength: number | undefined;
    minLength: number | undefined;
    pattern: string | undefined,
    required: boolean;
    focused: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    clearValue: (value: 'username' | 'email' | 'phone') => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const checkClass = (curenValue: string, dataValue: string | number | readonly string[] | undefined) => {
    return curenValue !== dataValue ? `${s.forminput__input_btn} ${s.active}` : `${s.forminput__input_btn}`
}

export const FormInput: React.FC<Props> = (props) => {
    const auth = useCustomSelector(selectAuthData);
    const [focused, setFocused] = React.useState<boolean>(false);
    const { label, onChange, clearValue, handleSubmit, id, ...inputProps } = props;


    return (
        <form className={s.forminput} onSubmit={(e) => handleSubmit(e)}>
            <label className={s.forminput__input_label} htmlFor={label}>{label}</label>
            {
                inputProps.name === "phone" ?
                    <InputMask
                        className={s.forminput__input}
                        id={label}
                        {...inputProps}
                        mask="9 (999) 999-99-99"
                        onChange={onChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(!focused)}
                        type={focused.toString()}
                    />
                    :
                    <input
                        className={s.forminput__input}
                        id={label}
                        {...inputProps}
                        onChange={onChange}
                        maxLength={inputProps.maxLength}
                        onFocus={() => setFocused(!focused)}
                        onBlur={() => setFocused(!focused)}
                        type={focused.toString()}
                    />
            }
            <span className={s.forminput__error}>{inputProps.errorMessage}</span>
            <input
                className={checkClass(auth.data?.user[inputProps.name] ?? '', inputProps.value)}
                type="image"
                src={check} alt="check"
            />
            <input
                className={checkClass(auth.data?.user[inputProps.name] ?? '', inputProps.value)}
                onClick={() => clearValue(inputProps.name)}
                type="image"
                src={cancel} alt="check"
            />
        </form >
    )
}












// import * as React from 'react';
// import s from './FormInput.module.scss';

// interface Props {
//     name: string;
//     placeholder: string;
//     value: string | number | readonly string[] | undefined;
//     id: string;
//     label: string;
//     onChange: React.ChangeEventHandler<HTMLInputElement>;
// }



// export const FormInput: React.FC<Props> = (props) => {
//     const { label, onChange, id, ...unputProps } = props;
//     return (
//         <div className={s.forminput}>
//             <label htmlFor="">{label}</label>
//             <input {...unputProps} onChange={onChange}/>
//         </div>
//     )
// }