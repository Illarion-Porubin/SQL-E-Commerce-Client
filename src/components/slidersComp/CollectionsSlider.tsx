import * as React from 'react';
import s from './CollectionsSlider.module.scss';
import slide from '../../asets/png/Herobaner.png';
import { motion, AnimatePresence } from "framer-motion";



export const CollectionsSlider: React.FC = () => {
    const [sliderId, setSliderId] = React.useState<string>("0");
    const sliderArray = [...Array(3)];
    const swipeSpeed = 10000;
    const swipePower = (offset: number, valocity: number) => {
        return Math.abs(offset) * valocity;
    }

    return (
        <div className={s.slider}>
            <div className={s.slider__wrap}>
                <AnimatePresence>
                    {
                        sliderArray.map((_, i) => (
                            <motion.div
                                drag="x"
                                key={i}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={
                                    (e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x);
                                        if (swipe < swipeSpeed) {
                                            setSliderId((prev: string) => Number(prev) === (sliderArray.length - 1) ? prev = '0' : String(Number(prev) + 1))
                                        } else if (swipe > swipeSpeed) {
                                            setSliderId((prev: string) => Number(prev) <= 0 ? prev = String(sliderArray.length - 1) : String(Number(prev) - 1))
                                        }
                                    }
                                }
                            >
                                <div className={s.slider__content}> 
                                    <img
                                        className={s.slider__img}
                                        key={i}
                                        src={slide}
                                        style={{
                                            transform: `translateX(${!sliderId ? sliderId : `-` + sliderId + `00`}%)`,
                                        }}
                                        alt='slide'
                                    />
                                    <div className={s.slider__plug}></div>
                                </div>
                            </motion.div>
                        ))
                    }
                </AnimatePresence>

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