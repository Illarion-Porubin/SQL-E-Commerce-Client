import * as React from 'react';
import s from './Auth.module.scss';
import { Link } from 'react-router-dom';
import { useCustomDispatch } from '../../hooks/store';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Container } from '../../components/containerComp/Container';
import { fetchRegistration } from '../../redux/slices/authSlice';
import { yupResolver } from "@hookform/resolvers/yup"
import InputMask from 'react-input-mask';
import * as yup from "yup"

type Registation = {
    username: string
    phone?: string | null
    email: string
    password: string
}

 
const schema = yup
    .object({
        username: yup.string()
            .required('Имя обязательно')
            .min(2, 'Минимальная длина 2 символов')
            .max(10, 'Максимальная длина 12 символов'),
        phone: yup.string()
            // .required('Телефон обязателен')
            // .matches(/\d{3}[\s-]?\d{2}[\s-]?\d{2}/, "Должны быть только числа")
            .notRequired(),
        email: yup.string()
            .required('Почта обязательна')
            .matches(/^\S+@\S+\.\S+$/, "Введите почтовый адрес"),
        password: yup.string()
            .required('Пароль обязателен')
            .min(6, 'Минимальная длина 6 символов'),
    })
    .required()

export const RegistContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const { control, register, handleSubmit, formState: { errors }, } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                username: '',
                phone: '',
                email: '',
                password: '',
            },
        })

    const Registration: SubmitHandler<Registation> = async (data) => {
        const { username, email, password, phone } = data
        await dispatch(fetchRegistration({ username, email, password, phone: phone ? phone : "" }));
        window.alert('Письмо отправленно вам на почту')
    }

    return (
        <div className={s.auth}>
            <div className={s.auth__info}>
                <h1 className={s.auth__title}>Simple Registration</h1>
                <Link className={s.auth__main} to='/'>На главную</Link>
            </div>
            <div className={s.auth__form_wrap}>
                <Link className={s.auth__form_change} to='/login'>Есть аккаунт?</Link>
                <form className={s.auth__form} onSubmit={handleSubmit(Registration)} >
                    <input
                        className={!errors.username ? s.auth__input : s.auth__input_err}
                        placeholder="Name"
                        {...register("username", { required: true })}
                        aria-invalid={errors.username ? "true" : "false"}
                        type="text"
                    />
                    {errors.username && <p role="alert">{errors.username.message}</p>}
                    <input
                        className={!errors.email ? s.auth__input : s.auth__input_err}
                        placeholder="Email"
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                        type="text"
                    />
                    {errors.email && <p role="alert">{errors.email.message}</p>}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) =>
                            <InputMask
                                {...field.onChange}
                                className={!errors.phone ? s.auth__input : s.auth__input_err}
                                placeholder="Телефон (необязателен)"
                                id="phone"
                                mask="+9 (999) 999-99-99"
                                {...register("phone", { required: true })}
                                aria-invalid={errors.phone ? "true" : "false"}
                            />

                        }
                    />
                    {errors.phone && <p role="alert">{errors.phone.message}</p>}
                    <input
                        className={!errors.password ? s.auth__input : s.auth__input_err}
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

export const Regist: React.FC = () => {
    return <Container children={[<RegistContent key={`RegistContent`} />]} />
}