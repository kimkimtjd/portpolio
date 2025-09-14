import { useEffect , useState } from "react";
import { FlexColumnAllCenter, FlexRowAllCenter , FlexColumnStartStart , FlexRowEndCenter} from "../css/common";
import styled from "styled-components";
import Kakao from "../assets/sns/kakao.png";
import Naver from "../assets/sns/naver.png";
import Google from "../assets/sns/google.png";
import { useAuthStore } from "../stores/authStore";
import { registerUser , checkLogin } from "../server/admin";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Kakao: any;
    google: any;
    naver: any;
  }
}
const initialInfo = {
    cate: "일반행정사",
    email: "",
    name: "",
    birth: "",
    phone: "",
    type: 0,
    image: null as File | null,
  };

const Login = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAdminState = useAuthStore((state) => state.setAdminState);
  const adminstate = useAuthStore((state) => state.adminstate);
  const navigate = useNavigate();
  const [info, setInfo] = useState(initialInfo);
  const [naverAuthCode, setNaverAuthCode] = useState<string | null>(null);

  // 카카오 SDK 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
        console.log("✅ Kakao SDK Initialized");
      }
    };
    document.head.appendChild(script);
  }, []);

  // 구글 SDK 로드
  useEffect(() => {
    const scriptId = "google-oauth";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // 네이버 SDK 로드
  useEffect(() => {
    const scriptId = "naver-oauth";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Naver SDK Initialized");
    };
    document.head.appendChild(script);
  }, []);

   useEffect(() => {
    // URL에서 인증 코드 확인
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = urlParams.get('provider');
    
    // 네이버 로그인 응답인 경우
    if (provider === 'naver' && code) {
      setNaverAuthCode(code);
      handleNaverCallback(code);
    }
  }, []);

  useEffect(() => {
     checkLogin(setLogin, navigate); 
  }, [isLoggedIn]);

  const handleNaverCallback = async (code: string) => {
    try {
      // 서버에 코드 전송하여 액세스 토큰 및 사용자 정보 요청
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/naver/callback/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const email = data.email;
        
        setInfo((prev) => ({ ...prev, email: email, type: 1 }));
        loginWithBackend(email);
      } else {
        alert("네이버 로그인 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("네이버 콜백 처리 실패:", error);
      alert("네이버 로그인 처리 중 오류가 발생했습니다.");
    }
  };

  
  const loginWithBackend = async (email: string) => {
    if (!email) return alert("이메일을 가져올 수 없습니다.");
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      if (data.message === "존재하지 않는 계정") {
        setAdminState(1)
      } 
      else {
        setLogin({
          email: data.email,
          name: data.name,
          is_active:data.is_active,
          accessToken: data.access_token,
          refreshToken: null,
        });
        // 유효기간은 하루로 설정
        document.cookie = `token=${data.refresh_token}; path=/; samesite=Lax; secure=false; max-age=${60 * 60 * 24}`;
        // checkLogin();
      }
    } else {
      alert(data.error || "로그인 실패");
    }
  };

  const handleKakaoLogin = async () => {
    window.Kakao.Auth.login({
      scope: "account_email",
      success: function (authObj: any) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: async function (res: any) {
            try {
              const email = res.kakao_account.email;
              setInfo((prev) => ({ ...prev, email: email , type:0 }));
              loginWithBackend(email);
            } catch (error) {
              console.error("❌ 로그인 실패:", error);
            }
          },
          fail: function (error: any) {
            console.error("사용자 정보 요청 실패", error);
            alert("사용자 정보 요청에 실패했습니다.");
          },
        });
      },
      fail: function (err: any) {
        console.error("❌ 로그인 실패:", err);
        alert("카카오 로그인에 실패했습니다.");
      },
    });
  };

  const handleGoogleLogin = () => {
    try {
      const client = (window as any).google.accounts.oauth2;
      if (!client) {
        alert("Google SDK가 아직 로드되지 않았습니다.");
        return;
      }
      client.initTokenClient({
        client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        scope: 'email profile openid',
        callback: async (tokenResponse: any) => {
          try {
            const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            });
            const userInfo = await userInfoRes.json();
            const email = userInfo.email;
            setInfo((prev) => ({ ...prev, email: email , type:2}));
            loginWithBackend(email);

          } catch (error) {
            console.error("구글 사용자 정보 가져오기 실패", error);
            alert("로그인에 실패했습니다.");
          }
        },
      }).requestAccessToken();
    } catch (error) {
      console.error("Google 로그인 오류", error);
      alert("Google 로그인에 실패했습니다.");
    }
  };

  const handleNaverLogin = () => {
    const state = Math.random().toString(36).substring(2); // CSRF 방지용
    const redirectUri = `${window.location.origin}${window.location.pathname}?provider=naver`;
    
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
    
    // 현재 창에서 네이버 로그인 페이지로 이동
    window.location.href = NAVER_AUTH_URL;
  };

  // 이미지
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInfo((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // 생년월일
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length >= 5) value = value.replace(/(\d{4})(\d{2})(\d{1,2})/, "$1-$2-$3");
    else if (value.length >= 3) value = value.replace(/(\d{4})(\d{1,2})/, "$1-$2");
    setInfo((prev) => ({ ...prev, birth: value }));
  };

  // 전화번호
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 7) value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    else if (value.length > 3) value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    setInfo((prev) => ({ ...prev, phone: value }));
  };

  const handleRegister = () => {
    if(info.image != null){
      // console.log(info)
        if(info.name != "" || info.birth != "" || info.phone != ""){
          const formData = new FormData();
          formData.append("email", info.email);
          formData.append("name", info.name);
          formData.append("birth", info.birth);
          formData.append("tel", info.phone);
          formData.append("type", String(info.type));
          formData.append("card_img", info.image); // 서버 필드명과 일치
          console.log(1)
          registerUser(formData); // { formData }가 아니라 formData 그대로 전달
        }
      }
  };

  const login_method = [
    { info: "kakao", bg: "#fce84d", text: "카카오로 시작하기", info_img: Kakao, fu: handleKakaoLogin },
    { info: "naver", bg: "#03C75A", text: "네이버로 시작하기", info_img: Naver, fu: handleNaverLogin },
    { info: "google", bg: "#ffffff", text: "구글로 시작하기", info_img: Google, fu: handleGoogleLogin },
  ];

  const admin_order = [
    { info: "행정사 종류", key: "cate", value: info.cate, place: "일반행정사" },
    { info: "이름", key: "name", value: info.name, place: "이름을 입력해주세요." },
    { info: "생년월일", key: "birth", value: info.birth, place: "YYYY-MM-DD" },
    { info: "핸드폰번호", key: "phone", value: info.phone, place: "010-1234-5678" },
    { info: "행정사자격증 첨부", key: "image", value: info.image, place: "파일 추가 또는 파일을 여기로 드래그" },
  ];

  return (
    <FlexColumnAllCenter
      style={{
        background:
          adminstate === 0 ? "linear-gradient(to top right,#9cb4f2 0%,#abb6f2 10.46%,#7a9dee 39.63%,#2f61b7 67.29%,#123b9e 82.61%,#000539 100%)" : "#f5f6f9",
        width: "100%",
        height: "100%",
        color: "white",
        justifyContent: adminstate === 0 ? "center" : "flex-start"
      }}
    >
      {adminstate === 0 ? (
        <>
          <LoginTitle>행정 AI 어시스턴트, 행정돕다</LoginTitle>
          <LoginSub>
            복잡한 행정업무도 1분 자동작성·검토까지 한 번에 끝내는 행정사 전용 업무용 AI
          </LoginSub>
          {login_method.map((item, index) => (
            <FlexRowAllCenter
              key={index}
              style={{
                background: item.bg,
                width: "440px",
                height: "70px",
                borderRadius: "12px",
                marginTop: index === 0 ? "0px" : "25px",
                color: index === 1 ? "white" : "black",
                fontSize: "18px",
                cursor: "pointer",
              }}
              onClick={item.fu}
            >
              <img
                src={item.info_img}
                style={{
                  width: index === 1 ? "42px" : "23px",
                  marginRight: index === 1 ? "15px" : "25px",
                }}
              />
              {item.text}
            </FlexRowAllCenter>
          ))}
        </>
      ) : (
        <>
          <FlexColumnAllCenter style={{ marginTop: "75px", padding: "40px 30px 45px 30px", borderRadius: "10px", background: "white" }}>
            <AdminBoxTitle>행정사 정보확인</AdminBoxTitle>
            <AdminBoxSub>행정돕다는 현재 행정사만 가입이 가능합니다.</AdminBoxSub>
            <AdminLine></AdminLine>
            {admin_order.map((item, index) => (
              <FlexColumnStartStart key={index} style={{ marginTop: index === 0 ? "25px" : "20px", position: "relative" }}>
                <AdminListTitle>{item.info}</AdminListTitle>
                
                {index === 4 ? ( // 파일 입력 필드
                  <FileInputContainer>
                    <HiddenFileInput
                      type="file"
                      accept="image/*"
                      id="file-input"
                      onChange={handleImageChange}
                    />
                    <CustomFileInput htmlFor="file-input">

                      <PlaceholderText>{item.place}</PlaceholderText>
                      
                    </CustomFileInput>
                    {info.image ? 
                        <FileName>{info.image.name}</FileName>
                        :
                        <></>
                      }
                  </FileInputContainer>
                ) : ( // 일반 입력 필드
                  <AdminListIntput 
                    type="text"
                    disabled={index === 0}
                    placeholder={item.place}
                    placeholderColor={index === 0 ? "black" : "#33383e"} 
                    borderColor="solid 2px #707070"
                    value={
                      index === 2 ? info.birth : 
                      index === 3 ? info.phone : 
                      (item.value as string)
                    }
                    onChange={(e) => {
                      if (item.key === "birth") return handleBirthChange(e);
                      if (item.key === "phone") return handlePhoneChange(e);
                      setInfo((prev) => ({ ...prev, [item.key]: e.target.value }));
                    }}
                  />
                )}
              </FlexColumnStartStart>
            ))}
            <FlexRowEndCenter style={{ width:"550px" , marginTop:"38px" }}>
              <EnterBox style={{ background:"#84848f"}} onClick={() => {
                  setInfo(initialInfo); 
                  setAdminState(0);     // admin 화면 닫기
                }}>취소하기</EnterBox>
              <EnterBox style={{ background:"black" , marginLeft:"10px" }} 
                onClick={()=> handleRegister()}
                >접수하기</EnterBox>
            </FlexRowEndCenter>
          </FlexColumnAllCenter>
        </>
      )}
    </FlexColumnAllCenter>
  );
};

export default Login;

const LoginTitle = styled.h2`
  font-size: 46px;
  font-weight: bold;
`;
const LoginSub = styled.p`
  font-size: 18px;
  margin: 15px 0px 55px 0px;
`;

const AdminBoxTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  text-align: left;
  color: #33383e;
  width: 100%;
`;

const AdminBoxSub = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 2;
  text-align: left;
  color: #33383e;
  width: 100%;
`;

const AdminLine = styled.div`
  width: 500px;
  height: 2px;
  margin-top: 25px;
  background-color: #f0f0f0;
`;

const AdminListTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #33383e;
`;

const AdminListIntput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "placeholderColor" && prop !== "borderColor"
})<{ placeholderColor?: string; borderColor?: string }>`
  width: 550px;
  height: 65px;
  padding: 25px 25px 20px 25px;
  border-radius: ${(props) => props.borderColor === "solid 1px #ebecf1" ? "5px" : "10px" };
  border: ${(props) => props.borderColor};
  font-size: 20px;
  margin-top: 15px;
  color:black;
  &::placeholder {
    color: ${(props) => props.placeholderColor || "#aaa"}; 
    opacity: 1;
  }
`;

const FileInputContainer = styled.div`
  position: relative;
  width: 550px;
  margin-top: 15px;
`;

const HiddenFileInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const CustomFileInput = styled.label`
  display: flex;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 65px;
  padding: 0 25px;
  border: solid 1px #ebecf1;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  font-size: 20px;
  margin-bottom:13px;
`;

const PlaceholderText = styled.span`
  color: black;
  font-size: 13px;
  font-weight: 500;
`;

const FileName = styled.span`
  color: #33383e;
`;

const EnterBox = styled.div`
  width: 170px;
  height: 56px;
  padding: 19px 57px;
  border-radius: 5px;
  color:white;
  cursor:pointer;
  font-size: 16px;
  font-weight: 600;
`;