import React, { useEffect } from 'react';

export const ScrollToTop = ({children}) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },[]);

    return children;
}