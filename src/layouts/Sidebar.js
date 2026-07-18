import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  
  // 로컬스토리지에서 로그인된 유저의 권한 등급을 가져옵니다.
  const userRole = localStorage.getItem("userRole");

  return (
    <aside className="sidebar">
      {/* 로고 영역 */}
      <div className="sidebar-brand">
        <h1>Mini MES</h1>
        <p>EV 릴레이 생산라인</p>
      </div>

      {/* 내비게이션 메뉴 목록 */}
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span>대시보드</span>
        </Link>
        
        {/* 💡 기준정보 관리 (제품/BOM) */}
        <Link to="/master-data" className={`nav-item ${location.pathname === "/master-data" ? "active" : ""}`}>
          <span className="material-symbols-outlined">database</span>
          <span>기준정보 관리</span>
        </Link>

        <Link to="/material" className={`nav-item ${location.pathname === "/material" ? "active" : ""}`}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span>자재 관리</span>
        </Link>

        {/* 💡 작업지시 (관리자 전용) */}
        {userRole === "admin" && (
          <Link to="/work-order" className={`nav-item ${location.pathname === "/work-order" ? "active" : ""}`}>
            <span className="material-symbols-outlined">assignment</span>
            <span>작업지시</span>
          </Link>
        )}
        
        {/* [수정 포인트] "생산 관리" -> "생산 모니터링"으로 명칭 변경 및 이동 경로를 /production으로 매핑 */}
        <Link to="/production" className={`nav-item ${location.pathname === "/production" ? "active" : ""}`}>
          <span className="material-symbols-outlined">precision_manufacturing</span>
          <span>생산 모니터링</span>
        </Link>

        {/* 💡 품질 검사 입력 (관리자/사원 공통) */}
        <Link to="/quality-inspection" className={`nav-item ${location.pathname === "/quality-inspection" ? "active" : ""}`}>
          <span className="material-symbols-outlined">fact_check</span>
          <span>품질 검사</span>
        </Link>
        
        <Link to="/quality" className={`nav-item ${location.pathname === "/quality" ? "active" : ""}`}>
          <span className="material-symbols-outlined">verified_user</span>
          <span>품질 관리</span>
        </Link>

        {/* 💡 공지 작성 (관리자 전용) */}
        {userRole === "admin" && (
          <Link to="/admin/notices" className={`nav-item ${location.pathname === "/admin/notices" ? "active" : ""}`}>
            <span className="material-symbols-outlined">campaign</span>
            <span>공지 작성</span>
          </Link>
        )}

        {/* 💡 공지사항 전체보기 (관리자/사원 공통) */}
        <Link to="/notices" className={`nav-item ${location.pathname === "/notices" ? "active" : ""}`}>
          <span className="material-symbols-outlined">notifications</span>
          <span>공지사항</span>
        </Link>

        {/* 💡 내 정보 관리 메뉴 (모든 사원 공통) */}
        <Link to="/mypage" className={`nav-item ${location.pathname === "/mypage" ? "active" : ""}`}>
          <span className="material-symbols-outlined">account_circle</span>
          <span>내 정보 관리</span>
        </Link>

        {/* 💡 사원관리 (관리자 전용) */}
        {userRole === "admin" && (
          <Link to="/admin/employees" className={`nav-item ${location.pathname === "/admin/employees" ? "active" : ""}`}>
            <span className="material-symbols-outlined">manage_accounts</span>
            <span>사원 관리</span>
          </Link>
        )}
      </nav>

      {/* 하단 푸터 고정 영역 */}
      <div className="sidebar-footer">
        <div className="nav-item">
          <span className="material-symbols-outlined">help</span>
          <span>고객지원</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;