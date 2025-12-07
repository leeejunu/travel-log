import React, { useState } from "react";
import SignupPresenter from "./SignupPresenter";
import { useNavigate } from "react-router-dom";

/* 
    하나의 페이지를 Container와 Presenter로 분리하고 각 역할은 아래와 같다

    * Container: 백엔드에서 데이터를 불러와 state 관리, 로직을 담당하는 함수 선언
    * Presenter: 불러온 데이터를 토대로 페이지에 출력, 함수 사용
*/
const SignupContainer = () => {
    
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [checkEmailMessage, setCheckEmailMessage] = useState({
      color: "",
      message: ""
    });

    const navigate = useNavigate();

     const checkEmail = async () => {
      const {email} = form;
      try {
        const res = await fetch("/api/v1/auth/check-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email}),
        });

        const data = await res.json();

        if (data.data) {
                setCheckEmailMessage({
                    color: "green",
                    message: data.message
                });
              } 
            
        else {
            setCheckEmailMessage({
                color: "red",
                message: data.message
            });
          }
      }catch(err) {
        console.log(err.message)
      }
    }

    const signup = async () => {
        const { email, password, confirmPassword } = form;

        if (!email || !password || !confirmPassword) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("회원가입 실패");

            const data = await res.json();
            alert(`🎉 ${email}님, 회원가입이 완료되었습니다!`);

            navigate("/signin");

        } catch (err) {
            alert(err.message);
        }
    };

  return(
    <SignupPresenter
      form={form}
      setForm={setForm}
      signup={signup}
      checkEmail={checkEmail}
      checkEmailMessage={checkEmailMessage}
    />
  )
}

export default SignupContainer;