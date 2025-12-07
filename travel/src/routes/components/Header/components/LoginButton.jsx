import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <>
        <div className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
            <Link to="/signin">로그인</Link>
        </div>
        <div className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
            <Link to="/signup">회원가입</Link>
        </div>
    </>
  );
};

export default LoginButton;