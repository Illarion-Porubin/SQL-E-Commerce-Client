import * as React from 'react';
import s from './sliders.module.scss';



export const HeaderSlider: React.FC = () => {
    const [sliderId, setSliderId] = React.useState<string>("0")

    const sliderHeader = [
        {
            title: 'TOP COLLECTIONS 2021',
            text: 'We Serve Your Dream Furniture',
            action: 'Get 50% off all products',
            img: 'https://static.tildacdn.com/tild6638-6165-4332-b536-633431376265/kisspng-eames-lounge.png',
            tag: 'old',
        },
        {
            title: 'TOP COLLECTIONS 2022',
            text: 'We Serve Your Dream Furniture',
            action: 'Get 40% off all products',
            img: 'https://images.squarespace-cdn.com/content/v1/5eb44485c016007c203dd99a/1643648195146-ZOJN8ZL2WX5YMXPLGOSB/03009.png',
            tag: 'prev',
        },
        {
            title: 'TOP COLLECTIONS 2023',
            text: 'We Serve Your Dream Furniture',
            action: 'Get 30% off all products',
            img: 'https://ilovechair.ru/wp-content/uploads/2020/12/Screenshot_19.png',
            tag: 'new',
        },
    ]

    const sliderColections = [
        {
            price: 120,
            text: 'Office Desk Chai',
            img: 'https://pngimg.com/uploads/armchair/armchair_PNG7011.png',
            linkcolecton: '/#',
            collection: '2021',
        },
        {
            price: 150,
            text: 'Office Desk Chai',
            img: 'https://pngimg.com/uploads/armchair/armchair_PNG7063.png',
            linkcolecton: '/#',
            collection: '2022',
        },
        {
            price: 200,
            text: 'Office Desk Chai',
            img: 'https://w7.pngwing.com/pngs/311/71/png-transparent-club-chair-couch-recliner-design-furniture-couch-recliner.png',
            linkcolecton: '/#',
            collection: '2023',
        },
    ]

    // const sliderScroll = () => {
    //     const maxSlides = sliderHeader.length - 1;
    //     if (Number(sliderId) < maxSlides) {
    //         setSliderId(String(Number(sliderId) + 1))
    //     }
    //     else if (Number(sliderId) === maxSlides) {
    //         setSliderId('0')
    //     }
    // }

    // setTimeout(() => {
    //     sliderScroll()
    // }, 3000)


    return (
        <div className='container'>
            <div className={s.slider}>
                <div className={s.slider__wrap}>
                    {
                        sliderHeader
                            ?
                            sliderHeader.map((item: any) => (

                                <div className={s.slider__item_wrap} key={item.title}>
                                    <div className={s.slider__item}
                                        style={{ transform: `translateX(${!sliderId ? sliderId : `-` + sliderId + `00`}%)` }}
                                    >
                                        <div className={s.slider__info}>
                                            <p className={s.slider__info_title}>{item.title}</p>
                                            <h2 className={s.slider__info_text}>{item.text}</h2>
                                            <p className={s.slider__info_action}>{item.action}</p>
                                            <a href="/#">
                                                <button className={s.slider__info_btn}>SHOP NOW</button>
                                            </a>
                                        </div>
                                        <div className={s.slider__main_img_wrap}>
                                            <img className={s.slider__main_img} src={item.img} alt="img" />
                                        </div>
                                        <div className={s.slider__dop_img}>
                                            {
                                                sliderColections.map((item: any, index: number) => (
                                                    <div className={s.slider__dop_item} key={index}>
                                                        <a href="/#">
                                                            <img className={s.slider__dop_item_img} src={item.img} alt="img" />
                                                        </a>
                                                        <p className={s.slider__dop_item_price}><span>$</span>{item.price}</p>
                                                        <p className={s.slider__dop_item_text}>{item.text}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))

                            :
                            null
                    }

                    <div className={s.slider__paginate}>
                        {
                            sliderHeader.map((item, index) => (
                                <button className={sliderId === String(index) ? `${s.slider__page} ${s.active}` : s.slider__page}
                                    onClick={() => { setSliderId(String(index)) }}
                                    key={item.title}
                                ></button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}