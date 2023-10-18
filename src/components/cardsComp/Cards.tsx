import * as React from 'react';
import s from './Cards.module.scss';
import { StarRating } from '../ratingComp/StarRating';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { cartSlice } from '../../redux/slices/cartSlice';
import { ProductCardType, ProductType } from '../../types/types';
import ProductImage from '../../asets/png/Furniture1.png';
import { selectCartData } from '../../redux/selectos';

interface Props {
    item: ProductCardType
}

export const CardContetn: React.FC<Props> = ({ item }) => {
    const dispatch = useCustomDispatch();
    const [active, setActive] = React.useState<boolean>(false);
    const userProducts = useCustomSelector(selectCartData);
    const findProductInCart = userProducts.data.find((product) => {
        return product.productId === item.id
    })

    const addProductCart = () => {
        setActive(!active)
        const product: ProductType = {
            productId: item.id,
            type: item.type,
            desc: item.desc,
            img: item.img,
            newprice: item.newprice,
            count: 1
        }
        dispatch(cartSlice.actions.addOrder(product))
    }

    return (
        <>
            <div className={s.card__item}>
                <div className={s.card__item_wrap}>
                    <span className={s.card__news}>{item.label}</span>
                    <img className={s.card__main_img} src={item.img ? item.img : ProductImage} alt="armchair" />
                    <div className={s.card__icons}>

                        <span className={s.card__icon_circle}>
                            <svg className={s.card__icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.777 21.1556L3.53614 12.9051C2.44321 11.811 1.82915 10.3271 1.82906 8.77973C1.82897 7.23237 2.44285 5.74836 3.53565 4.65414C4.62845 3.55993 6.11066 2.94516 7.65621 2.94507C9.20175 2.94498 10.684 3.55958 11.777 4.65366C12.8704 3.56081 14.3523 2.94702 15.8974 2.94702C17.4424 2.94702 18.9243 3.56081 20.0178 4.65366C21.1089 5.74865 21.7216 7.2322 21.7216 8.7789C21.7216 10.3256 21.1089 11.8092 20.0178 12.9041L11.777 21.1556ZM7.65607 4.88994C6.88763 4.88991 6.13644 5.11805 5.49752 5.54548C4.8586 5.97292 4.36064 6.58046 4.06663 7.29126C3.77262 8.00206 3.69577 8.78419 3.84579 9.53873C3.99581 10.2933 4.36597 10.9863 4.90945 11.5302L11.777 18.4058L18.6445 11.5302C19.0389 11.1441 19.3467 10.6783 19.5474 10.1638C19.748 9.64933 19.8369 9.09797 19.8082 8.54641C19.7794 7.99486 19.6337 7.45576 19.3806 6.96499C19.1276 6.47422 18.773 6.04303 18.3405 5.70013C17.9081 5.35722 17.4076 5.11046 16.8725 4.97626C16.3374 4.84206 15.7798 4.8235 15.237 4.92182C14.6941 5.02014 14.1784 5.23308 13.7242 5.54647C13.2699 5.85986 12.8876 6.26652 12.6025 6.73937L11.777 8.07345L10.9514 6.73937C10.6106 6.17057 10.1273 5.70085 9.54921 5.37678C8.97116 5.0527 8.31854 4.88555 7.65607 4.89189V4.88994Z" fill="#757575" />
                            </svg>
                        </span>

                        <span className={findProductInCart ? `${s.card__icon_circle} ${s.active}` : s.card__icon_circle} onClick={addProductCart}>
                            <svg className={s.card__icon} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_694)">
                                    <path d="M18.6798 16.1669H17.0611V14.5463C17.0611 14.3314 16.9758 14.1253 16.8241 13.9733C16.6723 13.8213 16.4664 13.736 16.2518 13.736C16.0371 13.736 15.8312 13.8213 15.6795 13.9733C15.5277 14.1253 15.4424 14.3314 15.4424 14.5463V16.1669H13.8237C13.609 16.1669 13.4032 16.2522 13.2514 16.4042C13.0996 16.5562 13.0143 16.7623 13.0143 16.9772C13.0143 17.1921 13.0996 17.3982 13.2514 17.5501C13.4032 17.7021 13.609 17.7875 13.8237 17.7875H15.4424V19.4081C15.4424 19.623 15.5277 19.8291 15.6795 19.981C15.8312 20.133 16.0371 20.2184 16.2518 20.2184C16.4664 20.2184 16.6723 20.133 16.8241 19.981C16.9758 19.8291 17.0611 19.623 17.0611 19.4081V17.7875H18.6798C18.8945 17.7875 19.1003 17.7021 19.2521 17.5501C19.4039 17.3982 19.4892 17.1921 19.4892 16.9772C19.4892 16.7623 19.4039 16.5562 19.2521 16.4042C19.1003 16.2522 18.8945 16.1669 18.6798 16.1669Z" fill="#757575" />
                                    <path d="M17.0611 5.63296H14.6331C14.6331 4.34353 14.1214 3.10691 13.2108 2.19514C12.3001 1.28337 11.0649 0.771149 9.77696 0.771149C8.48904 0.771149 7.25386 1.28337 6.34317 2.19514C5.43247 3.10691 4.92084 4.34353 4.92084 5.63296H2.49279C1.84882 5.63296 1.23124 5.88907 0.775889 6.34495C0.32054 6.80084 0.0647278 7.41915 0.0647278 8.06386L0.0647278 16.1669C0.0660129 17.241 0.49278 18.2708 1.25142 19.0303C2.01005 19.7898 3.03862 20.2171 4.11149 20.2184H11.3957C11.6103 20.2184 11.8162 20.133 11.968 19.9811C12.1197 19.8291 12.205 19.623 12.205 19.4081C12.205 19.1932 12.1197 18.9871 11.968 18.8351C11.8162 18.6832 11.6103 18.5978 11.3957 18.5978H4.11149C3.46753 18.5978 2.84994 18.3417 2.39459 17.8858C1.93925 17.4299 1.68343 16.8116 1.68343 16.1669V8.06386C1.68343 7.84896 1.7687 7.64285 1.92049 7.49089C2.07227 7.33893 2.27813 7.25356 2.49279 7.25356H4.92084V8.87416C4.92084 9.08907 5.00611 9.29517 5.1579 9.44713C5.30968 9.59909 5.51554 9.68447 5.7302 9.68447C5.94485 9.68447 6.15071 9.59909 6.30249 9.44713C6.45428 9.29517 6.53955 9.08907 6.53955 8.87416V7.25356H13.0144V8.87416C13.0144 9.08907 13.0996 9.29517 13.2514 9.44713C13.4032 9.59909 13.6091 9.68447 13.8237 9.68447C14.0384 9.68447 14.2442 9.59909 14.396 9.44713C14.5478 9.29517 14.6331 9.08907 14.6331 8.87416V7.25356H17.0611C17.2758 7.25356 17.4816 7.33893 17.6334 7.49089C17.7852 7.64285 17.8705 7.84896 17.8705 8.06386V12.1154C17.8705 12.3303 17.9558 12.5364 18.1075 12.6883C18.2593 12.8403 18.4652 12.9257 18.6798 12.9257C18.8945 12.9257 19.1004 12.8403 19.2521 12.6883C19.4039 12.5364 19.4892 12.3303 19.4892 12.1154V8.06386C19.4892 7.41915 19.2334 6.80084 18.778 6.34495C18.3227 5.88907 17.7051 5.63296 17.0611 5.63296ZM6.53955 5.63296C6.53955 4.77334 6.88063 3.94892 7.48776 3.34108C8.0949 2.73324 8.91834 2.39175 9.77696 2.39175C10.6356 2.39175 11.459 2.73324 12.0662 3.34108C12.6733 3.94892 13.0144 4.77334 13.0144 5.63296H6.53955Z" fill="#757575" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_694">
                                        <rect width="19.4245" height="19.4472" fill="white" transform="translate(0.0647278 0.771149)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>

                        <span className={s.card__icon_circle} >
                            <svg className={s.card__icon} width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_700)">
                                    <path d="M9.86463 9.43716C10.6251 8.61682 11.5091 8.0002 12.4509 7.57612C15.5807 6.16685 19.3897 6.8941 21.7576 9.59885L23.3933 8.1976C23.4842 8.11975 23.63 8.19177 23.6387 8.31376L24.0455 13.8017C24.0505 13.8931 23.9662 13.9654 23.88 13.9435L18.5301 12.6959C18.4082 12.6652 18.3625 12.513 18.4534 12.4352L20.0858 11.0367C18.5209 9.26495 16.1035 8.67941 13.9755 9.35992C13.171 9.61574 12.4104 10.0479 11.7561 10.6702C10.8566 11.5252 10.2928 12.6217 10.0695 13.7811C9.95173 14.3998 9.34542 14.7954 8.73261 14.6506C8.14944 14.5142 7.78531 13.9369 7.9007 13.3484C8.17247 11.9168 8.82963 10.5546 9.86463 9.43716ZM21.3205 16.4739C21.1032 17.6337 20.5361 18.733 19.6338 19.5848C18.9764 20.2099 18.213 20.6388 17.4145 20.8951C15.2865 21.5756 12.8658 20.9928 11.3042 19.2183L12.9366 17.8198C13.0275 17.742 12.979 17.5866 12.8599 17.5591L7.5072 16.3083C7.4178 16.2892 7.33342 16.3615 7.34169 16.4501L7.7457 21.9348C7.75718 22.06 7.90028 22.1288 7.99115 22.0509L9.62681 20.6497C11.9915 23.3572 15.8033 24.0877 18.9335 22.6724C19.8753 22.2483 20.7565 21.6285 21.5198 20.8114C22.5576 19.6972 23.2147 18.335 23.4865 16.9034C23.5991 16.3116 23.2378 15.7375 22.6546 15.6011C22.0446 15.4596 21.4383 15.8552 21.3205 16.4739Z" fill="#757575" stroke="white" strokeWidth="0.3" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_700">
                                        <rect width="20.9964" height="20.9926" fill="white" transform="matrix(0.649713 0.76018 -0.759427 0.650592 16.8421 0.314331)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </span>

                        <span className={s.card__icon_circle} >
                            <svg className={s.card__icon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_705)">
                                    <path fill="#757575" d="M18.8992 7.69502C17.6439 5.6482 14.7885 2.21414 9.77698 2.21414C4.76547 2.21414 1.91008 5.6482 0.654773 7.69502C0.266711 8.32342 0.0611572 9.04761 0.0611572 9.78641C0.0611572 10.5252 0.266711 11.2494 0.654773 11.8778C1.91008 13.9246 4.76547 17.3587 9.77698 17.3587C14.7885 17.3587 17.6439 13.9246 18.8992 11.8778C19.2873 11.2494 19.4928 10.5252 19.4928 9.78641C19.4928 9.04761 19.2873 8.32342 18.8992 7.69502ZM17.5192 11.0294C16.4412 12.7845 14.001 15.7381 9.77698 15.7381C5.55297 15.7381 3.11278 12.7845 2.03472 11.0294C1.80416 10.6559 1.68204 10.2255 1.68204 9.78641C1.68204 9.34733 1.80416 8.91692 2.03472 8.54341C3.11278 6.78829 5.55297 3.83475 9.77698 3.83475C14.001 3.83475 16.4412 6.78505 17.5192 8.54341C17.7498 8.91692 17.8719 9.34733 17.8719 9.78641C17.8719 10.2255 17.7498 10.6559 17.5192 11.0294Z" />
                                    <path fill="#757575" d="M9.77693 5.73489C8.97655 5.73489 8.19415 5.97251 7.52867 6.4177C6.86318 6.86288 6.3445 7.49564 6.03821 8.23596C5.73192 8.97627 5.65178 9.7909 5.80792 10.5768C5.96407 11.3627 6.34948 12.0846 6.91543 12.6512C7.48138 13.2179 8.20245 13.6037 8.98744 13.7601C9.77244 13.9164 10.5861 13.8362 11.3256 13.5295C12.065 13.2229 12.697 12.7036 13.1417 12.0373C13.5864 11.371 13.8237 10.5877 13.8237 9.7864C13.8224 8.71227 13.3956 7.6825 12.637 6.92297C11.8784 6.16345 10.8498 5.73618 9.77693 5.73489ZM9.77693 12.2173C9.2967 12.2173 8.82726 12.0747 8.42797 11.8076C8.02868 11.5405 7.71747 11.1609 7.53369 10.7167C7.34992 10.2725 7.30184 9.7837 7.39552 9.31216C7.48921 8.84061 7.72046 8.40746 8.06003 8.06749C8.3996 7.72752 8.83224 7.496 9.30324 7.40221C9.77423 7.30841 10.2624 7.35655 10.7061 7.54054C11.1498 7.72453 11.529 8.0361 11.7958 8.43586C12.0626 8.83562 12.205 9.30561 12.205 9.7864C12.205 10.4311 11.9492 11.0494 11.4938 11.5053C11.0385 11.9612 10.4209 12.2173 9.77693 12.2173Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_705">
                                        <rect width="19.4245" height="19.4472" fill="white" transform="translate(0.0647278 0.0628052)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </div>
                </div>
                <div className={s.card__item_desc}>
                    <p className={s.card__item_title}>{item.type}</p>
                    <p className={s.card__item_text}>{item.desc}</p>
                    <div className={s.card__info_price}>
                        <div className={s.card__price_block}>
                            <p className={s.card__price_new}>$<span>{item.newprice}</span></p>
                            <p className={s.card__price_old}>$<span>{item.oldprice}</span></p>
                        </div>
                        <div>
                            <StarRating starRating={item.Ratings} productId={item.id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface PropsProduct {
    products: any
}

export const Cards: React.FC<PropsProduct> = ({ products }) => {

    return (
        <div className={s.card}>
            <div className={s.card__content}>
                {
                    products.isLoading === "loaded" && products.data.length
                        ?
                        products.data.map((item: any, i: number) => (
                            <CardContetn item={item} key={item.desc + i} />
                        ))
                        :
                        null
                }
            </div>
        </div>
    )
}