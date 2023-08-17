import * as React from 'react';
import s from './CollectionsSlider.module.scss';
import slide from '../../asets/png/Herobaner.png';



export const CollectionsSlider: React.FC = () => {
    const [sliderId, setSliderId] = React.useState<string>("0");
    const sliderArray = [...Array(3)];


    return (
        <div className={s.slider}>
            <div className={s.slider__wrap}>
                {
                    sliderArray.map((_, index) => (
                        <img
                            style={{ transform: `translateX(${!sliderId ? sliderId : `-` + sliderId + `00`}%)` }}
                            className={s.slider__img}
                            src={slide} alt="" key={index}
                        />
                    ))
                }

                <div className={s.slider__paginate}>
                    {
                        sliderArray.map((_, index) => (
                            <button className={sliderId === String(index) ? `${s.slider__page} ${s.active}` : s.slider__page}
                                onClick={() => { setSliderId(String(index)) }}
                                key={index}
                            ></button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}