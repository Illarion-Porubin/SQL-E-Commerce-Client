import React from 'react';
import s from './Modern.module.scss';
import modern_1 from '../../asets/png/modern_1.png';
import modern_2 from '../../asets/png/modern_2.png';
import modern_3 from '../../asets/png/modern_3.png';



export const Modern: React.FC = () => {
  
  return (
    <div className={s.modern}>
      <div className={s.modern__main_content}>
        <img className={`${s.modern__main_img} ${s.modern__img}`} src={modern_1} alt="img" />
        <div className={s.modern__main_info}>
          <p className={`${s.modern__main_title} ${s.modern__title}`}>Modern Furniture Collections</p>
          <p className={s.modern__main_text}>Starting from $<span className={s.modern__main_price}>500</span></p>
          <a className={s.modern__main_link} href="/#">Read more</a>
        </div>
      </div>
      <div className={s.modern__dop_content}>
        <div className={`${s.modern__dop_item} ${s.modern__img}`}>
          <img className={s.modern__dop_img} src={modern_2} alt="img" />
          <div className={s.modern__dop_info}>
            <p className={`${s.modern__dop_title} ${s.modern__title}`}>Modern Furniture Collections</p>
            <p className={s.modern__dop_text}>Starting from $<span className={s.modern__main_price}>500</span></p>
            <a className={s.modern__dop_link} href="/#">Read more</a>
          </div>
        </div>
        <div className={`${s.modern__dop_item} ${s.modern__img}`}>
          <img className={s.modern__dop_img} src={modern_3} alt="img" />
          <div className={s.modern__dop_info}>
            <p className={`${s.modern__dop_title} ${s.modern__title}`}>Modern Furniture Collections</p>
            <p className={s.modern__dop_text}>Starting from $<span className={s.modern__main_price}>500</span></p>
            <a className={s.modern__dop_link} href="/#">Read more</a>
          </div>
        </div>
      </div>
    </div>
  )
}
