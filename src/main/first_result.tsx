import styled, { keyframes } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { askQuestion } from "../server/first_ai";
import { useFirstStore } from "../stores/firstStore";
import { FlexColumnAllCenter, FlexColumnCenterStart, FlexColumnStartStart, FlexRowAllCenter, FlexRowBetweenCenter, FlexRowStartCenter, FlexRowStartStart } from "../css/common";
import { useAuthStore } from "../stores/authStore";
import AI_profile from "../assets/AI_Profile.png";
import star_active from "../assets/first/chat_star.gif";
import { v4 as uuidv4 } from "uuid";
import Modal from "../common/Modal";
import NotModal from "./not_modal";
import SuccessModal from "./success_modal";


function First_Result() {
    const { qaList, updateLastAnswer , choice } = useFirstStore();
    const { name } = useAuthStore();
    const clientUuidRef = useRef<string>(uuidv4());
    const fetchedRef = useRef<Record<number, boolean>>({});
    const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
    const [displayedTextMap, setDisplayedTextMap] = useState<Record<number, string>>({});
    const [animatedTextMap, setAnimatedTextMap] = useState<Record<number, string>>({});
    const [animationCompleteMap, setAnimationCompleteMap] = useState<Record<number, boolean>>({});
    const [pause, setPause] = useState<boolean>(false);
    const [pausepk, setPausePk] = useState<number>(0);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [refer, setRefer] = useState<boolean>(false);
    const [ok_refer, setok_Refer] = useState<boolean>(false);
    
    // idx별 interval을 저장
    const intervalRefMap = useRef<Record<number, number>>({});

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [qaList, displayedTextMap]);

    useEffect(() => {
        const animateText = (idx: number, text: string) => {
            if (animationCompleteMap[idx]) return;

            let currentIndex = 0;
            intervalRefMap.current[idx] = setInterval(() => {
                if (currentIndex <= text.length) {
                    setAnimatedTextMap(prev => ({
                        ...prev,
                        [idx]: text.slice(0, currentIndex)
                    }));
                    currentIndex++;
                } else {
                    if (intervalRefMap.current[idx]) {
                        clearInterval(intervalRefMap.current[idx]);
                    }
                    setAnimationCompleteMap(prev => ({ ...prev, [idx]: true }));
                }
            }, 15);
        };

        Object.entries(displayedTextMap).forEach(([idx, text]) => {
            const index = Number(idx);
            if (text && !animatedTextMap[index] && !animationCompleteMap[index]) {
                animateText(index, text);
            }
        });
    }, [displayedTextMap]);

    const formatResponse = (text: string) => {
        return text.split("\n").map((line, index) => {
            if (line.startsWith("#")) {
                const level = (line.match(/#/g) || []).length;
                const content = line.replace(/#/g, "").trim();
                if (level === 1) return <H1 key={index}>{content}</H1>;
                if (level === 2) return <H2 key={index}>{content}</H2>;
                if (level === 3) return <H3 key={index}>{content}</H3>;
                return <P key={index}>{content}</P>;
            }
            else if (line.startsWith("-")) {
                return <Li key={index}>{line.replace("-", "").trim()}</Li>;
            }
            else if (line.trim() === "") {
                return null;
            }
            else {
                return <P key={index}>{line}</P>;
            }
        });
    };

    const fetchAnswer = async (question: string, idx: number) => {
        if (fetchedRef.current[idx]) return; // 이미 호출했으면 리턴
        fetchedRef.current[idx] = true;
        setLoadingMap(prev => ({ ...prev, [idx]: true }));
        setAnimationCompleteMap(prev => ({ ...prev, [idx]: false }));
        setAnimatedTextMap(prev => ({ ...prev, [idx]: "" }));

        try {
            const previousAnswer = idx > 0 ? displayedTextMap[idx - 1] || "" : "";
            const prompt = previousAnswer === "" ? question : 
                previousAnswer === "죄송하지만, 이 질문에 대한 정보는 제가 가지고 있지 않습니다." ? question :previousAnswer + "참고해서" + question

            const res: string | null = await askQuestion(prompt, 
                choice === "행정정보 검색" ? "first" :
                    choice === "블로그/유튜브 작성" ? "second" :
                        choice === "서류 검토/요약" ? "third" :
                        "qa"
                , undefined, clientUuidRef.current);
            if (res) {
                updateLastAnswer(res);
                const resNoDup = res.replace( question, "")
                    .split('\n')
                    .filter((v, i, a) => v.trim() && a.indexOf(v) === i)
                    .join('\n');
                setDisplayedTextMap(prev => ({ ...prev, [idx]: resNoDup }));
            }
        } catch (error) {
            console.error("질문 요청 중 오류 발생:", error);
            setDisplayedTextMap(prev => ({ ...prev, [idx]: "정보가 없습니다." }));
        } finally {
            setLoadingMap(prev => ({ ...prev, [idx]: false }));
        }
    };

    const stopModal = (idx: number) => {
        // interval 제거
        setPausePk(idx)
        setPause(true)
    };


    const stopAnimation = (idx: number) => {
        // interval 제거
        if (intervalRefMap.current[idx]) {
            clearInterval(intervalRefMap.current[idx]);
        }
        // 전체 텍스트 바로 보여주기
        setAnimationCompleteMap(prev => ({ ...prev, [idx]: true }));
        setLoadingMap(prev => ({ ...prev, [idx]: false }));
        setPause(false)
    };

    useEffect(() => {
        qaList.forEach((qa, idx) => {
            if (!displayedTextMap[idx] && qa.question) {
                fetchAnswer(qa.question, idx);
            }
        });
    }, [qaList]);

    return (
        <>
            {pause ?
                <Modal isOpen={pause} >
                    <FlexColumnAllCenter style={{ width: "390px", height: "219px" }}>
                        <ModalInnerTitle>답변중지 요청</ModalInnerTitle>
                        <ModalInnerTitleSub style={{ marginTop: "15px" }}>답변을 중지하겠습니까?</ModalInnerTitleSub>
                        <FlexRowBetweenCenter style={{ marginTop: "50px" }}>
                            <FlexColumnAllCenter style={{ background: "#84848f", marginRight: "10px", padding: "20px 57px", borderRadius: "5px", cursor: "pointer" }}
                                onClick={() => setPause(false)}>
                                <p style={{ fontSize: "16px", color: "white" }}>계속하기</p>
                            </FlexColumnAllCenter>
                            <FlexColumnAllCenter style={{ background: "black", padding: "20px 57px", borderRadius: "5px", cursor: "pointer" }} onClick={() => stopAnimation(pausepk)}>
                                <p style={{ fontSize: "16px", color: "white" }}>중지하기</p>
                            </FlexColumnAllCenter>
                        </FlexRowBetweenCenter>
                    </FlexColumnAllCenter>
                </Modal>
                :refer?
                <Modal isOpen={refer} >
                    <NotModal onClose={() => setRefer(false)} />
                </Modal>
                :ok_refer?
                <Modal isOpen={ok_refer} >
                    <SuccessModal onClose={() => setok_Refer(false)} />
                </Modal>
                :
                <FlexColumnStartStart style={{ width: "950px", marginTop: "40px" }}>
                    {qaList.map((qa, idx) => (
                        <div key={idx} style={{ marginBottom: "30px" }}>
                            {/* 사용자 질문 */}
                            <FlexRowStartCenter style={{ marginBottom: "10px" }}>
                                <FlexColumnAllCenter
                                    style={{
                                        background: "#f5f7f9",
                                        borderRadius: "50%",
                                        width: "37px",
                                        height: "37px",
                                    }}
                                >
                                    {name?.slice(0, 1)}
                                </FlexColumnAllCenter>
                                <FlexColumnAllCenter
                                    style={{
                                        background: "#f5f7f9",
                                        padding: "20px",
                                        marginLeft: "15px",
                                    }}
                                >
                                    {qa.question}
                                </FlexColumnAllCenter>
                            </FlexRowStartCenter>

                            {/* AI 답변 */}
                            <FlexRowStartStart>
                                <FlexColumnAllCenter
                                    style={{
                                        background: "#0943f2",
                                        borderRadius: "50%",
                                        width: "37px",
                                        height: "37px",
                                        color: "white",
                                        marginTop: "37px",
                                    }}
                                >
                                    <img src={AI_profile} style={{ width: "37px" }} />
                                </FlexColumnAllCenter>
                                <FlexColumnStartStart
                                    style={{
                                        padding: "20px",
                                        marginLeft:loadingMap[idx] ? "0px" : "15px",
                                        maxWidth: "900px",
                                    }}
                                >
                                    {loadingMap[idx] ? (
                                        <>
                                            <LoadingText>답변 준비중</LoadingText>
                                            <FlexRowStartCenter style={{ marginBottom: "10px" }}>
                                                <FlexColumnCenterStart
                                                    style={{
                                                        background: "#f5f7f9",
                                                        padding: "20px",
                                                        marginTop: "15px",
                                                    }}
                                                >
                                                    <LoadingTextSub>
                                                        답변 제공을 위해 몆 가지의 단계를 거치고 있어요.
                                                    </LoadingTextSub>

                                                    <FlexRowStartCenter>
                                                        <img src={star_active} style={{ width: "20px", marginRight: "15px" }} />
                                                        <p>답변 생성을 위해 데이터베이스를 검색하고 있습니다.</p>
                                                    </FlexRowStartCenter>

                                                    <FlexRowStartCenter>
                                                        <img src={star_active} style={{ width: "20px", marginRight: "15px" }} />
                                                        <p>요청사항에 필요한 작업을 분석하고 있습니다.</p>
                                                    </FlexRowStartCenter>

                                                    <FlexRowStartCenter>
                                                        <img src={star_active} style={{ width: "20px", marginRight: "15px" }} />
                                                        <p>업로드한 문서를 분석하고 있습니다.</p>
                                                    </FlexRowStartCenter>
                                                </FlexColumnCenterStart>
                                            </FlexRowStartCenter>
                                        </>
                                    ) : (
                                        <AnimatedTextContainer>
                                            {formatResponse(animatedTextMap[idx] || "")}
                                            {displayedTextMap[idx] && animatedTextMap[idx] !== displayedTextMap[idx] && (
                                                <Cursor />
                                            )}
                                        </AnimatedTextContainer>
                                    )}

                                    {/* 답변 중지 버튼: 로딩 중일 때만 표시 */}
                                    {loadingMap[idx] ?
                                        <FlexColumnAllCenter style={{ height: "50px", width: "950px" }}>
                                            <FlexRowAllCenter
                                                style={{ padding: "14px 20px", background: "#f5f7f9", cursor: "pointer" }}
                                                onClick={() => stopModal(idx)}
                                            >
                                                <p style={{ fontSize: "16px" }}>
                                                    <span style={{ fontSize: "13px" }}>■</span> 답변 중지
                                                </p>
                                            </FlexRowAllCenter>
                                        </FlexColumnAllCenter>
                                        : 
                                         <FlexRowStartCenter style={{ marginTop: "25px", cursor: "pointer" }}>
                                            <FlexColumnAllCenter style={{ padding: "9px 10px", background: "#91969c", borderRadius: "5px", color: "white", fontSize: "16px", fontWeight: "600" }}
                                                onClick={()=> setok_Refer(true)}>
                                                만족스러운 답변
                                            </FlexColumnAllCenter>
                                            <FlexColumnAllCenter style={{ padding: "9px 10px", background: "#91969c", borderRadius: "5px", color: "white", fontSize: "16px", fontWeight: "600", marginLeft: "10px" }}
                                                onClick={()=> setRefer(true)}>
                                                아쉬운 답변
                                            </FlexColumnAllCenter>
                                        </FlexRowStartCenter>
                                    }
                                </FlexColumnStartStart>
                            </FlexRowStartStart>
                           
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </FlexColumnStartStart>

            }
        </>
    );
}

export default First_Result;

const LoadingText = styled.p`
  font-size: 18px;
  color: black;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 12px 0;
`;

const H2 = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 10px 0;
`;

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 8px 0;
`;

const P = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin: 6px 0;
`;

const Li = styled.li`
  font-size: 16px;
  margin-left: 20px;
  line-height: 1.5;
`;

const LoadingTextSub = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const AnimatedTextContainer = styled.div`
  position: relative;
`;

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const Cursor = styled.span`
  animation: ${blink} 1s infinite;
`;

const ModalInnerTitle = styled.h3`
  font-size: 25px;
  font-weight: bold;
`;

const ModalInnerTitleSub = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #84848f;
`;