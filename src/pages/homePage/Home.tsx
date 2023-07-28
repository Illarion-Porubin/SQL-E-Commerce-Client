import * as React from 'react';
import { Welcome } from '../../section/welcomeSect/Welcome';
import { Trending } from '../../section/trendungSect/Trending';



export const Home: React.FC = () => {
    return (
        <>
            <Welcome />
            <Trending />
        </>
    )
}