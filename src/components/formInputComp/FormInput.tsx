import * as React from 'react';
import s from './FormInput.module.scss';
import check from '../../asets/svg/check.svg';
import cancel from '../../asets/svg/cancel.svg';
import { useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';

interface Props {
    name: 'username' | 'phone' | 'email';
    placeholder: string;
    value: string | number | readonly string[] | undefined;
    id: string;
    label: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    clearValue: (value: 'username' | 'email' | 'phone') => void;
    handleSubmit: any
}

const checkClass = (curenValue: string, dataValue: string | number | readonly string[] | undefined) => {
    return curenValue !== dataValue ? `${s.forminput__input} ${s.active}` : `${s.forminput__input}`
}

export const FormInput: React.FC<Props> = (props) => {
    const auth = useCustomSelector(selectAuthData);
    const { label, onChange, clearValue, handleSubmit, id, ...inputProps } = props;

    const inputLength = {
        'username': 12,
        'email': undefined,
        'phone': 18,
    }

    return (
        <form className={s.forminput} onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <label htmlFor={label}>{label}</label>
            <input id={label} {...inputProps} onChange={onChange} maxLength={inputLength[inputProps.name]} />
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