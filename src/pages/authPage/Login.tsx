import * as React from 'react';
import s from './Auth.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import { Container } from '../../components/containerComp/Container';
import { fetchLogin } from '../../redux/slices/authSlice';
import { FormInput } from '../../components/formInputComp/FormInput';


interface InputsType {
    id: string,
    placeholder: string,
    label: string,
    name: 'email' | 'password',
    errorMessage: string,
    maxLength: number | undefined,
    minLength: number | undefined,
    type: string,
    pattern: string | undefined,
    required: boolean,
}


const inputs: InputsType[] = [
    {
        id: '1',
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
        id: `2`,
        placeholder: 'New Password',
        label: 'New Password',
        name: 'password',
        errorMessage: 'Пароль должен быть от 8 до 20 символов и содержать хотя бы 1 букву, 1 цифру и 1 специальный символ.',
        maxLength: 20,
        minLength: 8,
        type: 'text',
        pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
        required: true,
    },
]


export const LoginContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const auth = useCustomSelector(selectAuthData);
    const [inputValue, setInputValue] = React.useState({ email: '', password: '' });

    if (auth.data?.user.isActivated) {
        return <Navigate to="/" />
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const clearValue = (value: 'username' | 'email' | 'phone' | 'oldpass' | 'newpass' | 'confirmpass' | 'password') => {
        setInputValue({ ...inputValue, [value]: '' })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const value = Object.fromEntries(data.entries())
        const userData = { email: value.email, password: value.password }
        if (auth.data?.user.id) {
            dispatch(fetchLogin(userData))
        }
        else {
            window.alert(`Пользователь не найден`)
        }
    }

    return (
        <div className={s.auth}>
            <div className={s.auth__info}>
                <h1 className={s.auth__title}>Simple Login</h1>
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
                <Link className={s.auth__form_change} to='/regist'>Нет аккаунта?</Link>
            </div>
        </div >
    )
}

export const Login: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<LoginContent key={`LoginContent`} />]} />
        </div>
    )
}