// import { useAuthStore } from "../stores/authStore";
import { getCookie } from "../utility/admin_function";
// import { useNavigate } from "react-router-dom";

  
// 회원가입 함수 예제
export const registerUser = async (formData: FormData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register/`, {
      method: "POST",
      body: formData,  // JSON.stringify 금지
      // headers 생략! 브라우저가 자동으로 multipart/form-data 설정
    });

    const data = await res.json();
    console.log(data)
    if (res.ok) {
      console.log("✅ 회원가입 성공", data);
      alert(`${data.name}님, 회원가입이 완료되었습니다.`);
    } else {
      //alert("회원가입 실패: " + JSON.stringify(data.message));
      alert(data.message)
    }
  } catch (error) {
    console.error("회원가입 요청 에러", error);
    alert("회원가입 요청 중 에러가 발생했습니다.");
  }
};

export const checkLogin = async (setLogin: any, navigate: (path: string) => void) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auto_login/`, {
      method: "POST",
      body: JSON.stringify({ refresh_token: getCookie("token") }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    
    const data = await res.json();
    if (res.ok && data.email) {
      setLogin({
        email: data.email,
        name: data.name,
        is_active:data.is_active,
        accessToken: data.access_token,
        refreshToken: null,
      });
      navigate("/"); // 로그인 성공 시 홈으로 이동
    }
    else{
      navigate("/register"); // 로그인 성공 시 홈으로 이동  
      setLogin(null);
    }
  } catch (err) {
    console.error("자동 로그인 실패", err);
  }
};