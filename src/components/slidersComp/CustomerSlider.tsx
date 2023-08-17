import * as React from 'react';
import s from './CustomerSlider.module.scss';
import avatar from '../../asets/png/customer_avatar.png';
import { motion, AnimatePresence } from "framer-motion"

interface Props {
    sliderId: string,
}

export const CustomerSliderContent: React.FC<Props> = ({ sliderId }) => {
    return (
        <>

            <div
                className={s.customer__item}
                style={{ transform: `translateX(${`-` + sliderId + `00`}%)` }}
            >
                <img className={s.customer__img} src={avatar} alt="avatar" />
                <p className={s.customer__content_text}>
                    I like Furniking.com and as compared to other company it's polices and customers support is very good easy to reach., also many time they unable to delivered. The ultricies are pregnant while the quis is suspended. Risus commodo viverra maecenas accumsan lacus vel facilisist amet.
                </p>
                <h1 className={s.customer__content_title}>Angelina Joly</h1>
                <p className={s.customer__content_post}>Co-founder</p>
            </div>

        </>
    )
}

export const CustomerSlider: React.FC = () => {
    const [sliderId, setSliderId] = React.useState<string>("0");
    const DataArray = [...Array(3)];
    const swipeSpeed = 10000;

    const swipePower = (offset: any, valocity: any) => {
        return Math.abs(offset) * valocity;
    }

    return (
        <>
            <div className={s.customer}>
                <div className={s.customer__items}>
                    <AnimatePresence>
                        {
                            DataArray.map((_, i) => (
                                <motion.div
                                    className={s.customer__slide_wrap}
                                    key={i}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={
                                        (e, { offset, velocity }) => {
                                            const swipe = swipePower(offset.x, velocity.x);
                                            if (swipe < swipeSpeed) {
                                                console.log(swipe < swipeSpeed, 1)
                                                setSliderId((prev: string) => Number(prev) === (DataArray.length - 1) ? prev = '0' : String(Number(prev) + 1))
                                            } else if (swipe > swipeSpeed) {
                                                console.log(swipe > swipeSpeed, 2)
                                                setSliderId((prev: string) => Number(prev) <= 0 ? prev = String(DataArray.length - 1) : String(Number(prev) - 1))
                                            }
                                        }
                                    }
                                >
                                    <CustomerSliderContent
                                        key={i}
                                        sliderId={sliderId}
                                    />
                                </motion.div>
                            ))
                        }
                    </AnimatePresence>
                </div>


                <button className={`${s.customer__btn} ${s.customer__btn_next}`}
                    onClick={() => { setSliderId((prev: string) => Number(prev) === (DataArray.length - 1) ? prev = '0' : String(Number(prev) + 1)) }}
                >
                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M27.908 22.7587C27.5178 23.1489 27.5174 23.7815 27.9072 24.1721L41.0002 37.2937C41.3897 37.684 41.3897 38.316 41.0002 38.7063L27.9072 51.8279C27.5174 52.2185 27.5178 52.8511 27.908 53.2413L30.9596 56.2929C31.3501 56.6834 31.9832 56.6834 32.3738 56.2929L49.9596 38.7071C50.3501 38.3166 50.3501 37.6834 49.9596 37.2929L32.3738 19.7071C31.9832 19.3166 31.3501 19.3166 30.9596 19.7071L27.908 22.7587Z" fill="#CCCCCC" />
                    </svg>
                </button>
                <button className={`${s.customer__btn} ${s.customer__btn_prev}`}
                    onClick={() => { setSliderId((prev: string) => Number(prev) <= 0 ? prev = String(DataArray.length - 1) : String(Number(prev) - 1)) }}
                >
                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M48.092 53.2413C48.4822 52.8511 48.4826 52.2185 48.0928 51.8279L34.9998 38.7063C34.6103 38.316 34.6103 37.684 34.9998 37.2937L48.0928 24.1721C48.4826 23.7815 48.4822 23.1489 48.092 22.7587L45.0404 19.7071C44.6499 19.3166 44.0168 19.3166 43.6262 19.7071L26.0404 37.2929C25.6499 37.6834 25.6499 38.3166 26.0404 38.7071L43.6262 56.2929C44.0168 56.6834 44.6499 56.6834 45.0404 56.2929L48.092 53.2413Z" fill="#CCCCCC" />
                    </svg>
                </button>
            </div>

        </>
    )
}