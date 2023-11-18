import * as React from 'react';
import { Container } from '../../../components/containerComp/Container';
import s from './Products.module.scss';


export const ProductsContent: React.FC = () => {
    return (
        <>Продукты</>
    )
}

export const Products: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<ProductsContent key={`ProductsContent`} />]} />
        </div>
    )
}