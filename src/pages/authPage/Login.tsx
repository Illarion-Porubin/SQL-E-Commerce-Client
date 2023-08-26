import * as React from 'react';
import s from './Auth.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import { useForm, SubmitHandler } from "react-hook-form"
import { Container } from '../../components/containerComp/Container';
import { fetchLogin } from '../../redux/slices/authSlice';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type LoginTipes = {
    email: string
    password: string
}


const schema = yup
    .object({
        email: yup.string()
            .required('Почта обязательна')
            .matches(/^\S+@\S+\.\S+$/, "Введите почтовый адрес"),
        password: yup.string()
            .required('Пароль обязателен')
            .min(6, 'Минимальная длина 6 символов'),
    })
    .required()

export const LoginContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const auth = useCustomSelector(selectAuthData);

    const { register, handleSubmit, formState: { errors }, } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                email: "",
                password: "",
            },
        })

    const Login: SubmitHandler<LoginTipes> = async (data) => {
        const userData = { ...data };
        const { payload } = await dispatch(fetchLogin(userData));

        const _payload = payload as any
        if (!payload) {
            return alert("Не удалось авторизоваться");
        }

        if (!_payload.user?.isActivated) {
            return alert("Пожалуйста, подтвердите аккаунт");
        }

        else {
            if (_payload.accessToken && "accessToken" in _payload) {
                window.localStorage.setItem('token', _payload.accessToken);
            }
        }
    }

    if (auth.data?.user.isActivated) {
        return <Navigate to="/" />
    }

    return (
        <div className={s.auth}>
            <div className={s.auth__info}>
                <h1 className={s.auth__title}>Simple Login</h1>
                <Link className={s.auth__main} to='/'>На главную</Link>
            </div>
            <div className={s.auth__form_wrap}>
                <Link className={s.auth__form_change} to='/regist'>Нет аккаунта?</Link>

                <form className={s.auth__form} onSubmit={handleSubmit(Login)} >
                    <input
                        className={!errors.email ? s.auth__input : s.auth__input_err}
                        placeholder="Email"
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                        type="text"
                    />
                    {errors.email && <p role="alert">{errors.email.message}</p>}
                    <input
                        className={!errors.password ? s.auth__input : s.auth__input_err}
                        placeholder="Password"
                        {...register("password", { required: true })}
                        aria-invalid={errors.password ? "true" : "false"}
                        type="text"
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