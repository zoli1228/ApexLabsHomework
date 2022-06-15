
import React, { useContext } from 'react';
import { HeadingCtx } from '../Context';
import SearchBar from './SearchBar';
import '../style/heading.css'


const Heading = {
    Main: () => {
        const { heading } = useContext(HeadingCtx);
        return (
            <>
                <div className='Heading'>
                    <h1>{heading.mainHeading}</h1>
                    <SearchBar />
                </div>
            </>

        )
    },
    SubHeading: (props) => {
        const { heading } = useContext(HeadingCtx)
        if (heading?.subHeading && !props.text) {
            return (
                <div className='heading'>
                    <h1>{heading.subHeading}</h1>
                </div>
            )
        }
        return (
            <div className='heading'>
                <h1>{props.text}</h1>
            </div>
        )
        return
    }
}

export default Heading