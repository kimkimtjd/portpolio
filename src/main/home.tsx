import React, { useState , useEffect } from "react";
import {  FlexColumnCenterStart, FlexColumnStartCenter, FlexColumnStartStart, FlexRowAllCenter, FlexRowBetweenCenter,  FlexRowCenterStart,  FlexRowStartStart } from "../css/common";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import SidaBar from "../assets/common/sidebar_back.png";
import marktet from "../assets/logo/marketb.png"
import zip from "../assets/logo/zip.png"
import ugly from "../assets/logo/uglystone.png"
import barun from "../assets/logo/barun.webp"
import main from "../assets/main.jpg"
import m_1 from "../assets/project/m_1.png"
import m_2 from "../assets/project/m_2.png"
import m_8 from "../assets/project/m_8.jpeg"
import zi from "../assets/project/z_1.png"
import sc_1 from "../assets/project/sc_1.jpg"
import sc_2 from "../assets/project/sc_2.jpeg"
import k_1 from "../assets/project/k_1.png"
import k_2 from "../assets/project/k_2.png"
import k_3 from "../assets/project/k_3.png"
import k_4 from "../assets/project/k_4.webp"
import k_5 from "../assets/project/k_5.png"
import k_6 from "../assets/project/k_6.png"
import k_7 from "../assets/project/k_7.png"
import k_8 from "../assets/project/k_8.png"
import k_9 from "../assets/project/k_9.png"
import k_10 from "../assets/project/k_10.png"

import no from "../assets/project/no.jpg"


// 1. 필요한 타입 정의
interface Project {
    title: string;
    skills: string;
    description: string[];
    img: string;
    link: string | null;
    isVideo?: boolean;
}

interface CareerItem {
    job: string;
    Date: string;
    intro: string;
    img: string;
    text: string;
}

interface StackItem {
    title: string;
    data: string[];
}

interface ProjectGridProps {
    projects: Project[];
    handleProjectClick: (link: string | null, isVideo?: boolean) => void;
    windowWidth:number;
}

// 2. ProjectGrid 컴포넌트에도 타입 적용
const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, handleProjectClick , windowWidth }) => (
    <div style={{ display: windowWidth < 700 ? "flex": "grid", gridTemplateColumns: "repeat(3, 1fr)", marginLeft: windowWidth < 700 ? "0px" : "20px", gap: "15px",
        justifyContent:windowWidth < 700 ? "center": "" ,
        alignItems:windowWidth < 700 ? "center": "" ,
        flexDirection:windowWidth < 700 ? "column": "row" ,
     }}>          
        {projects.map((project: Project, index: number) => (
            <FlexColumnStartCenter
                key={index}
                style={{
                    border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", 
                    padding: "5px", 
                    borderRadius: "10px", 
                    width: windowWidth < 700 ? "95%" :"100%",
                    cursor: project.link ? "pointer" : "default",
                    transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
                    position: 'relative',
                    justifyContent:windowWidth < 700 ? "center" : "flex-start",
                }}
                onClick={() => handleProjectClick(project.link, project.isVideo)}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => project.link && (e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)")}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => project.link && (e.currentTarget.style.boxShadow = "none")}
            >
                <div style={{ position: 'relative', width: windowWidth < 700 ? "95%" :'100%', height: '150px', marginBottom: '15px' }}>
                    {project.img === no ? 
                        <div 
                        style={{ width: "100%", height: "150px", borderRadius: "8px" , display:"flex" , justifyContent:"center" , alignItems:"center" , border:"1px solid rgb(229 231 235 / var(--tw-border-opacity, 1))" }} 
                        >
                            개발중
                        </div>
                        :
                    <img 
                        src={project.img} 
                        style={{ width:"100%", height:"150px", borderRadius: "8px 8px 0 0", objectFit: "cover" }} 
                        alt={project.title}
                    />
                    }
                    {/* 비디오 아이콘 오버레이 */}
                    {project.isVideo && (
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            borderRadius: "8px 8px 0 0",
                            fontSize: '3rem', color: 'white'
                        }}>
                            ▶
                        </div>
                    )}
                </div>

                <div style={{ padding: "0 10px 10px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: "5px 0" }}>{project.title}</h3>
                    <h5 style={{ fontSize: "13px", color: "#6b7280", margin: "5px 0" }}>{project.skills}</h5>
                    <FlexColumnStartCenter style={{ marginTop: "10px", textAlign: "left" }}>
                        {/* desc와 descIndex에 명시적 타입 선언 (number) */}
                        {project.description.map((desc: string, descIndex: number) => (
                            <p key={descIndex} style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "12px", margin: "2px 0" }}>
                                {desc}
                            </p>
                        ))}
                    </FlexColumnStartCenter>
                    {project.link && (
                        <div style={{ textAlign: "center", marginTop: "10px", color: project.isVideo ? "#EF4444" : "#2563EB", fontSize: "13px", fontWeight: "bold" }}>
                            🔗 {project.isVideo ? "시연 영상 재생" : "보러가기"}
                        </div>
                    )}
                </div>
            </FlexColumnStartCenter>
        ))}
    </div>
);

function Home() {
    // 3. useState에도 타입 적용
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // 경력 상세 내용 확장 상태
    const [showVideoModal, setShowVideoModal] = useState<boolean>(false); // 비디오 모달 표시 상태
    const [videoSource, setVideoSource] = useState<string>(""); // 현재 재생할 비디오 소스
    // 1. 화면 가로 길이를 저장할 상태 추가
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        // 2. 리사이즈 이벤트를 처리할 함수
        const handleResize = () => {
            setExpandedIndex(null); // (선택사항) 화면 크기 변할 때 상세내용 닫기 등 응용 가능
            setWindowWidth(window.innerWidth);
        };

        // 3. 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 4. 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 4. 데이터 배열에 타입 적용
    const career: CareerItem[] = [
        {
            job: "바른행정 주식회사", Date: "2024.11 ~", intro: "복잡하고 불투명한 행정 문제를 해결하는 IT기반의 기업", img: barun,
            text: "Django를 이용한 API 생성 및 기능구현등\nNext.js를 활용하여 행정24 플랫폼을 개발하고 amplify통해 배포를 진행\nphp를 활용한, 케이비자 행정사무소 CRM 및 Next.js, Django를 활용하여 어드민 사이트를 개발\nNext js , DJango를 활용하여  케이비자 파트너스라는 비자 접수 서비스를 개발 및 유지보수\n케이비자 파트너스라는 플랫폼을 통해 다양한 대기업 [전북은행, LGU+, Cu]와 협업을 진행\nAWS-Bedrock을 이용하여 케이비자 AI 개발 및  비자24와 접목하여, 비자 관련 서비스 업무를 확장\n"
                + "Selenium을 활용하여 데이터 학습을 위한 법제처 스크롤링 및 pdf파일을 다운로드\nAWS OpenSearchService를 이용하여 RAG시스템을 통한 할루시네이션 감소"
                + ""
        },
        {
            job: "주식회사 어글리스톤", Date: "2022.01 - 2024.11 . 2년 10개월", intro: "리사이클 업계의 불공정한 거래를 해결하고 투명한 거래를 위한 플랫폼", img: ugly,
            text: "Django를 이용한 API 생성 및 기능구현등\nReact.ts를 활용하여 스크랩마켓 웹뷰를 AWS Beanstalk통해 배포를 진행 \nReact와 ReactNative를 이용한 웹뷰 및 앱개발 완료\n채팅부분 서버 분리를 위해 Nest.js를 이용하여 작업 및 유지보수\n[메인서버 - AWS , 채팅서버(socket) - NaverCloud]\n네이버 api, 카카오 api를 활용한 지도 및 기타 기능등 전반적인 업무 진행\n위의 기능들을 활용한 전반적인 앱 개발 업무 및\n회원가입,로그인,채팅,필터링, 푸시알림 , 지도등 전반적인업무진행"
        },
        {
            job: "집대장", Date: "2021.12 - 2022.01 ‧ 2개월", intro: "전원주택 타운하우스 한옥등 주택을 거래하는 플랫폼", img: zip,
            text: "React js와 node js, express를 활용한 전체적인 업무 진행\nAWS EC2와 도메인을 연결,\nAWS RDS 기반의 MySQL DB 구축 및 최적화된 데이터 모델링 수행\nT Map, kakao Map등 다양한 지도 api, 를 활용한, 위치기반 매물정보 기능 구현\n위의 기능들을 활용한 전반적인 퍼블리싱 업무 및\n회원가입,로그인 기능을 구현"
        },
        {
            job: "주식회사마켓비", Date: "2019.12 - 2021.11 ‧ 2년", intro: "가성비 높은 가구와 인테리어 소품을 판매하는 온라인 쇼핑몰", img: marktet,
            text: "Html,css,js, Vue js 를 활용하여 행사및 각종기획전등 사이트 전반적인 수정업무 진행\nDocker Container안에 Django를 배포하여 DB연동및 이벤트 지원자 취합을 위한, 모델을 생성하여 관리\nCafe24 가상서버 접속후 Google Triger를 활용하여 Google sheet 자동화를 진행\nCafe24 API를 이용하여 매출및 판매기록등 DB를 구글시트로 작성\n개발이외에 추가적인 근태관리 및 소비자환불등 기타 업무등을 진행"
        },

    ];

    const stack: StackItem[] = [
        { title: "Language", data: ["JavaScript", "TypeScript", "css", "Python", "SQL"] },
        { title: "FrontEnd", data: ["Next js", "React js", "Zustand", "Redux", "ReactNative", "Styled-Components"] },
        { title: "BackEnd", data: ["Node js", "Socket io", "Docker", "Django", "PostgreSQL", "MySQL"] },
        { title: "Cloud", data: ["AWS", "NaverCloud", "Vercel"] },
        { title: "AI", data: ["AWS-Bedrock", "OpenAI"] },
        { title: "Etc", data: ["Selenium", "Pandas", "openpyxl"] },
    ];
    
    // 주식회사 마켓비 프로젝트
    const marketBProjects: Project[] = [
        {
            title: "위탁사 데이터분리 & 신규 웹사이트 구축",
            skills: "Django, Docker, Vue",
            description: [
                "- 팀원들과 공유 중 버전 이슈 문제 발생. Docker container 패키징 작업을 진행하여 해결",
                "- 데이터를 이전하는데 누락 문제 발생. 백업했던 데이터로 복구 후 문제 해결" ,
                "- 입금내역을 1분마다 확인하여 위탁업체 적립금을 자동으로 충전하는 기능을 구축",
            ],
            img: m_1,
            link: "https://www.getnews.co.kr/news/articleView.html?idxno=510954"
        },
        {
            title: "대리점 안내 서비스 구축",
            skills: "Django, Vue, NaverMap",
            description: [
                "- 지도에 네비게이션 기능을 구현하여 지역별로 방문을 쉽게 구현",
                "- 전화번호 클릭 시 전화연결 및 주소 복사 등 편의성 기능 구현"
            ],
            img: m_2,
            link: null
        },
        {
            title: "각종 행사 및 기획전 작업",
            skills: "Django, Vue",
            description: [
                "- 각종 기획전 및 타이머 스크롤 등 기능 구현",
                "- 타이머를 이용한 자동화 및 이벤트지원자 취합 등 각종 기능 개발"
            ],
            img: m_8,
            link: null
        },
    ];

    // 집대장 프로젝트
    const zipProjects: Project[] = [
        {
            title: "전원주택 및 타운하우스등 웹사이트 구축",
            skills: "Nodejs , React",
            description: [
                "- 지도부분 기능 개발에서 마커 및 길찾기 거리뷰등 다양한 기능을 개발",
                "- 360도 카메라 이미지를 활용하여 3D 스마트뷰 기능을 개발"
            ],
            img: zi,
            link: null
        },
    ]

    // 주식회사 어글리스톤 프로젝트
    const scrapProjects: Project[] = [
        {
            title: "스크랩마켓 웹사이트 구축",
            skills: "Django , React",
            description: [
                "- 채팅서버[NaverCloud] 메인서버[AWS] 분리작업",
                "- 채팅 . 경매 . 지도 . 명함커스텀등 다양한 기능을 구축" ,
                "- 채팅에서 명함 전송시 커스텀요소가 많아 호출속도 저하문제발생 -> 커스텀한 명함을 이미지화하여 속도문제개선" , 
                "- 일별 평균 거래시세를 변동시간 기준 자동으로반영되도록 작업" , 
            ],
            img: sc_1,
            link: null
        },
        {
            title: "스크랩마켓 웹뷰를 이용힌 앱개발",
            skills: "Django , ReactNative",
            description: [
                "- 웹에서의 전반적인기능 + AOS 위젯을 구축",
                "- 딥링크를 활용한 네비게이션기능을 구축"
            ],
            img: sc_2,
            link: null
        },
    ]
    
    // 바른행정 주식회사 프로젝트
    const barunProjects: Project[] = [
        {
            title: "행정24 플랫폼 구축",
            skills: "Next.js, Django",
            description: [
                "- 행정업무 접수 신청후 일정시간경과후 , 자동으로 업무 진행상태 변경기능을 구축",
                "- 행정법인의경우도 진행을 할수있도록 , 유저로직 분리 및 최적화 작업을 진행"
            ],
            img: k_1,
            link: "https://www.enetnews.co.kr/news/articleView.html?idxno=34295"
        },
        {
            title: "케이비자 파트너스 구축",
            skills: "Next.js, Django",
            description: [
                "- LGU+, CU , 전북은행등 대기업 협업을 위한 비자 접수 서비스 플랫폼 개발 및 유지보수",
                "- QR코드를통한 상담폼진입 -> 설문을 진행후 내부담당자배정을 통한 상담을진행" ,
                "- 전북은행 브라보코리아 비자발급 기능에 웹뷰개발을 통한 협업을 진행"
            ],
            img: k_2,
            link: "https://www.fetv.co.kr/news/article.html?no=191348"
        },
        {
            title: "결혼비자 셀프테스트 구축 및 사이트 리뉴얼등 다양한 기능을 개발",
            skills: "React , php",
            description: [
                "- 케이비자 사이트 전체를 관리 및 수정작업기능을 구현",
                "- 케이비자 결혼비자 셀프테스트를 구축하여 , 상담전 본인의 충족여부를 검증하도록 구현",
            ],
            img: k_3,
            link: "https://www.k-visa.co.kr/html/F6/"
        },
        {
            title: "케이비자 알리미 웹뷰 구축[팁스 과제용]",
            skills: "React , ReactNative , Django",
            description: [
                "- 케이비자 알리미를 구축하여 회원들을 대상으로 비자만료기간 FCM알림 기능을 개발",
                "- 안드로이드에서 위젯기능을 추가하여 , 만료기간을 주기적으로 확인가능하도록 구축",
            ],
            img: k_4,
            link: "https://play.google.com/store/apps/details?id=com.kvisaapp"
        },
        {
            title: "케이비자 AI를 개발[팁스 과제용]",
            skills: "Python, Django, React",
            description: [
                "- AI 학습을 위한 법제처 데이터 스크래핑 및 수집 자동화 (Selenium)",
                "- Upstage Document OCR을 서류 분석 및 대화하기 기능을 구현" , 
                "- 질문, 답변을 통한 서류 작성 및 다운로드 기능을 구현",
                "- OpenAI를 통한 실시간 대화하기 기능을 구현",
                "- TossPay 결제 기능을 구축하여 정기 결제 기능구축",
            ],
            img: k_6, // 이미지 대신 동영상 썸네일로 사용할 k_2를 임시 사용
            link: "https://k-visa.ai", // 동영상 소스 링크 [k3]
            // isVideo: true, // 비디오임을 표시
        },
        {
            title: "행정심판연구소 구축",
            skills: "React , Vite ,  Django",
            description: [
                "- AWS S3 Pre-Signed URL 기술을 활용하여 동영상에 대한 보안접근 구현 및 유효 기간 설정 관리 시스템 구축.",
                "- TossPay 결제연동을 통한 회원가입.로그인등 각종 기능을 구현",
            ],
            img: k_5,
            link: "https://www.hangsim.co.kr"
        },
        {
            title: "행정심판연구소 고도화를 진행",
            skills: "Python, Django, React",
            description: [
                "- 고객후가를 등록할수있도록 어드민에 작업을 진행",
                "- 고객후기 섹션 추가 및 디자인 고도화 + PC버전 디자인 작업을 진행" , 
            ],
            img: k_7, // 이미지 대신 동영상 썸네일로 사용할 k_2
            link: "https://www.hangsim.co.kr"
            // isVideo: true, // 비디오임을 표시
        },
        {
            title: "케이비자 어드민을 개발",
            skills: "Python, Django, React",
            description: [
                "- 서비스화면에서 AI를 통한 비자분석서비스를 이용한 회원데이터를 수집 및 배너 , 블로그 , 후기등 웹사이트 관리에 대한 전반적인 업무를 진행",
                "- 대시보드에서 일자 및 업무별 접수현황 . 진행중인업무수량등을 전반적으로볼수있도록 구현" , 
                "- 유튜브 iframe 링크 입력 시 자동으로 썸네일 이미지를 추출 및 서버에 저장하는 로직을 구현"
            ],
            img: k_8, // 이미지 대신 동영상 썸네일로 사용할 k_2
            link: ""
            // isVideo: true, // 비디오임을 표시
        },
        {
            title: "인허가클리닉 어드민을 개발",
            skills: "Python, Django, React",
            description: [
                "- 서비스화면에서 AI를 통한 인허가 분석서비스를 이용한 회원데이터를 수집 및 배너 , 블로그 , 후기등 웹사이트 관리에 대한 전반적인 업무를 진행",
                "- 대시보드에서 일자 및 업무별 접수현황 . 진행중인업무수량등을 전반적으로볼수있도록 구현" , 
                "- 유튜브 ifram링크를 입력하면 이미지를 추출하는 로컬라이징(Localizing) 하는기능을 적용함으로써 서비스화면에서 속도문제를 해결"
            ],
            img: k_9, // 이미지 대신 동영상 썸네일로 사용할 k_2
            link: ""
            // isVideo: true, // 비디오임을 표시
        },
        {
            title: "행정심판연구소 어드민을 개발",
            skills: "Python, Django, React",
            description: [
                "- 결제를 한고객 및 진행상황을 직관적으로 볼수있도록 개발을 진행",
                "- 고객별로 동영상재생시간을 볼수있도록 작업을 진행" , 
                "- 계좌이체한 고객을 위한 어드민에서 결제완료 처리를 할수 있도록 진행" ,
                "- 고객후기를 직접 입력 후 서비스 화면에서 볼수있도록 구현" ,
            ],
            img: k_10, // 이미지 대신 동영상 썸네일로 사용할 k_2
            link: ""
            // isVideo: true, // 비디오임을 표시
        },
    ];


    // 5. 함수 매개변수에 타입 적용
    const handleToggle = (index: number | null) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    
    // 5. 함수 매개변수에 타입 적용
    const handleProjectClick = (link: string | null, isVideo: boolean = false) => {
        if (isVideo && link) {
            setVideoSource(link);
            setShowVideoModal(true);
        } else if (link) {
            window.open(link, "_blank");
        }
    };
    
    // 비디오 모달 컴포넌트
    const VideoModal: React.FC = () => (
        <VideoModalOverlay 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)} // 오버레이 클릭 시 닫기
        >
            <VideoContainer onClick={(e) => e.stopPropagation()}> {/* 컨테이너 클릭 시 모달 닫힘 방지 */}
                <CloseButton onClick={() => setShowVideoModal(false)}>
                    &times;
                </CloseButton>
                <video 
                    key={videoSource} // key를 변경하여 컴포넌트를 리셋하고 자동 재생을 보장
                    width="100%" 
                    height="100%" 
                    autoPlay 
                    loop 
                    controls 
                    style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
                >
                    <source src={videoSource} type="video/mp4" />
                    현재 브라우저는 비디오 태그를 지원하지 않습니다.
                </video>
            </VideoContainer>
        </VideoModalOverlay>
    );

    return (
        <FlexRowCenterStart
            style={{
                width: "100%",
                height: "100%",
                color: "white", overflow: "auto", 
                paddingBottom:"100px"
            }}
        >
            <FlexColumnStartCenter style={{ color: "black", height: "100%", width: "100%", overflow: "auto" }}>
                <FlexColumnStartStart style={{ width: windowWidth < 700 ? "100%" :"700px", height: "100%",
                alignItems:windowWidth < 700 ? "center":"flex-start" 
                 }}>
                    
                    {/* 개인 정보 섹션 */}
                    <FlexRowStartStart style={{ width: windowWidth < 700 ? "100%" : "700px", marginTop: "150px",
                        justifyContent:windowWidth < 700 ? "center" : "flex-start"
                     }}>
                        <img src={main} style={{ width: "110px", borderRadius: "50%", marginRight: "20px" }} alt="프로필 이미지"/>
                        <FlexColumnCenterStart>
                            <h3 style={{ fontSize: "20px" }}>김성원</h3>
                            <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "15px" }}>풀스택 개발자</span>
                            <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px",
                                flexDirection:windowWidth < 400 ? "column" : "row" , alignItems:windowWidth < 400 ? "flex-start" : "center"
                             }}>
                                <span>+82 10-8075-8012&nbsp;&nbsp;&nbsp;</span>
                                <span style={{ display:windowWidth < 400 ? "none" : "block" }}>|</span>
                                <span>&nbsp;&nbsp;&nbsp;kimeende@naver.com</span>
                            </FlexRowAllCenter>
                        </FlexColumnCenterStart>
                    </FlexRowStartStart>
                    <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", marginTop: "20px" ,
                        width:windowWidth < 700 ? "90%" : "700px"
                     }}>
                        안녕하세요.<br />
                        2019년도부터 개발자 일을하고있는 김성원입니다.<br />
                        Django, Node, React 등 다양한 언어와 프레임워크를 기반으로
                        웹/앱 개발 및 자동화 등 다양한 개발 업무를 진행했습니다.<br />
                        특히, 풍부하고 다양한 기술을 바탕으로
                        회사 내부 인원과 서비스를 이용하는 회원들에게 혁신적인 솔루션을 제공한 경험이 있습니다.<br />
                        새로운 기능 개발에 두려워하지 않고 끊임없이 성장하며
                        다양한 프로젝트에 기여하고 싶습니다.<br />
                        감사합니다.
                    </FlexRowAllCenter>

                    {/* 경력 섹션 */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" :"100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>🚀 </span>
                        <Line>경력</Line>
                    </FlexRowBetweenCenter>
                    {career.map((item, index) => (
                        <FlexColumnCenterStart 
                            style={{
                                border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", 
                                padding: windowWidth < 700 ? "10px" : "10px 25px", width: windowWidth < 700 ? "90%" :"95%", borderRadius: "10px",
                                marginTop: index === 0 ? 0 : 20, marginLeft: windowWidth < 700 ? "0px" : "20px", cursor: "pointer",
                            }} 
                            key={index} 
                            onClick={() => handleToggle(index)}
                        >
                            <FlexRowBetweenCenter style={{ width: "100%" }}>
                                <FlexRowStartStart>
                                    <span style={{ fontSize: "15px" , display:windowWidth < 700 ? "none" : "block" }}>{item.job}</span>
                                    <img src={item.img} style={{ height: "15px", marginLeft: windowWidth < 700 ? "0px" :"10px" }} alt={`${item.job} 로고`} />
                                </FlexRowStartStart>
                                <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px" }}>{item.Date}</span>
                            </FlexRowBetweenCenter>
                            <FlexRowBetweenCenter style={{ width: "100%" }}>
                                <span style={{ marginTop: "10px", fontSize: "14px" }}>{item.intro}</span>
                                <img src={SidaBar}
                                    style={{
                                        height: "20px", transform: expandedIndex === index ? "rotate(270deg)" : "rotate(90deg)", transition: "transform 0.3s ease"
                                    }}
                                    alt="토글 아이콘"
                                />
                            </FlexRowBetweenCenter>
                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{
                                            width: "100%",
                                            marginTop: "10px",
                                            padding: "10px",
                                            backgroundColor: "#f9f9f9",
                                            borderRadius: "10px",
                                            whiteSpace: "pre-line",
                                            fontSize: "13px",
                                            color: "#555",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {item.text}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </FlexColumnCenterStart>
                    ))}
                    
                    {/* 스택 섹션 */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" : "100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>🛠️ </span>
                        <Line>스택</Line>
                    </FlexRowBetweenCenter>
                    <div style={{ display: windowWidth < 700 ? "flex": "grid", gridTemplateColumns: "repeat(2, 1fr)", marginLeft: windowWidth < 700 ? "0px" : "20px", gap: "10px", 
                        width: windowWidth < 700 ? "90%" : "100%",
                        justifyContent:windowWidth < 700 ? "center": "" ,
                        alignItems:windowWidth < 700 ? "center": "" ,
                        flexDirection:windowWidth < 700 ? "column": "row" ,
                 
                    }}>
                        {stack.map((item, index) => (
                            <FlexColumnStartStart style={{
                                border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", padding: "10px", borderRadius: "10px", width: "100%",
                            }} key={index}>
                                <h3 style={{ fontSize: "15px" }}>{item.title}</h3>
                                <FlexRowStartStart style={{ flexWrap: "wrap", marginTop: "10px", gap: 5 }}>
                                    {item.data.map((stackItem, index) => (
                                        <p key={index} style={{
                                            margin: 0, color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px",
                                            backgroundColor: "#eee", padding: "2px 8px", borderRadius: "5px"
                                        }}>
                                            {stackItem}</p>
                                    ))}
                                </FlexRowStartStart>
                            </FlexColumnStartStart>
                        ))}
                    </div>

                    {/* 프로젝트 섹션 */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" :"100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>💻 </span>
                        <Line>프로젝트</Line>
                    </FlexRowBetweenCenter>

                    {/* 주식회사 마켓비 */}
                    <img src={marktet} style={{ height: windowWidth < 700 ? "20px" : "30px", margin: "0px auto 30px 20px" }} alt="마켓비 로고" />
                    <ProjectGrid projects={marketBProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>
                    
                    {/* 집대장 */}
                    <img src = {zip} style={{ height: windowWidth < 700 ? "20px" :"30px", margin: "30px auto 30px 20px" }} alt="집대장 로고" />
                    <ProjectGrid projects={zipProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>

                    {/* 주식회사 어글리스톤 */}
                    <img src = {ugly} style={{ height: windowWidth < 700 ? "20px" :"30px", margin: "30px auto 30px 20px" }} alt="어글리스톤 로고" />
                    <ProjectGrid projects={scrapProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>

                    {/* 바른행정 주식회사 */}
                    <img src = {barun} style={{ height: windowWidth < 700 ? "20px" :"30px", margin: "30px auto 30px 20px" }} alt="바른행정 로고" />
                    <ProjectGrid projects={barunProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>

                </FlexColumnStartStart>
            </FlexColumnStartCenter>

            {/* 비디오 모달 렌더링 */}
            <AnimatePresence>
                {showVideoModal && <VideoModal />}
            </AnimatePresence>

        </FlexRowCenterStart>
    );
}

export default Home;

// 비디오 모달 스타일 컴포넌트
const VideoModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
`;

const VideoContainer = styled.div`
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    width: 800px; /* 고정 최대 너비 */
    height: auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    aspect-ratio: 16 / 9; /* 표준 비디오 비율 */
    background-color: black;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.3);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    z-index: 10001;
    transition: background 0.3s;

    &:hover {
        background: rgba(255, 255, 255, 0.5);
    }
`;

const Line = styled.div`
    background:#f0f0f0;
    width:95%;
    font-weight:bold;
`;
