import React from 'react';
import s from './Auth.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import { Container } from '../../components/containerComp/Container';
import { fetchLogin } from '../../redux/slices/authSlice';
import { FormInput } from '../../components/formInputComp/FormInput';
import { UserTypes } from '../../types/types';
import googleIcon from "../../asets/svg/google.svg";
import githubIcon from "../../asets/svg/github.svg";



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
        placeholder: 'Password',
        label: 'Password',
        name: 'password',
        errorMessage: 'Пароль должен быть от 8 до 20 символов и содержать хотя бы 1 букву, 1 цифру и 1 специальный символ.',
        maxLength: 20,
        minLength: 8,
        type: 'password',
        pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
        required: true,
    },
]


export const LoginContent: React.FC = () => {
    const dispatch = useCustomDispatch();
    const auth = useCustomSelector(selectAuthData);
    const [inputValue, setInputValue] = React.useState({ email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }


    const clearValue = (value: 'username' | 'email' | 'phone' | 'oldpass' | 'newpass' | 'confirmpass' | 'password') => {
        setInputValue({ ...inputValue, [value]: '' })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(data.entries())
        const userData = { email: value.email, password: value.password }
        const { payload } = await dispatch(fetchLogin(userData));
        const _payload = payload as UserTypes;
        if (!_payload) {
            return alert("Не удалось авторизоваться");
        }
        if (!_payload?.user?.isActivated) {
            return alert("Пожалуйста, подтвердите аккаунт");
        } else {
            if (_payload.accessToken && "accessToken" in _payload) {
                window.localStorage.setItem("token", _payload.accessToken);
            }
        }
    }


    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    }

    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    }
 
    console.log(auth?.data?.user)

    if (auth.data && auth.data.user.isActivated) {
        return <Navigate to="/" />
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
            <div className={s.auth__other_logins}>
                <img className={s.auth__other_icon}
                    onClick={google}
                    src={googleIcon}
                    alt="google logo"
                />
                <img className={s.auth__other_icon}
                    onClick={github}
                    src={githubIcon}
                    alt="github logo"
                />
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