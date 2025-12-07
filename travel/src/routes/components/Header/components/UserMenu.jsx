import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
        <div className="px-2 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
            <Link to="/map">여행 추가</Link>
        </div>
        <button className="px-2 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
            로그아웃
        </button>
        <div className="w-11 h-11 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            <img 
                src="/user.png" 
                alt="profile" 
                className="brightness-50 contrast-150"
            />
        </div>
    </>
  );
};

export default UserMenu;
