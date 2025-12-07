import React from "react";
import { Search } from "lucide-react";
import LoginButton from "./components/LoginButton";
import UserMenu from "./components/UserMenu";

const HeaderPresenter = ({token}) => {
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7x mx-auto px-6 h-20 flex items-center justify-between">

                {/* Left - Logo */}
                <div className="text-2xl font-bold text-red-500 cursor-pointer">
                    Travel
                </div>

                {/* Middle - Search bar */}
                <div className="hidden md:flex items-center gap-4 border rounded-full shadow-sm px-4 py-2 cursor-pointer hover:shadow-md transition">
                    <span className="text-sm font-medium">어디든지</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm font-medium">언제든지</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-600">게스트 추가</span>
                    <div className="bg-red-500 text-white p-2 rounded-full">
                        <Search size={16} />
                    </div>
                </div>

                {/* Right - Menu */}
                <div className="flex items-center gap-2 pr-2">

                    {/* 마이페이지 */}
                    {/* 
                    <button className="px-2 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                        여행지 추가
                    </button>
                    
                    {/* 로그인 
                    <button className="px-2 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                        <Link to="/signin">로그인</Link>
                    </button>
                    */}

                    {token ? <UserMenu/> : <LoginButton/>}

                    {/* Profile Icon */}
                </div>
            </div>
        </header>
    );
};

export default HeaderPresenter;