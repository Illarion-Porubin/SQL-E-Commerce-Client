import * as React from 'react';
import s from './AdminPage.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '../../components/containerComp/Container';
import { Products } from '../../admin/adminComponents/adminProducts/Products';
import { Categories } from '../adminComponents/adminCategories/Categories';

export const AdminContent: React.FC = () => {
    const [section, setSection] = React.useState<string>('Admin')

    const changeSection = (value: string) => {
        setSection(value)
    }

    return (
        <div className={s.admin}>
            <div className={s.admin__info}>
                <h1 className={s.admin__title}>{
                    section === 'Categories' ? 'Categories' :
                        section === 'Products' ? 'Products' :
                            'Simple Admin Panel'
                }</h1>
                {
                    section === 'Admin' ?
                        <Link className={s.admin__main} to='/'>На главную</Link>
                        :
                        <p className={s.admin__main} onClick={() => changeSection('Admin')}>Назад</p>
                }
            </div>
            {
                section === 'Categories'
                    ?
                    <Categories />
                    :
                    section === 'Products'
                        ?
                        <Products />
                        :
                        <div className={s.admin__content}>
                            <div className={s.admin__items} onClick={() => changeSection('Products')}>
                                <p className={s.admin__items_title}>Товары</p>
                                <img className={s.admin__items_img} src="https://vrcert.ru/wp-content/uploads/2021/09/nov32.jpg" alt="card" />
                            </div>
                            <div className={s.admin__items} onClick={() => changeSection('Categories')}>
                                <p className={s.admin__items_title} id="categories" onClick={(e) => (console.log(e.target))} >Категории</p>
                                <img className={s.admin__items_img} src="https://clipart-library.com/images/8T6zxLnTE.jpg" alt="card" />
                            </div>
                        </div>
            }

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