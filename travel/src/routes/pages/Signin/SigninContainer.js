import React, { useState } from "react";
import SigninPresenter from "./SigninPresenter";
import { useNavigate } from "react-router-dom";

const SigninContainer = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const signin = async () => {
        const { email, password } = form;

        if (!email || !password) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const res = await fetch("/api/v1/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("로그인 실패!");

            const data = await res.json();
            alert(data.message);

            // token 저장
            localStorage.setItem("token", data.data);

            navigate("/");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <SigninPresenter form={form} setForm={setForm} signin={signin} />
    );
};

export default SigninContainer;
