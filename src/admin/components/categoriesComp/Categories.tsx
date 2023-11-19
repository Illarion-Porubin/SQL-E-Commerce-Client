import * as React from 'react';
import { Container } from '../../../components/containerComp/Container';
import s from './Categories.module.scss';


export const CategoriesContent: React.FC = () => {
    return (
        <>Категории</>
    )
}

export const Categories: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<CategoriesContent key={`ProductsContent`} />]} />
        </div>
    )
}