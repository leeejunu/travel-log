import React, { useEffect, useRef, useState } from "react";
import { Map, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";


const MapPresenter = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [course, setCourse] = useState([]); // 장소 + 이미지 포함한 코스 데이터

    const navigate = useNavigate();
    const placesRef = useRef(null);
    const mapRef = useRef(null);

    // -------------------------------
    // Kakao Places 로딩
    // -------------------------------
    useEffect(() => {
        if (window.kakao) {
            placesRef.current = new window.kakao.maps.services.Places();
        }
    }, []);

    // -------------------------------
    // 장소 검색
    // -------------------------------
    const searchPlace = () => {
        if (!keyword.trim()) return;

        placesRef.current.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setResults(data);
            }
        });
    };

    // -------------------------------
    // 장소 선택 → 지도 이동
    // -------------------------------
    const handleSelectPlace = (place) => {
        setSelectedPlace(place);

        if (mapRef.current) {
            const center = new window.kakao.maps.LatLng(place.y, place.x);
            mapRef.current.panTo(center);
            mapRef.current.setLevel(5);
        }
    };

    // -------------------------------
    // 선택한 장소를 코스에 추가
    // -------------------------------
    const saveCourse = () => {
        if (!selectedPlace) return;

        const newPoint = {
            name: selectedPlace.place_name,
            lat: parseFloat(selectedPlace.y),
            lng: parseFloat(selectedPlace.x),
            images: [] // 장소별 이미지 배열
        };

        setCourse((prev) => [...prev, newPoint]);
    };

    // -------------------------------
    // 장소 삭제
    // -------------------------------
    const removeCourse = (courseIndex) => {
        setCourse(prev => prev.filter((_, idx) => idx !== courseIndex));
    };

    // -------------------------------
    // 이미지 업로드
    // -------------------------------
    const handleImageUpload = (e, courseIndex) => {
        const files = Array.from(e.target.files);

        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));

        setCourse(prev => {
            const updated = [...prev];
            updated[courseIndex].images = [...updated[courseIndex].images, ...newImages];
            return updated;
        });
    };

    // -------------------------------
    // 이미지 삭제
    // -------------------------------
    const removeImage = (courseIndex, imgIndex) => {
        setCourse(prev => {
            const updated = [...prev];
            updated[courseIndex].images = updated[courseIndex].images.filter((_, i) => i !== imgIndex);
            return updated;
        });
    };

    // -------------------------------
    // 전체 코스 저장
    // -------------------------------
    const saveTotalCourse = async () => {
        if (course.length === 0) {
            alert("저장할 코스가 없습니다!");
            return;
        }

        const payload = {
            title: "나의 여행 코스", 
            places: course.map((spot, idx) => ({
                order: idx + 1,
                name: spot.name,
                lat: spot.lat,
                lng: spot.lng,
                images: spot.images.map(img => img.name)
            }))
        };

        console.log("저장됨:", payload);

        alert("여행 코스 저장 완료!");

        // 서버 저장 예시
        // await fetch("/api/v1/course/save", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(payload),
        // });

        // navigate("/");  // 저장 후 메인 이동
    };

    return (
        <>
            <div className="w-full h-screen flex relative overflow-hidden">

                {/* 메인으로 */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-5 left-4 z-30 bg-white shadow-lg rounded-full px-4 py-2 text-sm"
                >
                    메인으로
                </button>

                {/* 검색 열기 */}
                <button
                    className="absolute top-5 left-32 z-30 bg-white shadow-lg rounded-full px-4 py-2 text-sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "닫기" : "검색 열기"}
                </button>

                {/* ---------------------- 사이드바 ---------------------- */}
                <div
                    className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-all duration-300 
                    ${sidebarOpen ? "w-80" : "w-0 overflow-hidden"}`}
                >
                    {sidebarOpen && (
                        <button
                            className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full shadow flex items-center justify-center"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ✕
                        </button>
                    )}

                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">장소 검색</h2>

                        {/* 검색창 */}
                        <div className="flex gap-2 mb-4">
                            <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="검색어 입력"
                                className="border p-2 rounded-lg flex-1"
                            />
                            <button
                                onClick={searchPlace}
                                className="bg-red-500 text-white px-4 rounded-lg"
                            >
                                검색
                            </button>
                        </div>

                        {/* 검색 결과 */}
                        <div className="overflow-auto max-h-[40vh]">
                            {results.map((place) => (
                                <div
                                    key={place.id}
                                    className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectPlace(place)}
                                >
                                    <p className="font-semibold">{place.place_name}</p>
                                    <p className="text-xs text-gray-500">{place.address_name}</p>
                                </div>
                            ))}
                        </div>

                        {/* 장소 상세 */}
                        {selectedPlace && (
                            <div className="mt-4 p-3 border rounded-xl">
                                <h3 className="font-bold">{selectedPlace.place_name}</h3>
                                <p className="text-sm text-gray-600">{selectedPlace.address_name}</p>

                                <button
                                    onClick={saveCourse}
                                    className="w-full bg-red-500 text-white mt-3 py-2 rounded-lg"
                                >
                                    코스에 추가
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ---------------------- 지도 영역 ---------------------- */}
                <div className={`transition-all duration-300 flex-1 ${sidebarOpen ? "ml-80" : "ml-0"}`}>
                    <Map
                        center={{ lat: 37.5665, lng: 126.9780 }}
                        style={{ width: "100%", height: "100%" }}
                        level={8}
                        ref={mapRef}
                    >

                        {/* 🔴 번호 마커 (CustomOverlayMap) */}
                        {course.map((spot, idx) => (
                            <CustomOverlayMap
                                key={idx}
                                position={{ lat: spot.lat, lng: spot.lng }}
                                yAnchor={1}
                            >
                                <div className="relative flex flex-col items-center">
                                    <div
                                        className="
                                            w-8 h-8 flex items-center justify-center 
                                            bg-red-500 text-white font-bold text-xs
                                            rounded-full shadow-lg border-2 border-white
                                        "
                                    >
                                        {idx + 1}
                                    </div>

                                    {/* 장소 삭제 */}
                                    <button
                                        onClick={() => removeCourse(idx)}
                                        className="text-[10px] mt-1 bg-gray-200 px-1 py-0.5 rounded hover:bg-gray-300"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </CustomOverlayMap>
                        ))}

                        {/* 점선 Polyline */}
                        {course.length > 1 && (
                            <Polyline
                                path={course.map((spot) => ({
                                    lat: spot.lat,
                                    lng: spot.lng,
                                }))}
                                strokeWeight={4}
                                strokeColor="#FF385C"
                                strokeOpacity={0.9}
                                strokeStyle="dash"
                                strokeDashArray={[8, 8]}
                            />
                        )}
                    </Map>

                    {/* ---------------------- 여행 코스 리스트 ---------------------- */}
                    <div
                        className="
                            absolute top-24 right-4 z-30 w-72 max-h-[70vh] overflow-auto 
                            bg-white shadow-xl rounded-2xl p-4
                        "
                    >
                        <h3 className="text-lg font-bold mb-3">여행 코스</h3>

                        {course.length === 0 && (
                            <p className="text-sm text-gray-500">추가된 장소가 없습니다.</p>
                        )}

                        {course.map((spot, courseIndex) => (
                            <div key={courseIndex} className="mb-6 border-b pb-4">

                                {/* 장소 번호 + 이름 + 삭제 */}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-sm">
                                        {courseIndex + 1}. {spot.name}
                                    </span>
                                    <button
                                        onClick={() => removeCourse(courseIndex)}
                                        className="text-xs text-red-500 hover:text-red-700"
                                    >
                                        삭제
                                    </button>
                                </div>

                                {/* 이미지 미리보기 */}
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {spot.images.map((img, imgIndex) => (
                                        <div key={imgIndex} className="relative">
                                            <img
                                                src={img.url}
                                                alt=""
                                                className="w-full h-20 object-cover rounded-lg"
                                            />

                                            {/* 이미지 삭제 */}
                                            <button
                                                onClick={() => removeImage(courseIndex, imgIndex)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white 
                                                w-5 h-5 text-[10px] rounded-full flex items-center justify-center"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* 사진 추가 */}
                                <label
                                    className="
                                        w-full h-20 border border-gray-300 flex items-center justify-center 
                                        rounded-lg text-sm text-gray-500 cursor-pointer hover:bg-gray-100
                                    "
                                >
                                    + 사진 추가
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, courseIndex)}
                                    />
                                </label>
                            </div>
                        ))}
                        <button
                            onClick={saveTotalCourse}
                            className="w-full bg-red-500 text-white py-3 mt-2 rounded-xl shadow-md hover:bg-red-600 transition"
                        >
                            전체 코스 저장하기
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default MapPresenter;
