import * as React from 'react';
import { Cards } from '../cardComp/Cards';
import s from './CardList.module.scss';

interface Props {
    countCards: number
}

export const CardList: React.FC<Props> = ({ countCards }) => {

    return (
        <>
            <div className={s.cardsContainer}>
                {
                    [...Array(countCards)].map((items: any, index: number) => (
                        <Cards />
                    ))
                }
            </div>
        </>
    )
}