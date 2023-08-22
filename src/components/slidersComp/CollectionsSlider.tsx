import * as React from 'react';
import s from './CollectionsSlider.module.scss';
import slide from '../../asets/png/Herobaner.png';
import { motion, AnimatePresence } from "framer-motion";



export const CollectionsSlider: React.FC = () => {
    const [sliderId, setSliderId] = React.useState<string>("0");
    const sliderArray = [...Array(3)];
    const swipeSpeed = 10000;
    const swipePower = (offset: any, valocity: any) => {
        return Math.abs(offset) * valocity;
    }

    return (
        <div className={s.slider}>
            <div className={s.slider__wrap}>
                <AnimatePresence>
                    {
                        sliderArray.map((_, i) => (
                            <motion.div
                                className={s.slider__img_wrap}
                                drag="x"
                                key={i}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={
                                    (e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x);
                                        if (swipe < swipeSpeed) {
                                            console.log(swipe < swipeSpeed, 1)
                                            setSliderId((prev: string) => Number(prev) === (sliderArray.length - 1) ? prev = '0' : String(Number(prev) + 1))
                                        } else if (swipe > swipeSpeed) {
                                            console.log(swipe > swipeSpeed, 2)
                                            setSliderId((prev: string) => Number(prev) <= 0 ? prev = String(sliderArray.length - 1) : String(Number(prev) - 1))
                                        }
                                    }
                                }
                            >
                                <div
                                    className={s.slider__img}
                                    key={i}
                                    style={{
                                        transform: `translateX(${!sliderId ? sliderId : `-` + sliderId + `00`}%)`,
                                        backgroundImage: `url(${slide})`
                                    }}
                                >
                                    <div className={s.slider__test}></div>
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