import * as React from 'react';
import s from './Regist.module.scss';
import { Link } from 'react-router-dom';
import { useCustomDispatch } from '../../hooks/store';
import { fetchRegistration } from '../../redux/slices/authSlice';

export const Regist: React.FC = () => {
    const dispatch = useCustomDispatch();
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [pass, setPass] = React.useState<string>('');


    const regist = () => {
        dispatch(fetchRegistration({ username: name, email, password: pass }))
    }

    return (
        <>

            <Link to='/'><h1>На главную</h1></Link>
            <div className={s.auth}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={s.auth__block}>
                        <h1>Авторизируйтесь</h1>
                        <input type="text"
                            placeholder='Name'
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(() => e?.target?.value)}
                        />
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
                    <button onClick={regist}>Отправить</button>
                </form>
                <Link to="/login">залогиниться</Link>
            </div>
        </>
    )
}