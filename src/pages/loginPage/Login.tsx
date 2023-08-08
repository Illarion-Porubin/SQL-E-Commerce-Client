import * as React from 'react';
import s from './Login.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectAuthData } from '../../redux/selectos';
import { fetchLogin } from '../../redux/slices/authSlice';

export const Login: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [email, setEmail] = React.useState<string>('user@mail.ru1');
    const [pass, setPass] = React.useState<string>('123456');
    const auth = useCustomSelector(selectAuthData);


    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { payload } = await dispatch(fetchLogin({ email, password: pass }));
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
      };


    console.log(auth.data)

    if (auth.data?.user.isActivated === true) {
        return <Navigate to="/" />
    }
    else if (auth.data && auth.data?.user.isActivated === false) {
        window.alert('Письмо отправленно вам на почту')
    }

    return (
        <>

            <Link to='/'><h1>На главную</h1></Link>
            <div className={s.auth}>
                <form onSubmit={(e) => login(e)}>
                    <div className={s.auth__block}>
                        <h1>Авторизируйтесь</h1>
                        <input type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(() => e?.target?.value)}
                        />
                        <input type="text"
                            placeholder='Password'
                            value={pass}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(() => e?.target?.value)}
                        />
                    </div>
                    <button>Отправить</button>
                </form>
                <Link to="/regist">зарегистрироваться</Link>
            </div>
        </>
    )
}