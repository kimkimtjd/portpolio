import { useState } from "react";
import { FlexColumnAllCenter, FlexColumnCenterStart, FlexColumnStartCenter, FlexColumnStartStart, FlexRowAllCenter, FlexRowBetweenCenter, FlexRowCenterEnd, FlexRowCenterStart, FlexRowStartCenter, FlexRowStartStart } from "../css/common";
import styled from "styled-components";
import SidaBar from "../assets/common/sidebar_back.png";
import marktet from "../assets/logo/marketb.png"
import zip from "../assets/logo/zip.png"
import ugly from "../assets/logo/uglystone.png"
import barun from "../assets/logo/barun.webp"
import main from "../assets/main.jpg"

function Home() {
    const [selectedIndex, setSelectedIndex] = useState(0); // 사이드바 선택 메뉴
    const [expandedIndex, setExpandedIndex] = useState(null); // 경력 상세 내용 확장 상태

    const career = [
        { job: "바른행정 주식회사", Date: "2024.11 ~", intro: "복잡하고 불투명한 행정 문제를 해결하는 IT기반의 기업"  , img:barun , 
        text: "Django를 이용한 API 생성 및 기능구현등\nNext.js를 활용하여 amplify에 배포를 진행\nphp를 활용한, CRM 및 Next.js, Django를 활용하여 어드민 사이트를 개발\n행정24, 케이비자 멤버십, 케이비자 파트너스라는 비자 관련 다양한 형태의 서비스를 개발 및 유지보수\n케이비자 파트너스라는 플랫폼을 통해 다양한 대기업 [전북은행, LGU+, Cu]와 협업을 진행\n행정돕다 AI개발을 통해 행정24와 접목하여, 행정시장을 더욱 편리하게 진행할 수 있도록 개발을 진행"
        },
        { job: "주식회사 어글리스톤", Date: "2022.01 - 2024.11 . 2년 10개월", intro: "리사이클 업계의 불공정한 거래를 해결하고 투명한 거래를 위한 플랫폼" , img:ugly , 
        text: "Django를 이용한 API 생성 및 기능구현등\nReact.ts를 활용하여 AWS Beanstalk에 배포를 진행 \nReact와 ReactNative를 이용한 웹뷰 및 앱개발 완료\n채팅부분 서버 분리를 위해 Nest.js를 이용하여 작업 및 유지보수\n[메인서버 - AWS , 채팅서버(socket) - NaverCloud]\n네이버 api, 카카오 api를 활용한 지도 및 기타 기능등 전반적인 업무 진행\n위의 기능들을 활용한 전반적인 앱 개발 업무 및\n회원가입,로그인,채팅,필터링, 푸시알림 , 지도등 전반적인업무진행"
        },
        { job: "집대장", Date: "2021.12 - 2022.01 ‧ 2개월", intro: "전원주택 타운하우스 한옥등 주택을 거래하는 플랫폼" , img:zip , 
            text : "React js와 node js, express를 활용한 전체적인 업무 진행\nAWS EC2와 도메인을 연결,\nAWS RDS 기반의 MySQL DB 구축 및 최적화된 데이터 모델링 수행\nT Map, kakao Map등 다양한 지도 api, 를 활용한, 위치기반 매물정보 기능 구현\n위의 기능들을 활용한 전반적인 퍼블리싱 업무 및\n회원가입,로그인 기능을 구현"
        },
        { job: "주식회사마켓비", Date: "2019.12 - 2021.11 ‧ 2년", intro: "가성비 높은 가구와 인테리어 소품을 판매하는 온라인 쇼핑몰" , img:marktet , 
            text : "Html,css,js, Vue js 를 활용하여 행사및 각종기획전등 사이트 전반적인 수정업무 진행\nDocker Container안에 Django를 배포하여 DB연동및 이벤트 지원자 취합을 위한, 모델을 생성하여 관리\nCafe24 가상서버 접속후 Google Triger를 활용하여 Google sheet 자동화를 진행\nCafe24 API를 이용하여 매출및 판매기록등 DB를 구글시트로 작성\n개발이외에 추가적인 근태관리 및 소비자환불등 기타 업무등을 진행"
         },

    ];

    const handleToggle = (index:any) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <FlexRowCenterStart
            style={{
                // background: "linear-gradient(to top right,#9cb4f2 0%,#abb6f2 10.46%,#7a9dee 39.63%,#2f61b7 67.29%,#123b9e 82.61%,#000539 100%)",
                width: "100%",
                height: "100%",
                color: "white", overflow: "auto",
            }}
        >
            {/* <SidaBar selectedIndex={selectedIndex} onSelect={setSelectedIndex} /> */}

            <FlexColumnStartCenter style={{ color: "black", height: "100%", width: "100%", overflow: "auto" }}>
                {selectedIndex === 0 &&
                    <FlexColumnStartStart style={{ width: "700px", height: "100%" }}>
                        <FlexRowStartStart style={{ width: "700px", marginTop: "150px" }}>
                            <img src={main} style={{ width: "110px", borderRadius: "50%", marginRight: "20px" }} />
                            <FlexColumnCenterStart>
                                <h3 style={{ fontSize: "20px" }}>김성원</h3>
                                <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "15px" }}>풀스택 개발자</span>
                                <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px" }}>
                                    <span>+82 10-8075-8012&nbsp;&nbsp;&nbsp;</span>
                                    <span>|</span>
                                    <span>&nbsp;&nbsp;&nbsp;kimeende@naver.com</span>
                                </FlexRowAllCenter>
                            </FlexColumnCenterStart>
                        </FlexRowStartStart>
                        <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", marginTop: "20px" }}>
                            안녕하세요.<br />
                            6년차 개발자 김성원입니다.<br />
                            Django, Node, React, Kotlin 등 다양한 언어와 프레임워크를 기반으로
                            웹/앱 개발 및 자동화 등 다양한 개발 업무를 진행했습니다.<br />
                            특히, 풍부하고 다양한 기술을 바탕으로
                            회사 내부 인원과 서비스를 이용하는 회원들에게 혁신적인 솔루션을 제공한 경험이 있습니다.<br />
                            새로운 기능 개발에 두려워하지 않고 끊임없이 성장하며
                            다양한 프로젝트에 기여하고 싶습니다.<br />
                            감사합니다.
                        </FlexRowAllCenter>
                        <FlexRowBetweenCenter style={{ width: "100%", margin: "30px 0px", fontSize: "20px" }}>
                            <span>🚀 </span>
                            <Line>경력</Line>
                        </FlexRowBetweenCenter>
                        {career.map((item, index) => (
                            <FlexColumnCenterStart style={{ border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", padding: "10px 25px", width: "95%", borderRadius: "20px",
                                marginTop:index===0? 0 : 20 , marginLeft:"20px"
                             }} key={index} onClick={() => handleToggle(index)}> 
                                <FlexRowBetweenCenter style={{ width: "100%" }}>
                                    <FlexRowStartStart>
                                        <span style={{ fontSize: "15px" }}>{item.job}</span>
                                        <img src = {item.img} style={{ height:"15px" , marginLeft:"10px" }}/>
                                    </FlexRowStartStart>
                                    <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px" }}>{item.Date}</span>
                                </FlexRowBetweenCenter>
                                <FlexRowBetweenCenter style={{ width: "100%" }}>
                                    <span style={{ marginTop: "10px", fontSize: "14px" }}>{item.intro}</span>
                                    <img src={SidaBar}
                                        style={{
                                            height: "20px", transform: expandedIndex === index ? "rotate(270deg)" : "rotate(90deg)", transition: "transform 0.3s ease"
                                        }}
                                    />
                                </FlexRowBetweenCenter>
                                {expandedIndex === index && item.text && (
                                    <FlexColumnStartStart style={{
                                        width: "100%",
                                        marginTop: "10px",
                                        padding: "10px",
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "10px",
                                        whiteSpace: "pre-line",
                                        fontSize: "13px",
                                        color: "#555",
                                    }}>
                                        {item.text}
                                    </FlexColumnStartStart>
                                )}

                            </FlexColumnCenterStart>
                        ))}
                    </FlexColumnStartStart>
                }
                {selectedIndex === 1 &&
                    <FlexColumnAllCenter style={{ width: "100%", height: "100%" }}>
                        커리어
                    </FlexColumnAllCenter>
                }
                {selectedIndex === 2 && <FlexColumnAllCenter style={{ width: "100%", height: "100%" }}>
                    프로젝트
                </FlexColumnAllCenter>
                }
                {selectedIndex === 3 && <FlexColumnAllCenter style={{ width: "100%", height: "100%" }}>
                    Contact
                </FlexColumnAllCenter>
                }
            </FlexColumnStartCenter>

        </FlexRowCenterStart>
    );
}

export default Home;

const Line = styled.div`
    background:#f0f0f0;
    width:95%;
    font-weight:bold;
`;
