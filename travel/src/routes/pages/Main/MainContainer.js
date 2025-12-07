import MainPresenter from "./MainPresenter";


/* 
      하나의 페이지를 Container와 Presenter로 분리하고 각 역할은 아래와 같다

      * Container: 백엔드에서 데이터를 불러와 state 관리, 로직을 담당하는 함수 선언
      * Presenter: 불러온 데이터를 토대로 페이지에 출력, 함수 사용
*/
const MainContainer = () => {

    return (
        <MainPresenter />
    )
}

export default MainContainer;