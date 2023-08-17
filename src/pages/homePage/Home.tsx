import * as React from 'react';
import { Welcome } from '../../section/welcomeSect/Welcome';
import { Trending } from '../../section/trendungSect/Trending';
import { Products } from '../../section/productsSect/Products';
import { Articles } from '../../section/articlesSect/Articles';




export const Home: React.FC = () => {
    

    return (
        <>
            <Welcome />
            <Trending />
            <Products />
            {/* <Articles /> */}
        </>
    )
}