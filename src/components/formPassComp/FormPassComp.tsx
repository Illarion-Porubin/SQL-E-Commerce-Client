import * as React from 'react';

// import s from './Form.module.scss';
// import check from '../../asets/svg/check.svg';
// import cancel from '../../asets/svg/cancel.svg';
// import { useCustomSelector } from '../../hooks/store';
// import { selectAuthData } from '../../redux/selectos';
// import InputMask from 'react-input-mask';

// interface Props {
//     name: 'oldpass' | 'newpass' | 'confirmpass';
//     placeholder: string;
//     value: string | number | readonly string[] | undefined;
//     id: string;
//     label: string;
//     errorMessage: string;
//     maxLength: number | undefined;
//     minLength: number | undefined;
//     pattern: string | undefined,
//     required: boolean;
//     focused: string;
//     onChange: React.ChangeEventHandler<HTMLInputElement>;
//     clearValue: (value: 'oldpass' | 'newpass' | 'confirmpass') => void;
//     handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
// }

// const checkClass = (curenValue: string, dataValue: string | number | readonly string[] | undefined) => {
//     return curenValue !== dataValue ? `${s.forminput__input_btn} ${s.active}` : `${s.forminput__input_btn}`
// }

// export const FormPassComp: React.FC<Props> = (props) => {
//     const auth = useCustomSelector(selectAuthData);
//     const [focused, setFocused] = React.useState<boolean>(false);
//     const { label, onChange, clearValue, handleSubmit, errorMessage, id, ...inputProps } = props;


//     return (
//         <form className={s.forminput} onSubmit={(e) => handleSubmit(e)}>
//             <label className={s.forminput__input_label} htmlFor={label}>{label}</label>
//             <input
//                 className={s.forminput__input}
//                 id={label}
//                 {...inputProps}
//                 onChange={onChange}
//                 maxLength={inputProps.maxLength}
//                 onFocus={() => setFocused(!focused)}
//                 onBlur={() => setFocused(!focused)}
//                 type={focused.toString()}
//             />
//             <span className={s.forminput__error}>{errorMessage}</span>
//             <input
//                 className={checkClass(auth.data?.user[inputProps.name] ?? '', inputProps.value)}
//                 type="image"
//                 src={check} alt="check"
//             />
//             <input
//                 className={checkClass(auth.data?.user[inputProps.name] ?? '', inputProps.value)}
//                 onClick={() => clearValue(inputProps.name)}
//                 type="image"
//                 src={cancel} alt="check"
//             />
//         </form >
//     )
// }





