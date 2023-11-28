import * as React from 'react';
import s from './Modal.module.scss';

interface Props {
    setModalActive: (value: boolean) => void,
    modalActive: boolean,
}
export const Modal: React.FC<Props> = ({ modalActive, setModalActive }) => {
    return (
        <>
            <div className={modalActive ? `${s.modal} ${s.active}` : s.modal} onClick={() => setModalActive(false)}>
                <div className={modalActive ? `${s.modal__content} ${s.active}` : s.modal__content} onClick={(e) => e.stopPropagation()}>
                    <div className={s.modal__drop_label_list}>
                        <label htmlFor="add-label"></label>
                        <select name="label" id="add-label">
                            <option value="">Выберите маркировку</option>
                            <option value="top">Top</option>
                            <option value="new">New</option>
                            <option value="hot">Hot</option>
                            <option value="hit">Hit</option>
                            <option value="best">Best</option>
                            <option value="today">Today</option>
                        </select>
                    </div>
                    <div className={s.modal__img_wrap}>
                        <img className={s.modal__img} src="https://blokartopt.ru/tpl/img/no-foto.jpg" alt="img" />
                    </div>
                    <div className={s.modal__drop_category_list}>
                        <label htmlFor="add-label"></label>
                        <select name="label" id="add-label">
                            <option value="">Выберите маркировку</option>
                            <option value="top">Top</option>
                            <option value="new">New</option>
                            <option value="hot">Hot</option>
                            <option value="hit">Hit</option>
                            <option value="best">Best</option>
                            <option value="today">Today</option>
                        </select>
                    </div>
                    <input
                        className={s.modal__title_input}
                        type="text"
                        placeholder='Title'
                    />
                    <div className={s.modal__inputs}>
                        <input className={s.modal__input}
                            type="number"
                            placeholder='Price'
                            min="1" 
                        />
                        <input className={s.modal__input}
                            type="number"
                            placeholder='Rating'
                            min="1" max="5000"
                        />
                    </div>
                    <button className={s.modal__btn}>Добавить</button>
                </div>
            </div>
        </>
    )
}