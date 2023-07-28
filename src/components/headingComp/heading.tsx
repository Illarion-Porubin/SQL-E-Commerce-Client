import * as React from 'react';
import s from './heading.module.scss';

type Props = {
    title: string
}

export const Heading: React.FC<Props> = ({title}) => {
    return (
        <h1 className={s.heading}>{title}</h1>
    )
}