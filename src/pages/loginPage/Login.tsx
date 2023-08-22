import * as React from 'react';
import s from './Login.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Container } from '../../components/containerComp/Container';
import InputMask from 'react-input-mask';
import { fetchLogin } from '../../redux/slices/authSlice';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type IFormInput = {
    name?: string
    phone?: string
    email?: string
    password: string
}
const schema = yup
    .object({
        // name: yup.number().positive().integer().required(),
        // name: yup.string().matches(/^[А-Яа-яЁё]+$/, "Только русские буквы."),
        name: yup.string()
            .min(2, 'Min length 2 digits')
            .max(10, 'Max length 12 digits')
            .required('Name is required'),
        phone: yup.string()
            .matches(/\d{3}[\s-]?\d{2}[\s-]?\d{2}/, "Must be only digits")
            .required('Phone is required'),
        email: yup.string()
            .matches(/^\S+@\S+\.\S+$/, "Must be email")
            .required('Email is required'),
        password: yup.string()
            .min(6, 'Min length 6 digits')
            .required('Password is required'),
    })
    .required()

export const LoginContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [phone, setPhone] = React.useState<string>('');
    const auth = useCustomSelector(selectAuthData);

    const { control, register, handleSubmit, formState: { errors }, } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                name: "",
                phone: "",
            },
        })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)

        // const { register, control } = useForm()

        // const userData = { ...data, phone: phone };
        // const { payload } = await dispatch(fetchLogin(userData));
        // const _payload = payload as any
        // if (!payload) {
        //     return alert("Не удалось авторизоваться");
        // }

        // if (!_payload.user?.isActivated) {
        //     return alert("Пожалуйста, подтвердите аккаунт");
        // }

        // else {
        //     if (_payload.accessToken && "accessToken" in _payload) {
        //         window.localStorage.setItem('token', _payload.accessToken);
        //     }
        // }
    }


    if (auth.data?.user.isActivated === true) {
        return <Navigate to="/" />
    }
    else if (auth.data && auth.data?.user.isActivated === false) {
        window.alert('Письмо отправленно вам на почту')
    }

    return (
        <div className={s.login}>
            <div className={s.login__info}>
                <h1 className={s.login__title}>Login</h1>
                <Link className={s.login__main} to='/'>На главную</Link>
            </div>
            <div className={s.login__form_wrap}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.login__form}>
                    <input
                        className={!errors.name ? s.login__input : s.login__input_err}
                        placeholder="Name"
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                        type="text"
                    />
                    {errors.name && <p role="alert">{errors.name.message}</p>}
                    <input
                        className={!errors.email ? s.login__input : s.login__input_err}
                        placeholder="Email"
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                    // type="email"
                    />
                    {errors.email && <p role="alert">{errors.email.message}</p>}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) =>
                            <InputMask
                                {...field.onChange}
                                className={!errors.phone ? s.login__input : s.login__input_err}
                                placeholder="Phone"
                                id="phone"
                                mask="+9 (999) 999-99-99"
                                value={phone}
                                {...register("phone", { required: true })}
                                aria-invalid={errors.phone ? "true" : "false"}
                                onChange={(e) => { setPhone(e.target.value) }}
                            />

                        }
                    />
                    {errors.phone && <p role="alert">{errors.phone.message}</p>}
                    <input
                        className={!errors.password ? s.login__input : s.login__input_err}
                        placeholder="Password"
                        {...register("password", { required: true })}
                        aria-invalid={errors.password ? "true" : "false"}
                        type="password"
                    />
                    {errors.password && <p role="alert">{errors.password.message}</p>}
                    <input type="submit" />
                </form>
            </div>

        </div >
    )
}

export const Login: React.FC = () => {
    return <Container children={[<LoginContent key={`LoginContent`} />]} />
}