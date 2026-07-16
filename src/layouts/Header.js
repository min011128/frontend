import React, { useState } from "react";
// 1. 페이지 이동을 위해 react-router-dom의 useNavigate 훅을 가져옵니다.
import { useNavigate } from "react-router-dom";

// 샘플 알림 데이터
const notificationData = [
  {
    id: 1,
    type: "info",
    title: "정보 SPC2001",
    desc: "SPC 알람 (Stream-A), 파라미터: Sigma+0.5",
    time: "14:40:12",
  },
  {
    id: 2,
    type: "warn",
    title: "경고 SPC0032",
    desc: "라인 B 피드 속도 편차 감지됨",
    time: "14:38:05",
  },
  {
    id: 3,
    type: "error",
    title: "오류 ALM1020",
    desc: "레이저 용접 헤드 #4 과열 (92°C)",
    time: "14:35:59",
  },
  {
    id: 4,
    type: "info",
    title: "정보 COM01",
    desc: "교대 근무 시작: C팀 가동 중",
    time: "14:00:00",
  },
];

const Header = ({ currentTime, onLogout }) => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  
  // 2. 페이지 이동을 위한 navigate 함수 선언
  const navigate = useNavigate();

  const handleLogout = () => {
    // 세션 정보나 로컬스토리지 토큰 삭제 등 로그아웃 처리
    localStorage.removeItem("token"); // 예시: 저장된 토큰 삭제
    sessionStorage.clear();           // 세션 비우기

    if (onLogout) {
      onLogout(); // 부모 컴포넌트에서 전달받은 로그아웃 함수가 있다면 실행
    }

    // 3. 로그인 페이지('/login')로 라우팅 이동
    navigate("/login");

    /* 
      ※ 만약 react-router-dom을 사용하지 않는 일반 HTML 환경이라면,
         위의 navigate("/login") 대신 아래 주석을 풀고 사용하세요.
         window.location.href = "/login";
    */
  };

  return (
    <header className="top-header" style={{ position: "relative" }}>
      <div className="header-left">
        <h2>EV 릴레이 생산 시스템</h2>
      </div>
      <div className="header-right">
        <div className="tcp-status">
          <span className="status-dot glow-pulse"></span>
          <span>TCP 리스너 활성</span>
        </div>
        <span className="current-time">{currentTime}</span>

        <div className="user-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* 알림 토글 버튼 */}
          <button
            type="button"
            onClick={() => setIsNotifyOpen(!isNotifyOpen)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#475569" }}>
              notifications
            </span>
            <span className="notification-badge"></span>
          </button>

          {/* 알림 드롭다운 창 */}
          {isNotifyOpen && (
            <div className="noti-dropdown custom-scrollbar">
              <div className="noti-header">
                <span>시스템 알림</span>
                <span className="noti-count">{notificationData.length}건</span>
              </div>
              <div className="noti-list">
                {notificationData.map((item) => (
                  <div key={item.id} className={`noti-item ${item.type}`}>
                    <div className="noti-item-header">
                      <span className="noti-title">{item.title}</span>
                      <span className="noti-time">{item.time}</span>
                    </div>
                    <p className="noti-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 프로필 이미지 대신 들어간 로그아웃 버튼 */}
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
            title="로그아웃"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease"
            }}
          >
            <span 
              className="material-symbols-outlined" 
              style={{ 
                fontSize: "24px", 
                color: "#64748b" 
              }}
              onMouseEnter={(e) => e.target.style.color = "#dc2626"} // 마우스 올리면 붉은색 포인트
              onMouseLeave={(e) => e.target.style.color = "#64748b"}
            >
              logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;