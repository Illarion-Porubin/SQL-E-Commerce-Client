import * as React from 'react';
import s from './Container.module.scss';

interface Props {
    children: any[];
}

export const Container: React.FC<Props> = ({ children }) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}