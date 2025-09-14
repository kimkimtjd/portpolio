import { FlexRowStartCenter } from "../css/common";
// import { useLocation } from "react-router-dom";
import Logo_white from "../assets/common/logo_white.png";
import Logo_black from "../assets/common/logo_black.png";
import { useAuthStore } from "../stores/authStore";

const Header = () => {
  // const location = useLocation(); // 현재 주소 정보 가져오기
  const adminstate = useAuthStore((state) => state.adminstate); // ✅ 여기서 불러옴
  
  // 현재 경로가 "/"인지 확인
  const isRoot = location.pathname === "/register";

  return (
    <FlexRowStartCenter
      style={{
        height: "60px",
        position: "fixed",
        top: 0,
        width: "100%",
        borderBottom: adminstate === 0 || isRoot ? "1px solid white" : "1px solid white", // 루트 경로일 때만 흰색 밑줄
        backgroundColor: adminstate === 0  || isRoot ? "transparent" : "transparent",    // 예시: 루트가 아니면 배경 흰색
      }}
    >
      <img
        src={adminstate === 0  || isRoot ? Logo_white : Logo_black} // 경로에 따라 로고 변경
        style={{ height: "25px" , marginLeft:"20px" }}
      />
    </FlexRowStartCenter>
  );
};

export default Header;
