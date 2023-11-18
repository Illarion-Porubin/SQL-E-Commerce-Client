import * as React from 'react';
import s from './AdminPage.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/containerComp/Container';

export const AdminContent: React.FC = () => {
    return (
        <div className={s.admin}>
            <div className={s.admin__info}>
                <h1 className={s.admin__title}>Simple Admin Panel</h1>
                <Link className={s.admin__main} to='/'>На главную</Link>
            </div>
            <div className={s.admin__content}>
                <Link className={s.admin__items} to='/products'>
                    <p className={s.admin__items_title}>Товары</p>
                    <img className={s.admin__items_img} src="https://vrcert.ru/wp-content/uploads/2021/09/nov32.jpg" alt="card" />
                </Link>
                <Link className={s.admin__items} to='/categories'>
                    <p className={s.admin__items_title}>Категории</p>
                    <img className={s.admin__items_img} src="https://clipart-library.com/images/8T6zxLnTE.jpg" alt="card" />
                </Link>
            </div>
        </div>
    )
}

export const AdminPage: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<AdminContent key={`AdminContent`} />]} />
        </div>
    )
}