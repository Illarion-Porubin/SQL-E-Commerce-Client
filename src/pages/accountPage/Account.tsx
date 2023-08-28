import * as React from 'react';
import s from './Account.module.scss';
import { Container } from '../../components/containerComp/Container';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { Link } from 'react-router-dom';
import { fetchUpdateInfo } from '../../redux/slices/authSlice';
import { selectAuthData } from '../../redux/selectos';
import { FormInput } from '../../components/formInputComp/FormInput';


interface InputsType {
    id: string,
    placeholder: string,
    label: string,
    name: 'oldpass' | 'newpass' | 'confirmpass' | 'username' | 'email' | 'phone',
    errorMessage: string,
    maxLength: number | undefined,
    minLength: number | undefined,
    type: string,
    pattern: string | undefined,
    required: boolean,
}



export const AccauntComponent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [inputValue, setInputValue] = React.useState({
        username: '',
        email: '',
        phone: '',
        oldpass: '',
        newpass: '',
        confirmpass: ''
    }
    );
    const [changeForm, setChangeForm] = React.useState<boolean>(true);
    const auth = useCustomSelector(selectAuthData);

    React.useEffect(() => {
        if (auth.isLoading === "loaded" && auth.data) {
            setInputValue({
                // id: auth.data.user.id,
                username: auth.data.user.username,
                email: auth.data.user.email,
                phone: auth.data.user.phone,
                oldpass: '',
                newpass: '',
                confirmpass: '',
            })
        }
    }, [auth.data, auth.isLoading])

    const inputs: InputsType[] = [
        {
            id: `1`,
            placeholder: 'Name',
            label: 'Username',
            name: 'username',
            errorMessage: 'Только кириллица от 2 до 16 символов, без специальных символов и чисел!',
            maxLength: 12,
            minLength: 2,
            type: 'text',
            pattern: '^[А-Яа-я]{2,12}',
            required: true,
        },
        {
            id: `2`,
            placeholder: 'Email',
            label: 'Email',
            name: 'email',
            errorMessage: 'Введите правильный почтовый адрес!',
            maxLength: undefined,
            minLength: undefined,
            type: 'email',
            pattern: '([^ ]+@[^ ]+\.[a-z0-9]{2,6}|)$',
            required: true,
        },
        {
            id: `3`,
            placeholder: '8 (989) 999-99-99',
            label: 'Phone',
            name: 'phone',
            errorMessage: 'Длинна телефона должна быть 11 цифр и не должна содержать прочерков!',
            maxLength: undefined,
            minLength: 11,
            type: 'text',
            pattern: '[0-9() -]+',
            required: true,
        },
    ]
    
    const inputsPass: InputsType[] = [
        {
            id: `1`,
            placeholder: 'Old Password',
            label: 'Old Password',
            name: 'oldpass',
            errorMessage: 'Пароль должен быть от 8 до 20 символов и содержать хотя бы 1 букву, 1 цифру и 1 специальный символ.',
            maxLength: 20,
            minLength: 8,
            type: 'password',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: `2`,
            placeholder: 'New Password',
            label: 'New Password',
            name: 'newpass',
            errorMessage: 'Пароль должен быть от 8 до 20 символов и содержать хотя бы 1 букву, 1 цифру и 1 специальный символ.',
            maxLength: 20,
            minLength: 8,
            type: 'password',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: `3`,
            placeholder: 'Confirm Password',
            label: 'Confirm',
            name: 'confirmpass',
            errorMessage: 'Новый пароль не совпадает',
            maxLength: 20,
            minLength: 8,
            type: 'password',
            pattern: inputValue.newpass,
            required: true,
        },
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const value = Object.fromEntries(data.entries())
        console.log(value)
        // dispatch(fetchUpdateInfo(value))
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const clearValue = (value: 'username' | 'email' | 'phone' | 'oldpass' | 'newpass' | 'confirmpass') => {       
        setInputValue({ ...inputValue, [value]: '' })
    }

    return (
        <>

            <div className={s.accaunt__wrap}>
                <div className={s.accaunt__info}>
                    <h1 className={s.accaunt__title}>User Account</h1>
                    <Link className={s.accaunt__main} to='/'>На главную</Link>
                </div>
                <div className={s.accaunt__wrap_content}>
                    <p className={s.accaunt__change_form} onClick={() => setChangeForm(!changeForm)}>{changeForm ? `Сменить пароль?` : `Сменить данные?`}</p>
                    <form className={s.accaunt__form} onSubmit={(e) => handleSubmit(e)}>
                        {
                            changeForm ?
                                <>
                                    {
                                        inputs.map((input) => (
                                            <FormInput
                                                key={input.id}
                                                {...input}
                                                value={inputValue[input.name]}
                                                label={input.label}
                                                onChange={onChange}
                                                clearValue={clearValue}
                                                focused=''
                                            />
                                        ))
                                    }
                                </>
                                :
                                <>

                                    {
                                        inputsPass.map((input) => (
                                            <FormInput
                                                key={input.id}
                                                {...input}
                                                value={inputValue[input.name]}
                                                label={input.label}
                                                onChange={onChange}
                                                clearValue={clearValue}
                                                focused=''
                                            />
                                        ))
                                    }
                                </>
                        }
                        <input className={s.accaunt__form_btn} type="submit" value='Обновить'/>
                    </form>
                </div>

            </div >
        </>
    )
}

export const Accaunt: React.FC = () => {
    return (
        <>
            <div className={s.accaunt}>
                <Container children={[<AccauntComponent key={`AccauntComponent`} />]} />
            </div>
        </>
    )
}






























// import * as React from 'react';
// import s from './Account.module.scss';
// import { Link } from 'react-router-dom';
// import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
// import { useForm, SubmitHandler, Controller } from "react-hook-form"
// import { Container } from '../../components/containerComp/Container';
// import { fetchUpdateInfo } from '../../redux/slices/authSlice';
// import { yupResolver } from "@hookform/resolvers/yup"
// import InputMask from 'react-input-mask';
// import * as yup from "yup"
// import { selectAuthData } from '../../redux/selectos';
// import check from '../../asets/svg/check.svg';
// import cancel from '../../asets/svg/cancel.svg';


// type AccauntTypes = {
//     username?: string | null
//     phone?: string | null
//     email?: string | null
// }

// type PassworTypes = {
//     newPass?: string | null
//     oldPass?: string | null

// }




// export const AccauntComponent: React.FC = () => {
//     const dispatch = useCustomDispatch();
//     const auth = useCustomSelector(selectAuthData);
//     const [data, setData] = React.useState<any>(null);
//     const [oldPass, setOldPass] = React.useState<string>('');
//     const [newPass, setNewPass] = React.useState<string>('');
//     const [changePass, setChangePass] = React.useState<boolean>(false);


//     React.useEffect(() => {
//         if (auth.isLoading === "loaded" && auth.data) {
//             setData({
//                 id: auth.data.user.id,
//                 username: auth.data.user.username,
//                 email: auth.data.user.email,
//                 phone: auth.data.user.phone
//             })
//         }
//     }, [auth.data, auth.isLoading])

//     const schema = yup
//         .object({
//             username: yup.string()
//                 .notRequired()
//                 .matches(/^[а-яА-ЯЁё]*$/, "Только кирилица")
//                 .min(2, 'Минимальная длина 2 символов'),
//             phone: yup.string()
//                 .notRequired()
//                 .matches(/\d{3}[\s-]?\d{2}[\s-]?\d{2}/, "Только числа"),
//             email: yup.string()
//                 .notRequired()
//                 .matches(/^\S+@\S+\.\S+$/, "Введите почтовый адрес"),
//             password: yup.string()
//                 .min(6, 'Минимальная длина 6 символов')
//                 .nullable()
//                 .notRequired(),
//         })
//         .required()

//     const { control, register, handleSubmit, formState: { errors }, } = useForm({
//         resolver: yupResolver(schema), mode: "onChange",
//     })

//     const Update: SubmitHandler<AccauntTypes> = async (data) => {
//         console.log(data)
//         // const { username, email, password, phone } = data
//         // await dispatch(fetchUpdateInfo({ username, email, phone: phone ? phone : '', password }));
//         // window.alert('Письмо отправленно вам на почту')
//     }

//     const chengePassword = () => {
//         console.log(oldPass, newPass)

//     }

//     const checkClass = (curenValue: string, dataValue: string) => {
//         return curenValue !== dataValue ? `${s.accaunt__form_icon} ${s.active}` : `${s.accaunt__form_icon}`
//     }

//     return (
//         <div className={s.accaunt}>
//             <div className={s.accaunt__info}>
//                 <h1 className={s.accaunt__title}>Personal account</h1>
//                 <Link className={s.accaunt__main} to='/'>На главную</Link>
//             </div>
//             <div className={s.accaunt__form_wrap}>
//                 {
//                     data ?
//                         <div className={s.accaunt__form_inputs}>
//                             <form className={s.accaunt__form_input} onSubmit={handleSubmit(Update)}>
//                                 {errors.username && <p className={s.accaunt__input_error} role="alert">{errors.username.message}</p>}
//                                 <div>
//                                     <label className={s.accaunt__form_label} htmlFor="name">Имя: </label>
//                                     <input
//                                         className={s.accaunt__input}
//                                         placeholder="Name"
//                                         {...register("username", { required: true })}
//                                         aria-invalid={errors.username ? "true" : "false"}
//                                         value={data.username}
//                                         onChange={((e) => setData({ ...data, username: e.target?.value }))}
//                                         type="text"
//                                     />
//                                     <input
//                                         className={checkClass(auth.data?.user.username ?? '', data.username)}
//                                         type="image"
//                                         src={check} alt="check"
//                                     />
//                                     <input
//                                         className={checkClass(auth.data?.user.username ?? '', data.username)}
//                                         onClick={(() => setData({ ...data, username: '' }))}
//                                         type="image"
//                                         src={cancel} alt="check"
//                                     />
//                                 </div>
//                             </form>
//                             <form className={s.accaunt__form_input} onSubmit={handleSubmit(Update)}>
//                                 {errors.email && <p className={s.accaunt__input_error} role="alert">{errors.email.message}</p>}
//                                 <div>
//                                     <label className={s.accaunt__form_label} htmlFor="email">Почта: </label>
//                                     <input
//                                         className={s.accaunt__input}
//                                         placeholder="Emali"
//                                         {...register("email", { required: true })}
//                                         aria-invalid={errors.email ? "true" : "false"}
//                                         value={data.email}
//                                         onChange={((e) => setData({ ...data, email: e.target?.value }))}
//                                         type="text"
//                                     />
//                                     <input
//                                         className={checkClass(auth.data?.user.email ?? '', data.email)}
//                                         type="image"
//                                         src={check} alt="check"
//                                     />
//                                     <input
//                                         className={checkClass(auth.data?.user.username ?? '', data.username)}
//                                         onClick={(() => setData({ ...data, username: '' }))}
//                                         type="image"
//                                         src={cancel} alt="check"
//                                     />
//                                 </div>
//                             </form>
//                             <form className={s.accaunt__form_input} onSubmit={handleSubmit(Update)}>
//                                 {errors.phone && <p className={s.accaunt__input_error} role="alert">{errors.phone.message}</p>}
//                                 <div>
//                                     <label className={s.accaunt__form_label} htmlFor="phone">Номер: </label>
//                                     <Controller
//                                         name="phone"
//                                         control={control}
//                                         render={({ field }) =>
//                                             <InputMask
//                                                 {...field.onChange}
//                                                 className={s.accaunt__input}
//                                                 placeholder="Номер"
//                                                 id="phone"
//                                                 mask="+9 (999) 999-99-99"
//                                                 value={data.phone}
//                                                 {...register("phone", { required: true })}
//                                                 onChange={((e) => setData({ ...data, phone: e.target?.value }))}
//                                                 aria-invalid={errors.phone ? "true" : "false"}
//                                             />

//                                         }
//                                     />
//                                     <input
//                                         className={checkClass(auth.data?.user.phone ?? '', data.phone)}
//                                         type="image"
//                                         src={check} alt="check"
//                                     />
//                                     <input
//                                         className={checkClass(auth.data?.user.phone ?? '', data.phone)}
//                                         onClick={(() => setData({ ...data, phone: '' }))}
//                                         type="image"
//                                         src={cancel} alt="check"
//                                     />
//                                 </div>
//                             </form>
//                             <div className={s.accaunt__pass}>
//                                 <button className={s.accaunt__pass_btn}>Сменить пароль?</button>
//                                 <form className={s.accaunt__pass_form} onSubmit={e => e.preventDefault()}>
//                                     {errors.password && <p role="alert">{errors.password.message}</p>}
//                                     <input
//                                         className={s.accaunt__pass_input}
//                                         placeholder="Old password"
//                                         {...register("password", { required: true })}
//                                         aria-invalid={errors.password ? "true" : "false"}
//                                         value={oldPass}
//                                         onChange={(e) => setOldPass(e.target?.value)}
//                                         type="password"
//                                     />
//                                     {errors.password && <p role="alert">{errors.password.message}</p>}
//                                     <input
//                                         className={s.accaunt__pass_input}
//                                         placeholder="New password"
//                                         {...register("password", { required: true })}
//                                         aria-invalid={errors.password ? "true" : "false"}
//                                         value={newPass}
//                                         onChange={(e) => setNewPass(e.target?.value)}
//                                         type="password"
//                                     />
//                                     <button onClick={() => chengePassword()}>Сменить</button>
//                                 </form>
//                             </div>
//                         </div>

//                         :
//                         <p>Залогиньтесь</p>
//                 }
//             </div>
//         </div >
//     )
// }

// export const Accaunt: React.FC = () => {
//     return <Container children={[<AccauntComponent key={`AccauntComponent`} />]} />
// }