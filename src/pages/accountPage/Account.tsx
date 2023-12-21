import * as React from 'react';
import s from './Account.module.scss';
import { Container } from '../../components/containerComp/Container';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { Link, Navigate } from 'react-router-dom';
// import { fetchAuthMe, fetchDeleteAvatar, fetchUpdateInfo, fetchUploadAvatar } from '../../redux/slices/authSlice';
import { fetchUpdateInfo } from '../../redux/slices/authSlice';
import { selectAuthData } from '../../redux/selectos';
import { FormInput } from '../../components/formInputComp/FormInput';
// import defaultAvatar from '../../asets/jpg/unnamed.jpg';
import { UploadWidget } from '../../components/upLoad/upLoadWidget';


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
    // const avatar = auth.data?.user.avatar ? `${'http://localhost:5000/' + auth.data?.user.avatar}` : defaultAvatar;
    // const checkAvatar = auth.data?.provider !== 'default' && auth.data?.user.avatar ? auth.data?.user.avatar : avatar;
    // const filePicker = React.useRef<HTMLInputElement>(null);

    console.log(auth)

    React.useEffect(() => {
        if (auth.isLoading === "loaded" && auth.data) {
            setInputValue({
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
            type: 'text',
            pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
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
            type: 'text',
            pattern: inputValue.newpass,
            required: true,
        },
    ]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement)
        const value = Object.fromEntries(data.entries())
        const userData = {
            id: auth.data?.user.id,
            username: value.username,
            email: value.email,
            phone: value.phone,
            oldpass: value.oldpass,
            newpass: value.newpass,
            confirmpass: value.confirmpass,
        }
        if (auth.data?.user.id) {
            dispatch(fetchUpdateInfo(userData))
        }
        else {
            window.alert(`Пользователь не найден`)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const clearValue = (value: 'username' | 'email' | 'phone' | 'oldpass' | 'newpass' | 'confirmpass' | 'password') => {
        setInputValue({ ...inputValue, [value]: '' })
    }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target?.files ? e.target?.files[0] : false;
    //     const formData = new FormData();
    //     if (file) {
    //         formData.append('file', file)
    //         dispatch(fetchDeleteAvatar())
    //         dispatch(fetchUploadAvatar(formData))
    //         setTimeout(() => {
    //             dispatch(fetchAuthMe())
    //         }, 300);
    //     }
    // }

    // const upLoadAvatar = () => {
    //     filePicker.current?.click();
    // }

    console.log(auth.isLoading)

    if (auth.isLoading === 'error') {
        return <Navigate to="/" />
    }

    return (
        <>

            <div className={s.accaunt__wrap}>
                <div className={s.accaunt__info}>
                    <h1 className={s.accaunt__title}>User Account</h1>
                    <Link className={s.accaunt__main} to='/'>На главную</Link>
                </div>
                <Link className={s.accaunt__admin} to='/admin'>Админ панель</Link>
                <div className={s.accaunt__wrap_content}>
                    {/* <input
                        className={s.accaunt__avatar_hidden}
                        ref={filePicker}
                        type="file"
                        onChange={(e) => handleChange(e)}
                        accept='image/*,.png,.jpg,.svg,.web'
                    />
                    <img
                        className={s.accaunt__avatar}
                        onClick={upLoadAvatar}
                        src={checkAvatar}
                        alt="avatar"
                    /> */}
                    <UploadWidget />
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
                                            />
                                        ))
                                    }
                                </>
                        }
                        <input className={s.accaunt__form_btn} type="submit" value='Обновить' />
                    </form>
                    <p className={s.accaunt__change_form} onClick={() => setChangeForm(!changeForm)}>{changeForm ? `Сменить пароль?` : `Сменить данные?`}</p>
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