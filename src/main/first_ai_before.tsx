import styled, { keyframes } from "styled-components";
import {
    FlexRowStartCenter, FlexRowAllCenter, FlexRowBetweenCenter, FlexColumnStartStart, FlexColumnBeween,
    FlexRowEndCenter, FlexColumnAllCenter
} from "../css/common";
import Main_check from "../assets/common/main_top_check.png"
import { useFirstStore } from "../stores/firstStore";
import First_img from "../assets/first/first_cate.png"
import First_img_sub from "../assets/first/first_sub_cate.png"
import Second_img_sub from "../assets/first/second_sub_cate.png"
import Third_img_sub from "../assets/first/third_sub_cate.png.png"
import example_btn from "../assets/first/example_btn.png"
import first_add from "../assets/first/first_add.png"
import { useState , useEffect } from "react";
import { askQuestion } from "../server/first_ai";

interface DotProps {
    opacity?: number;     // 투명도 조정 가능
}


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 첫 번째 옵션 인터페이스 정의
interface FirstOption {
    title: string;
    text: string;
    img: string;
}


const FirstAiBefore = () => {
    
    const first_option: FirstOption[] = [
        { title: "행정정보 검색", text: "최신 행정정보/\n재결례 서비스", img: First_img_sub },
        { title: "블로그/유튜브 작성", text: "AI가 자동으로\n콘텐츠를 도와줍니다", img: Second_img_sub },
        { title: "서류 검토/요약", text: "서류를 업로드하고,\n검토를 시작하세요", img: Third_img_sub },
    ];

    const { setTitle , setChoice , choice } = useFirstStore();

    const [exampleQuestions, setExampleQuestions] = useState<string[]>([]); // 예시 질문들 저장
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
    
     
     // 데이터 가져오는 함수
    const fetchData = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const res: string | null = await askQuestion(
                "치과 치료 중 발생한 사고에 대해 형사 고소를 고려할 때, 고소장 작성 시 유의해야 할 사항은 무엇인지요? 같은형식의 너가 답변할수있는 행정사례와 관련된 질문만 3개 생성해줘. 각 질문은 30자 이내, 물음표로 끝나도록. 답변은 하지 말고 질문만 나열해줘."
            );

            if (res) {

                // 응답 파싱 로직 개선
                try {
                    // 숫자와 점으로 시작하는 항목들을 찾아 분할
                    const questions: string[] = res
                        .split(/\d+\.\s/) // 숫자와 점으로 분할
                        .filter((q: string) => q.trim().length > 0 && q.trim().endsWith('?')) // 물음표로 끝나는 항목만 필터링
                        .map((q: string) => q.trim().replace(/\n/g, '')); // 줄바꿈 제거 및 공백 정리

                    if (questions.length >= 3) {
                        setExampleQuestions(questions.slice(0, 3)); // 처음 3개 질문만 저장
                    } else {
                        // 충분한 질문이 없을 경우 기본값 설정
                        setExampleQuestions([
                            "치과 치료 중 발생한 사고에 대해 형사 고소를 고려할 때, 고소장 작성 시 유의해야 할 사항은 무엇인지요?",
                            "행정심판 청구 시 제출 서류에 어떤 내용이 포함되어야 하나요?",
                            "건축물 허가 관련 행정처분에 이의가 있을 때 어떻게 대응해야 하나요?"
                        ]);
                    }
                } catch (error) {
                    console.error("응답 파싱 중 오류 발생:", error);
                    // 오류 발생 시 기본 예시 질문 설정
                    setExampleQuestions([
                        "치과 치료 중 발생한 사고에 대해 형사 고소를 고려할 때, 고소장 작성 시 유의해야 할 사항은 무엇인지요?",
                        "행정심판 청구 시 제출 서류에 어떤 내용이 포함되어야 하나요?",
                        "건축물 허가 관련 행정처분에 이의가 있을 때 어떻게 대응해야 하나요?"
                    ]);
                }
            }
        } catch (error) {
            console.error("질문 요청 중 오류 발생:", error);
            setExampleQuestions([
                "치과 치료 중 발생한 사고에 대해 형사 고소를 고려할 때, 고소장 작성 시 유의해야 할 사항은 무엇인지요?",
                "행정심판 청구 시 제출 서류에 어떤 내용이 포함되어야 하나요?",
                "건축물 허가 관련 행정처분에 이의가 있을 때 어떻게 대응해야 하나요?"
            ]);
        } finally {
            setIsLoading(false);
        }
    };

       useEffect(() => {
            fetchData();
        }, []);

    // 리프레시 핸들러
    const handleRefresh = (): void => {
        fetchData();
    };

    return (
        <>
         <FlexRowAllCenter style={{ height: "60px", borderBottom: "2px solid #f0f0f0", width: "100%" }}>
                <FlexRowStartCenter style={{ width: "1200px", height: "100%" }}>
                    <p style={{ marginLeft: "75px", fontSize: "18px" }}><span style={{ color: "#0844f3" }}>정확하게</span>
                        답변생성</p>
                    <img
                        src={Main_check}
                        style={{ height: "20px", margin: "0px 8px 3px 8px" }}
                    />
                    <p style={{ color: "#91969c", fontSize: "15px" }}>최신 AI모델을 이용하고 있어요</p>
                </FlexRowStartCenter>
            </FlexRowAllCenter>
            <LoginTitle>행정 AI 어시스턴트, 행정돕다</LoginTitle>
            <FlexRowBetweenCenter style={{ width: "1200px", height: "240px", marginTop: "35px" }}>
                <FlexRowAllCenter style={{
                    width: "480px", height: "100%", cursor: "pointer", background: "linear-gradient(116deg, #1e2127 1%, #3a3f48 100%)"
                    , borderRadius: "15px"
                }}>
                    <FlexColumnStartStart style={{ color: "white", height: "100%" }}>
                        <p style={{ fontSize: "26px", fontWeight: "bold", marginTop: "30px" }}>행정사를 위한 AI서비스<br />
                            이용방법을 확인하세요</p>
                        <p style={{ fontSize: "16px", opacity: "0.5", marginTop: "15px" }}>행정AI 어시스턴트, 행정돕다</p>
                    </FlexColumnStartStart>
                    <FlexColumnBeween style={{ width: "130px", height: "100%", marginLeft: "50px" }}>
                        <FlexRowEndCenter style={{ width: "100%", marginTop: "30px" }}>
                            <Dot opacity={1} />
                            <Dot opacity={0.3} />
                            <Dot opacity={0.3} />
                        </FlexRowEndCenter>
                        <img
                            src={First_img}
                            style={{ width: "126px", marginTop: "78px" }}
                        />
                    </FlexColumnBeween>
                </FlexRowAllCenter>
                {first_option.map((item: FirstOption, index: number) => (
                    <FlexColumnAllCenter key={index} style={{
                        width: "240px", height: "100%", marginLeft: "20px",
                        color: choice === item.title ? "white" : "black", borderRadius: "15px",
                        background: choice === item.title ? "#1c69ff" : "#f5f6f9", cursor: "pointer"
                    }}
                        onClick={() => setChoice(item.title)} >
                        <FlexColumnStartStart style={{ width: "calc(100% - 25px)" }}>
                            <h2 style={{ fontSize: "20px" }}>{item.title}</h2>
                            <p style={{ fontSize: "15px", whiteSpace: "pre-wrap", marginTop: "15px" }}>{item.text}</p>
                        </FlexColumnStartStart>
                        <FlexRowEndCenter style={{ width: "calc(100% - 25px)", marginTop: "40px" }}>
                            <img
                                src={item.img}
                                style={{ height: "60px" }}
                            />
                        </FlexRowEndCenter>
                    </FlexColumnAllCenter>
                ))}
            </FlexRowBetweenCenter>
            <Line />
            <FlexRowBetweenCenter style={{ height: "46px", width: "1100px" }}>
                <ExampleTitle>아래 예시를 참고해 질문해주세요</ExampleTitle>
                <RefreshButton
                    onClick={handleRefresh}
                    disabled={isLoading}
                >
                    <img
                        src={example_btn}
                        style={{ height: "46px" }}
                    />
                </RefreshButton>
            </FlexRowBetweenCenter>
             {/* 로딩 상태 표시 */}
            {isLoading ? (
                <FlexColumnAllCenter style={{ width: "1100px", height: "200px" }}>
                    <LoadingSpinner />
                    <LoadingText>AI가 예시 질문을 생성 중입니다...</LoadingText>
                </FlexColumnAllCenter>
            ) : (
                /* 예시 질문 표시 */
                <FlexColumnStartStart style={{ width: "1100px", marginTop: "25px" }}>
                    {exampleQuestions.map((question: string, index: number) => (
                        <ExampleQuestion key={index} onClick={()=> setTitle(question)}>
                            <img
                                src={first_add}
                                style={{ width: "15px", height: "15px", marginRight: "10px" }}
                                onClick={() => setTitle(question)}
                            />
                            {question}
                        </ExampleQuestion>
                    ))}
                    {/* <RefreshInfo>새로운 질문을 원하시면 위의 버튼을 클릭하세요! (리프레시 횟수: {refreshCount})</RefreshInfo> */}
                </FlexColumnStartStart>
            )}
        </>
    );
};

export default FirstAiBefore;

const LoginTitle = styled.h2`
  font-size: 46px;
  font-weight: bold;
  margin-top:10px;
`;

const Dot = styled.div<DotProps>`
  border-radius: 50%;
  background: white;
  width: 6px;
  height: 6px;
  margin-left:8px;
  opacity: ${(props) => (props.opacity !== undefined ? props.opacity : 0.3)};
`;

const Line = styled.div`
    height:2px;
    background:#f0f0f0;
    width:100%;
    margin:45px 0 30px 0px;
`;

const ExampleTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #33383e;
`;

const ExampleQuestion = styled.div`
  font-size: 18px;
  font-weight:600;
  color: #000;
  padding: 20px 0px;
    border-bottom:1px solid #ebecf1;
  line-height: 1.5;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  cursor:pointer;
`;

// 로딩 스피너 컴포넌트
const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1c69ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

// 로딩 텍스트
const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

// 리프레시 버튼
const RefreshButton = styled.button<{ disabled?: boolean }>`
  position: relative;
  background: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  &:hover 
    opacity: ${props => props.disabled ? 0.7 : 0.8};
  } 
 
`;



