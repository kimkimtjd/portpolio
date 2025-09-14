//const answer = await askQuestion("도로교통법상 자전거 음주운전 처벌은 어떻게 되나요?");
// import { getCookie } from "../utility/admin_function";
import { useAuthStore } from "../stores/authStore";

// 질문 요청 함수
export const askQuestion = async (
  question: string,
  mode: string = "qa",
  targetText?: string , 
  uuid?:string
) => {
  try {
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }
 
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/generate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,   // ✅ JWT 토큰 추가
      },
      body: JSON.stringify({
        question,
        mode,
        target_text: targetText,
        uuid
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("🚨 질문 요청 실패:", err);
      return null;
    }

    const data = await res.json();
    return data.answer; // ✅ answer만 반환
  } catch (error) {
    console.error("🚨 질문 요청 에러:", error);
    return null;
  }
};

