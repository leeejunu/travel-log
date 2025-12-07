import React from "react";

const SigninPresenter = ({ form, setForm, signin }) => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 pb-2">로그인</h1>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                {/* Login Button */}
                <button
                    onClick={signin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                >
                    로그인
                </button>

                {/* Footer */}
                <div className="text-center mt-4 text-sm text-gray-600">
                    계정이 없으신가요?{" "}
                    <a href="/signup" className="text-blue-500 font-semibold hover:underline">
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SigninPresenter;
