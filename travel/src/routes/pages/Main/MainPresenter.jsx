import React from "react";
import { Header } from "../../components/Header";
// /*
//     css를 불러올 때는 아래와 같이 불러오면 된다.
//     css는 따로 css파일을 만들어 사용하는게 관리하기가 편하다.
// */
// import './MainPresenter.css';
// import { Map } from "react-kakao-maps-sdk";

// /* 
//     하나의 페이지를 Container와 Presenter로 분리하고 각 역할은 아래와 같다

//     * Container: 백엔드에서 데이터를 불러와 state 관리, 로직을 담당하는 함수 선언
//     * Presenter: 불러온 데이터를 토대로 페이지에 출력, 함수 사용
// */
// /*
//     ※ 컴포넌트 이름(함수 이름)은 무조건 대문자로 시작해야 함!! ※
//       만약 소문자로 시작한다면 컴포넌트를 출력할 수 없으므로 반드시 주의해서 작성할 것
// */
// const MainPresenter = () => {
//     /*
//         Presenter에서는 단순히 받아온 데이터를 어떻게 보여줄 것인지만 표현한다.

//         * 물론 예외는 있다.
//     */


//     /*
//         Presenter 작성 팁

//         !: 특정 조건일 때만 해당 요소를 보여줘야 하는 경우 아래와 같이 작성하면 깔끔하게 작성할 수 있다.
//             ex) 모달을 보여주는 state이름을 isModal이라고 가정한다.
//             {
//                 isModal && 
//                 <div className="modal">
//                     모달 내용
//                 </div>
//             }
//             * 이는 isModal이 true일 경우에만 div의 내용을 띄운다는 의미이다.

//         !!: 조건에 따라 다른 요소를 보여줘야 하는 경우 아래와 같이 작성하면 깔끔하게 작성할 수 있다.
//             ex) isUser가 true이면 회원 페이지를 보여주고 false이면 비회원 페이지를 보여주는 경우
//             {
//                 isUser ?
//                 <div className="user-page">
//                     회원 페이지 내용
//                 </div>
//                 :
//                 <div className="non-user-page">
//                     비회원 페이지 내용
//                 </div>
//             }
//             * 이는 isUser가 true면 : 앞에 있는 내용을 보여주고 false면 : 아래의 내용을 보여준다.

//         !!!: 접근 연산자(.)사용 시 주의할 점은 해당 멤버(속성)가 undefined인 경우(완전히 없는 경우) 오류가 난다.
//             이 때 아래와 같이 작성하면 없는 경우에도 오류가 나지 않고 넘어갈 수 있다.
//             ex) user객체에 있는 email 멤버(속성)에 접근 할 경우
//                 user?.email
//             위와 같이 작성하면 해당 멤버(속성)가 있는 경우에만 그에 맞는 데이터를 보여준다.
//     */
//     return (
//       <div className="main-container">
//             <Map
//                 center={{ lat: 37.5642135, lng: 127.0016985 }}
//                 style={{ width: '100%', height: '100%' }}
//                 level={13}
//             /> 
//       </div>
//     )
// }
const MainPresenter = () => {
    const dummyRooms = [
        {
            id: 1,
            title: "서울 전망이 멋진 아파트",
            location: "서울, 한국",
            price: "₩120,000 / 박",
            img: "https://source.unsplash.com/random/400x300?room"
        },
        {
            id: 2,
            title: "아늑한 한옥 게스트하우스",
            location: "전주, 한국",
            price: "₩80,000 / 박",
            img: "https://source.unsplash.com/random/400x300?house"
        },
        {
            id: 3,
            title: "바다가 보이는 휴양 숙소",
            location: "부산, 한국",
            price: "₩150,000 / 박",
            img: "https://source.unsplash.com/random/400x300?beach"
        },
        {
            id: 4,
            title: "조용한 숲속 힐링 스테이",
            location: "양평, 한국",
            price: "₩95,000 / 박",
            img: "https://source.unsplash.com/random/400x300?forest"
        },{},{},{},{},{}
    ];
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Header />

            <div className="w-full mx-auto px-6 py-6">
                <h2 className="text-xl font-bold mb-3">여행 목록</h2>

                {/* Horizontal Scroll List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols- lg:grid-cols-7 gap-6">
                    {dummyRooms.map((room) => (
                        <div
                            key={room.id}
                            className="min-w-[200px] min-h-[200px] bg-white rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                            {/* Image Wrapper */}
                            <div className="relative">
                                <img
                                    className="w-full h-full object-cover rounded-3xl"
                                />

                                {/* Tag */}
                                <span className="absolute top-2 left-2 bg-white text-[10px] px-2 py-1 rounded-full shadow">
                                    게스트 선호
                                </span>

                                {/* Heart Icon */}
                                <button className="absolute top-2 right-2 bg-white/70 backdrop-blur p-1.5 rounded-full hover:bg-white">
                                    ❤️
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default MainPresenter;