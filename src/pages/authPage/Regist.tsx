import * as React from 'react';
import s from './Auth.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useCustomDispatch } from '../../hooks/store';
import { Container } from '../../components/containerComp/Container';
import { FormInput } from '../../components/formInputComp/FormInput';
import { fetchRegistration } from '../../redux/slices/authSlice';

interface InputsType {
    id: string,
    placeholder: string,
    label: string,
    name: 'username' | 'email' | 'phone' | 'password' | 'confirmpass',
    errorMessage: string,
    maxLength: number | undefined,
    minLength: number | undefined,
    type: string,
    pattern: string | undefined,
    required: boolean,
}

export const RegistContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [inputValue, setInputValue] = React.useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmpass: ''
    });

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
            placeholder: 'Password',
            label: 'Password',
            name: 'password',
            errorMessage: 'Пароль должен быть от 8 до 20 символов и содержать как минимум 1 букву, 1 цифру и 1 специальный символ.',
            maxLength: 20,
            minLength: 8,
            type: 'password',
            pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
            required: true,
        },
        {
            id: `4`,
            placeholder: 'Confirm Password',
            label: 'Confirm',
            name: 'confirmpass',
            errorMessage: 'Новый пароль не совпадает',
            maxLength: 20,
            minLength: 8,
            type: 'password',
            pattern: inputValue.password,
            required: true,
        },
    ]

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const clearValue = (value: 'username' | 'email' | 'phone' | 'oldpass' | 'newpass' | 'confirmpass' | 'password') => {
        setInputValue({ ...inputValue, [value]: '' })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(data.entries())
        if (value.password === value.confirmpass) {
            const userData = {
                username: value.username,
                email: value.email,
                password: value.password,
                phone: value.phone ? value.phone : '',
            }
            dispatch(fetchRegistration(userData));
            window.alert('Письмо отправленно на вашу почту');
            // window.location.href = "/login"
        }
    }

    return (
        <div className={s.auth}>
            <div className={s.auth__info}>
                <h1 className={s.auth__title}>Simple Registration</h1>
                <Link className={s.auth__main} to='/'>На главную</Link>
            </div>
            <div className={s.auth__form_wrap}>
                <form className={s.auth__form} onSubmit={(e) => handleSubmit(e)} >
                    {
                        inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={inputValue[input.name]}
                                label={input.label}
                                onChange={onChange}
                                clearValue={clearValue}
                            />
                        ))
                    }
                    <input className={s.auth__form_btn} type="submit" />
                </form>
                <Link className={s.auth__form_change} to='/login'>Есть аккаунт?</Link>
            </div>
        </div >
    )
}

export const Regist: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<RegistContent key={`RegistContent`} />]} />
        </div>
    )
}