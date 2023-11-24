import * as React from 'react';
import { Container } from '../../../components/containerComp/Container';
import s from './Categories.module.scss';
import cross from '../../../asets/svg/cross.svg';
import accept from '../../../asets/svg/check.svg';



export const CategoriesContent: React.FC = () => {
    const [add, setAdd] = React.useState<boolean>(true);
    const [category, setCategory] = React.useState<string>('')

    const close = () => {
        setCategory('')
        setAdd(true)
    }

    return (
        <>
            <div className={s.categories}>
                <div className={s.categories__content}>
                    {add ?
                        <button className={s.categories__add_btn} onClick={() => setAdd(false)}>+ Добавить</button>
                        :
                        <div className={s.categories__add}>
                            <input
                                className={s.categories__add_input}
                                type="text"
                                placeholder='Добавьте категорию'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <img
                                className={`${s.categories__add_svg} ${s.categories__accept}`}
                                onClick={() => close()}
                                src={accept} alt="accept"
                            />
                            <img
                                className={`${s.categories__add_svg} ${s.categories__cross}`}
                                onClick={() => close()}
                                src={cross} alt="cross"
                            />
                        </div>
                    }
                    <div className={s.categories__item}>
                        <p className={s.categories__item_title}>Стулья</p>
                        {/* <input type="text" /> */}
                        <img
                            className={`${s.categories__item_svg} ${s.categories__accept}`}
                            onClick={() => close()}
                            src={accept} alt="accept"
                        />
                        <img
                            className={`${s.categories__item_svg} ${s.categories__cross}`}
                            onClick={() => close()}
                            src={cross} alt="cross"
                        />
                    </div>
                    <div className={s.categories__item}>
                        <p className={s.categories__item_title}>Столы</p>
                        <img
                            className={`${s.categories__item_svg} ${s.categories__accept}`}
                            onClick={() => close()}
                            src={accept} alt="accept"
                        />
                        <img
                            className={`${s.categories__item_svg} ${s.categories__cross}`}
                            onClick={() => close()}
                            src={cross} alt="cross"
                        />
                    </div>
                    <div className={s.categories__item}>
                        <p className={s.categories__item_title}>Диваны</p>
                        <img
                            className={`${s.categories__item_svg} ${s.categories__accept}`}
                            onClick={() => close()}
                            src={accept} alt="accept"
                        />
                        <img
                            className={`${s.categories__item_svg} ${s.categories__cross}`}
                            onClick={() => close()}
                            src={cross} alt="cross"
                        />
                    </div>
                    <div className={s.categories__item}>
                        <p className={s.categories__item_title}>Кресла</p>
                        <img
                            className={`${s.categories__item_svg} ${s.categories__accept}`}
                            onClick={() => close()}
                            src={accept} alt="accept"
                        />
                        <img
                            className={`${s.categories__item_svg} ${s.categories__cross}`}
                            onClick={() => close()}
                            src={cross} alt="cross"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export const Categories: React.FC = () => {
    return (
        <div className={s.background}>
            <Container children={[<CategoriesContent key={`ProductsContent`} />]} />
        </div>
    )
}