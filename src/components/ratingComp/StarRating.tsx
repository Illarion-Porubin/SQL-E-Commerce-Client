import * as React from 'react';
import s from './StarRating.module.scss';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { fetchAddRating } from '../../redux/slices/productSlice';
import { selectAuthData, selectProductData } from '../../redux/selectos';

interface Props {
    starRating: number[],
    productId: number
}


export const StarRating: React.FC<Props> = ({ starRating, productId }) => {
    const dispatch = useCustomDispatch();
    const [hover, setHover] = React.useState<number>(0);
    const user = useCustomSelector(selectAuthData);
    const products = useCustomSelector(selectProductData);

    // console.log(products, 'products')

    const totalRating = starRating.reduce((sum: number, item: { rating: number } | any) => {
        return sum + item.rating
    }, 0)

    const checkRating = totalRating >= 2500 ? 5 : Math.round((totalRating / 5) / 100)

    const addRating = (value: number) => {
        if (user.data?.user.email && user.data?.user.isActivated) {
            const newRating = {
                ProductId: productId,
                UserId: user.data?.user.id,
                rating: value
            }
            dispatch(fetchAddRating(newRating))
        }
        else {
            alert("Авторизируйтесь на сайте")
        }
    }

    return (
        <>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <label
                        key={i}
                        onClick={() => addRating(Number(`${i + 1}00`))}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <input type="radio" name="rating" value={ratingValue} />
                        <svg className={ratingValue <= (hover || checkRating) ? `${s.star} ${s.active}` : s.star}
                            width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" stroke="#7AC751" strokeWidth="1.2" d="M3.62609 3.85757L3.93345 3.81496L4.07632 3.5395L5.36119 1.06219C5.36121 1.06215 5.36123 1.06211 5.36125 1.06207C5.3628 1.0591 5.36356 1.05854 5.36316 1.05896C5.36289 1.05924 5.36309 1.05891 5.36449 1.05812C5.368 1.05615 5.37763 1.05235 5.39231 1.05239C5.40705 1.05244 5.41757 1.05634 5.42225 1.05899L5.42422 1.06025L5.42465 1.06062L5.42469 1.06066L5.42486 1.06088L5.42616 1.06306L5.42618 1.06309L6.71058 3.5395L6.85344 3.81496L7.16081 3.85757L10.0358 4.25615L10.0362 4.2562C10.039 4.25659 10.0414 4.25703 10.0435 4.25748L7.97869 6.17083L7.73763 6.3942L7.79607 6.71761L8.28531 9.42531C8.27796 9.42979 8.26911 9.43276 8.2608 9.43348C8.25365 9.43411 8.24541 9.43341 8.23374 9.42757L8.23365 9.42752L5.66171 8.14197L5.39345 8.00789L5.12519 8.14197L2.55325 9.42752L2.5514 9.42845C2.53995 9.43422 2.53219 9.4348 2.52564 9.43423C2.51763 9.43354 2.50884 9.43059 2.50146 9.42597L2.99083 6.71761L3.04927 6.3942L2.8082 6.17083L0.74338 4.25748C0.745483 4.25703 0.747909 4.25659 0.750685 4.2562L0.751103 4.25615L3.62609 3.85757ZM8.28804 9.44028L8.87846 9.3336C8.96701 9.82574 8.42193 10.1925 7.96539 9.96421L8.28804 9.44028Z" />
                        </svg>
                    </label >
                )

            })}
        </>
    )
}  