import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { Map } from "./Map";

const Router = () => {

    return (
        <div className="w-full h-full">
            <Routes>
                {/*예시*/}
                {/* <Route path="경로" element={</>}> */}
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/map" element={<Map/>}/>
            </Routes>
        </div>
    )
}

export default Router;