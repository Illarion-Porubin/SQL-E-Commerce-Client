import * as React from 'react';
import s from './Footer.module.scss';
import { Container } from '../containerComp/Container';

export const FooterContent: React.FC = () => {
    return (
        <>
            <div className={s.footer__info}>
                <p className={s.footer__cop}><span>©</span>2021 Funking - All rights reserved.</p>
                <div className={s.footer__links}>
                    <a className={s.footer__link} href="/#">Privacy</a>
                    <a className={s.footer__link} href="/#">Security</a>
                    <a className={s.footer__link} href="/#">Terms</a>
                </div>
            </div>
        </>
    )
}

export const Footer: React.FC = () => {
    return (
        <>
            <div className={s.footer}></div>
            <Container children={[<FooterContent key={'FooterContent'} />]} />
        </>
    )
}