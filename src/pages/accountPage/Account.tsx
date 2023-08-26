import * as React from 'react';
import s from './Account.module.scss';
import { Container } from '../../components/containerComp/Container';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { Link } from 'react-router-dom';
import { fetchUpdateInfo } from '../../redux/slices/authSlice';
import { selectAuthData } from '../../redux/selectos';


import { FormInput } from '../../components/formInputComp/FormInput';


// type AccauntTypes = {
//     username?: string | null
//     phone?: string | null
//     email?: string | null
// }

// type PassworTypes = {
//     newPass?: string | null
//     oldPass?: string | null
// }

interface InputsType {
    id: string,
    placeholder: string,
    label: string,
    name: 'username' | 'email' | 'phone',
    type: string
}

interface InputsPassType {
    id: string,
    placeholder: string,
    label: string,
    name: 'oldpass' | 'newpass' | 'confirmpass',
    type: string
}



export const AccauntComponent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [inputValue, setInputValue] = React.useState({ username: 'sss', email: '', phone: '' });
    const [passValue, setPassValue] = React.useState({ oldpass: '', newpass: '', confirmpass: '' });
    const auth = useCustomSelector(selectAuthData);

    React.useEffect(() => {
        if (auth.isLoading === "loaded" && auth.data) {
            setInputValue({
                // id: auth.data.user.id,
                username: auth.data.user.username,
                email: auth.data.user.email,
                phone: auth.data.user.phone
            })
        }
    }, [auth.data, auth.isLoading])

    console.log(inputValue.email)

    const inputs: InputsType[] = [
        {
            id: `1`,
            placeholder: 'Name',
            label: 'Username',
            name: 'username',
            type: 'text'
        },
        {
            id: `2`,
            placeholder: 'Email',
            label: 'Email',
            name: 'email',
            type: 'text'
        },
        {
            id: `3`,
            placeholder: 'Phone',
            label: 'Phone',
            name: 'phone',
            type: 'text'
        },
    ]

    const inputsPass: InputsPassType[] = [
        {
            id: `1`,
            placeholder: 'Old Password',
            label: 'Old Password',
            name: 'oldpass',
            type: 'text'
        },
        {
            id: `2`,
            placeholder: 'New Password',
            label: 'New Password',
            name: 'newpass',
            type: 'text'
        },
        {
            id: `3`,
            placeholder: 'Confirm Password',
            label: 'Confirm Password',
            name: 'confirmpass',
            type: 'text'
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

    // const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassValue({ ...passValue, [e.target.name]: e.target.value })
    // }

    const clearValue = (value: 'username' | 'email' | 'phone') => {
        if(auth.data) {
            setInputValue({ ...inputValue, [value]: auth.data.user[value]})
        }
    }


    return (
        <div className={s.accaunt}>
            {/* <p>Данные пользователя</p> */}
            {/* <form onSubmit={handleSubmit}>
                {
                    inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={inputValue[input.name]}
                            label={input.label}
                            onChange={onChange}
                        />
                    ))
                }
                <button>Submit</button>
            </form> */}
            <p>Данные пользователя</p>
            {
                inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={inputValue[input.name]}
                        label={input.label}
                        onChange={onChange}
                        handleSubmit={handleSubmit}
                        clearValue={clearValue}
                    />
                ))
            }
        </div >
    )
}

export const Accaunt: React.FC = () => {
    return <Container children={[<AccauntComponent key={`AccauntComponent`} />]} />
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