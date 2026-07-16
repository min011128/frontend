import React, { useState } from "react";

// -------------------------------------------------------------
// [데이터 정의]
// -------------------------------------------------------------
const DEPT_OPTIONS = ["경영지원", "생산관리", "생산1팀", "생산2팀", "품질관리", "자재관리"];
const LINE_OPTIONS = ["사무실 (생산 외)", "Line A", "Line B", "Line C"];

const initialEmployees = [
  { id: "admin", name: "admin", email: "1234@gmail.com", dept: "경영지원", phone: "1234", status: "재직중", line: "사무실 (생산 외)", role: "admin" },
  { id: "EMP26001", name: "강석진", email: "sj.kang@medisone.com", dept: "생산관리", phone: "010-1234-5678", status: "재직중", line: "사무실 (생산 외)", role: "admin" },
  { id: "EMP26002", name: "이민아", email: "ma.lee@medisone.com", dept: "생산1팀", phone: "010-2345-6789", status: "재직중", line: "Line A", role: "user" },
  { id: "EMP26003", name: "박지민", email: "jm.park@medisone.com", dept: "생산2팀", phone: "010-3456-7890", status: "재직중", line: "Line B", role: "user" },
  { id: "EMP26004", name: "최유진", email: "yj.choi@medisone.com", dept: "품질관리", phone: "010-4567-8901", status: "재직중", line: "사무실 (생산 외)", role: "user" },
  { id: "EMP26005", name: "김철수", email: "cs.kim@medisone.com", dept: "자재관리", phone: "010-5678-9012", status: "휴직", line: "사무실 (생산 외)", role: "user" },
  { id: "EMP26006", name: "정수민", email: "sm.jung@medisone.com", dept: "생산1팀", phone: "010-6789-0123", status: "재직중", line: "Line A", role: "user" },
];

const STATUS_CLASS = { "재직중": "status-active", "휴직": "status-leave", "퇴직": "status-retired" };

const emptyForm = { id: "", name: "", email: "", dept: DEPT_OPTIONS[0], phone: "", status: "재직중", line: LINE_OPTIONS[0], role: "user" };

// -------------------------------------------------------------
// [CSS 스타일 정의] - 프로젝트 공통 톤(#0566d9 포인트 컬러)에 맞춤
// -------------------------------------------------------------
const styles = `
  .admin-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #334155; padding: 8px; }

  .admin-header-row { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; }
  .admin-title-area h2 { margin: 0; font-size: 22px; color: #0f172a; font-weight: 800; display: flex; align-items: center; gap: 8px; }
  .admin-title-area p { margin: 6px 0 0 0; font-size: 13px; color: #64748b; font-weight: 600; }

  .admin-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .search-box { border: 1px solid #cbd5e1; padding: 9px 14px; border-radius: 8px; font-size: 13px; width: 240px; outline: none; transition: border-color 0.2s; }
  .search-box:focus { border-color: #0566d9; }
  .btn-refresh { background: #ffffff; border: 1px solid #cbd5e1; padding: 9px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; transition: 0.2s; }
  .btn-refresh:hover { background-color: #f1f5f9; }
  .btn-primary { background: #0566d9; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; white-space: nowrap; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-bulk-delete { background: #fee2e2; color: #dc2626; border: none; padding: 9px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; }
  .btn-bulk-delete:hover { background: #fca5a5; }

  .table-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); overflow-x: auto; }
  .emp-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 860px; }
  .emp-table th { background: #f1f5f9; color: #475569; font-weight: 700; font-size: 12px; padding: 14px 16px; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
  .emp-table td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; vertical-align: middle; }
  .emp-table tbody tr:last-child td { border-bottom: none; }
  .emp-table tbody tr:hover td { background: #f8fafc; }
  .emp-id { font-weight: 700; color: #0f172a; }

  .profile-cell { display: flex; align-items: center; gap: 12px; }
  .avatar-circle { width: 36px; height: 36px; border-radius: 50%; background: #e2e8f0; color: #0f172a; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; flex-shrink: 0; }
  .emp-name { font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 6px; }
  .emp-email { font-size: 12px; color: #94a3b8; margin-top: 2px; }

  .badge-admin { background: #dbeafe; color: #0566d9; padding: 2px 7px; border-radius: 6px; font-size: 10px; font-weight: 700; }

  .status-badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; display: inline-block; }
  .status-active { background: #dcfce7; color: #16803d; }
  .status-leave { background: #fef9c3; color: #a16207; }
  .status-retired { background: #f1f5f9; color: #64748b; }

  .btn-menu { background: none; border: none; font-size: 18px; font-weight: 800; color: #64748b; cursor: pointer; padding: 4px 10px; border-radius: 6px; line-height: 1; }
  .btn-menu:hover { background: #f1f5f9; }
  .row-menu { position: absolute; right: 16px; top: 42px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); z-index: 10; min-width: 100px; overflow: hidden; }
  .row-menu-item { padding: 10px 14px; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; white-space: nowrap; }
  .row-menu-item:hover { background: #f1f5f9; }
  .row-menu-item.danger { color: #dc2626; }

  .empty-row td { text-align: center; padding: 40px; color: #94a3b8; font-size: 13px; }

  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .modal-content { background: #ffffff; width: 420px; max-width: 90vw; border-radius: 12px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-height: 88vh; overflow-y: auto; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .modal-header h3 { margin: 0; font-size: 17px; color: #0f172a; }
  .btn-close { background: none; border: none; font-size: 18px; cursor: pointer; color: #64748b; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .form-group label { font-size: 12px; font-weight: 700; color: #334155; }
  .form-group input, .form-group select { padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 13px; background: #ffffff; }
  .form-group input:focus, .form-group select:focus { border-color: #0566d9; }

  .submit-btn { width: 100%; padding: 12px; background: #0566d9; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 13px; margin-top: 6px; }
  .submit-btn:hover { opacity: 0.85; }
`;

function AdminEmployeePage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [form, setForm] = useState(emptyForm);

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      emp.name.toLowerCase().includes(term) ||
      emp.dept.toLowerCase().includes(term) ||
      emp.id.toLowerCase().includes(term)
    );
  });

  const allVisibleSelected =
    filteredEmployees.length > 0 && filteredEmployees.every((emp) => selectedIds.includes(emp.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds(selectedIds.filter((id) => !filteredEmployees.some((emp) => emp.id === id)));
    } else {
      const visibleIds = filteredEmployees.map((emp) => emp.id);
      setSelectedIds([...new Set([...selectedIds, ...visibleIds])]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setSelectedIds([]);
    setOpenMenuId(null);
  };

  const openAddModal = () => {
    setModalMode("add");
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (emp) => {
    setModalMode("edit");
    setForm({ ...emp });
    setOpenMenuId(null);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const generateNextId = () => {
    const nums = employees
      .map((emp) => {
        const match = emp.id.match(/^EMP(\d+)$/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((n) => n !== null);
    const next = nums.length > 0 ? Math.max(...nums) + 1 : 26001;
    return `EMP${next}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.dept) {
      alert("이름과 부서는 필수 입력 항목입니다.");
      return;
    }

    if (modalMode === "add") {
      const newEmp = { ...form, id: generateNextId() };
      setEmployees([...employees, newEmp]);
      alert("신규 사원이 등록되었습니다.");
    } else {
      setEmployees(employees.map((emp) => (emp.id === form.id ? { ...form } : emp)));
      alert("사원 정보가 수정되었습니다.");
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(`사번 ${id}을(를) 삭제하시겠습니까?`)) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      setSelectedIds(selectedIds.filter((v) => v !== id));
    }
    setOpenMenuId(null);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`선택한 ${selectedIds.length}명의 사원을 삭제하시겠습니까?`)) {
      setEmployees(employees.filter((emp) => !selectedIds.includes(emp.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="admin-container" onClick={() => setOpenMenuId(null)}>
      <style>{styles}</style>

      <div className="admin-header-row">
        <div className="admin-title-area">
          <h2>👤 사원 관리 (Employee)</h2>
          <p>총 인원: {employees.length} 명</p>
        </div>

        <div className="admin-toolbar">
          {selectedIds.length > 0 && (
            <button className="btn-bulk-delete" onClick={handleBulkDelete}>
              🗑 선택 삭제 ({selectedIds.length})
            </button>
          )}
          <input
            type="text"
            className="search-box"
            placeholder="이름, 부서, 사번 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-refresh" onClick={handleRefresh}>↻ 새로고침</button>
          <button className="btn-primary" onClick={openAddModal}>+ 신규 등록</button>
        </div>
      </div>

      <div className="table-card">
        <table className="emp-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>
                <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll} />
              </th>
              <th>사번</th>
              <th>프로필 (이름/이메일)</th>
              <th>부서/직책</th>
              <th>연락처</th>
              <th>상태</th>
              <th>담당 라인</th>
              <th style={{ textAlign: "center" }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(emp.id)}
                    onChange={() => toggleSelectOne(emp.id)}
                  />
                </td>
                <td className="emp-id">#{emp.id}</td>
                <td>
                  <div className="profile-cell">
                    <div className="avatar-circle">{emp.name.charAt(0)}</div>
                    <div>
                      <div className="emp-name">
                        {emp.name}
                        {emp.role === "admin" && <span className="badge-admin">관리자</span>}
                      </div>
                      <div className="emp-email">{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td>{emp.dept}</td>
                <td>📞 {emp.phone}</td>
                <td>
                  <span className={`status-badge ${STATUS_CLASS[emp.status]}`}>{emp.status}</span>
                </td>
                <td>{emp.line}</td>
                <td style={{ textAlign: "center", position: "relative" }}>
                  <button
                    className="btn-menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === emp.id ? null : emp.id);
                    }}
                  >
                    ⋯
                  </button>
                  {openMenuId === emp.id && (
                    <div className="row-menu">
                      <div className="row-menu-item" onClick={() => openEditModal(emp)}>✏️ 수정</div>
                      <div className="row-menu-item danger" onClick={() => handleDelete(emp.id)}>🗑 삭제</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr className="empty-row">
                <td colSpan="8">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === "add" ? "신규 사원 등록" : "사원 정보 수정"}</h3>
              <button className="btn-close" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>성명</label>
                <input
                  type="text"
                  name="name"
                  placeholder="실명을 입력하세요"
                  value={form.name}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@medisone.com"
                  value={form.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>연락처</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>소속 부서</label>
                <select name="dept" value={form.dept} onChange={handleFormChange}>
                  {DEPT_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>담당 라인</label>
                <select name="line" value={form.line} onChange={handleFormChange}>
                  {LINE_OPTIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>재직 상태</label>
                  <select name="status" value={form.status} onChange={handleFormChange}>
                    <option value="재직중">재직중</option>
                    <option value="휴직">휴직</option>
                    <option value="퇴직">퇴직</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>시스템 권한</label>
                  <select name="role" value={form.role} onChange={handleFormChange}>
                    <option value="user">일반 오퍼레이터</option>
                    <option value="admin">마스터 관리자</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                {modalMode === "add" ? "새 계정 발급하기" : "변경사항 저장"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEmployeePage;