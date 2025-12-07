import React from "react";
import { Link } from "react-router-dom";

const SignupPresenter = ({ form, setForm, signup, checkEmail, checkEmailMessage }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 pb-2">회원가입</h1>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={checkEmail}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {checkEmailMessage.message && (
            <p
              className={`text-sm mt-1 ${
                checkEmailMessage.color === "red" ? "text-red-500" : "text-green-500"
              }`}
            >
              {checkEmailMessage.message}
            </p>
          )}
        </div>

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Confirm Password */}
        <input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호 확인"
          required
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Signup button */}
        <button
          onClick={signup}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          회원가입
        </button>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-600">
          이미 계정이 있나요?{" "}
          <Link to="/signin" className="text-blue-500 font-semibold hover:underline">
            로그인
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignupPresenter;
