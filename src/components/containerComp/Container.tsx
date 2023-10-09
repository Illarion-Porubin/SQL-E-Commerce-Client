import * as React from 'react';
import s from './Container.module.scss';

interface Props {
    children: React.ReactNode[];
}

export const Container: React.FC<Props> = ({ children }) => {
    return (
        <div className={`${s.container} ${s.mobile__container}`}>
            {children}
        </div>
    )
}