import React, { useEffect, useState } from "react";
import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, [])

    return(
        <HeaderPresenter token={token}/>
    )
}

export default HeaderContainer;