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
import m_9 from "../assets/project/m_9.png"
// import m_9 from "../assets/project/m_9.png"
import zi from "../assets/project/z_1.png"
import sc_1 from "../assets/project/sc_1.jpg"
import sc_2 from "../assets/project/sc_2.jpg"
import sc_3 from "../assets/project/sc_3.jpg"
import sc_4 from "../assets/project/sc_4.jpg"
import sc_5 from "../assets/project/sc_5.jpg"

import k_1 from "../assets/project/k_1.png"
import k_2 from "../assets/project/k_2.png"
import k_3 from "../assets/project/k_3.png"
import k_4 from "../assets/project/k_4.webp"
// import k_5 from "../assets/project/k_5.png"
import k_6 from "../assets/project/k_6.png"
import k_7 from "../assets/project/k_7.png"
import k_8 from "../assets/project/k_8.png"
import k_9 from "../assets/project/k_9.png"
import k_10 from "../assets/project/k_10.png"
import blogVideo from "../assets/blog.mov"; // 경로 확인
import ai from "../assets/ai.mov"

import visa_analyze from "../assets/visa_analyze.mp4"

// import k_10 from "../assets/project/k_10.png"

import no from "../assets/project/no.jpg"


// 1. 필요한 타입 정의
interface Project {
    title: string;
    skills: string; // "Django, Docker" 형태
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

// ==========================================
// [디자인 수정 섹션] 스타일 컴포넌트 정의
// ==========================================

const GridContainer = styled.div<{ $windowWidth: number }>`
  display: ${props => props.$windowWidth < 700 ? "flex" : "grid"};
  grid-template-columns: repeat(2, 1fr); /* 3열에서 2열로 변경하여 카드 크기 확보 및 가독성 향상 */
  gap: 25px; /* 간격 넓힘 */
  width: ${props => props.$windowWidth < 700 ? "100%" : "calc(100% - 20px)"};
  margin-left: ${props => props.$windowWidth < 700 ? "0px" : "20px"};
  padding: ${props => props.$windowWidth < 700 ? "0 10px" : "0"};
  flex-direction: ${props => props.$windowWidth < 700 ? "column" : "row"};
  align-items: ${props => props.$windowWidth < 700 ? "center" : "stretch"};
`;

const ProjectCard = styled(motion.div)<{ $isClickable: boolean; $windowWidth: number }>`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: ${props => props.$windowWidth < 700 ? "100%" : "100%"};
  max-width: ${props => props.$windowWidth < 700 ? "400px" : "none"};
  cursor: ${props => props.$isClickable ? "pointer" : "default"};
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    ${props => props.$isClickable && `
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: #e0e0e0;
    `}
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px; /* 높이 약간 조절 */
  overflow: hidden;
  background-color: #f8f9fa;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05); /* 호버 시 이미지 미세 확대 */
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  color: #888;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  backdrop-filter: blur(1px);
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const SkillTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
`;

const SkillTag = styled.span`
  background-color: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  border: 1px solid #e2e8f0;
`;

const DescriptionList = styled.ul`
  margin: 0;
  padding-left: 18px;
  margin-bottom: 15px;
  flex-grow: 1; /* 텍스트가 적어도 링크가 하단에 위치하도록 */
`;

const DescriptionItem = styled.li`
  color: #4b5563;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 4px;
  list-style-type: disc;

  &::marker {
    color: #cbd5e1; /* 불릿 포인트 색상 조절 */
  }
`;

const ActionLink = styled.div<{ $isVideo: boolean }>`
  text-align: right;
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.$isVideo ? "#ef4444" : "#2563eb"};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
  margin-top: auto;

  &:hover {
    text-decoration: underline;
  }
`;

// ==========================================
// [컴포넌트 수정 Section] ProjectGrid
// ==========================================
const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, handleProjectClick , windowWidth }) => (
    <GridContainer $windowWidth={windowWidth}>
        {projects.map((project: Project, index: number) => {
            // skills 문자열을 배열로 변환
            const skillArray = project.skills.split(',').map(s => s.trim());
            const isClickable = !!project.link;

            return (
                <ProjectCard
                    key={index}
                    $isClickable={isClickable}
                    $windowWidth={windowWidth}
                    onClick={() => handleProjectClick(project.link, project.isVideo)}
                    layout // framer-motion layout animation
                >
                    <ImageWrapper>
                        {project.img === no ? (
                            <PlaceholderImage>COMING SOON</PlaceholderImage>
                        ) : (
                            <ProjectImage src={project.img} alt={project.title} />
                        )}
                        
                        {/* 비디오 아이콘 오버레이 */}
                        {project.isVideo && (
                            <VideoOverlay>
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    ▶
                                </motion.span>
                            </VideoOverlay>
                        )}
                    </ImageWrapper>

                    <CardContent>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        
                        {/* 기술 스택을 Tag 형태로 시각화 */}
                        <SkillTagContainer>
                            {skillArray.map(skill => (
                                <SkillTag key={skill}>{skill}</SkillTag>
                            ))}
                        </SkillTagContainer>

                        {/* 설명 레이아웃 변경 */}
                        <DescriptionList>
                            {project.description.map((desc: string, descIndex: number) => (
                                <DescriptionItem key={descIndex}>
                                    {/* 기존 "- " 제거 */}
                                    {desc.replace(/^- /, '')}
                                </DescriptionItem>
                            ))}
                        </DescriptionList>
                        
                        {project.link && (
                            <ActionLink $isVideo={!!project.isVideo}>
                                {project.isVideo ? "▶ 시연 영상 보기" : "자세히 보기 →"}
                            </ActionLink>
                        )}
                    </CardContent>
                </ProjectCard>
            );
        })}
    </GridContainer>
);

// ==========================================
// Home 컴포넌트는 기존 코드 유지 (Company Logo 마진만 살짝 조절)
// ==========================================
function Home() {
    // ... (기존 useState, useEffect, career, stack 데이터 유지) ...
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); 
    const [showVideoModal, setShowVideoModal] = useState<boolean>(false); 
    const [videoSource, setVideoSource] = useState<string>(""); 
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setExpandedIndex(null);
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const career: CareerItem[] = [
        { job: "바른행정 주식회사", Date: "2024.11 ~", intro: "복잡하고 불투명한 행정 문제를 해결하는 IT기반의 기업", img: barun, 
            text: "1. 웹 프론트엔드 개발 및 UI/UX 유지보수\n2. 백엔드 시스템 구축 및 데이터 관리\n3. 플레이스토어 및 앱스토어 배포 및 약관등 관리\n4. AI관련 데이터 정리 및 TIPS 과제 관리\n5. 블로그 자동작성 및 데이터 스크래핑등 부가적인 자동화업무" },
        { job: "주식회사 어글리스톤", Date: "2022.01 - 2024.11 . 2년 10개월", intro: "리사이클 업계의 불공정한 거래를 해결하고 투명한 거래를 위한 플랫폼", img: ugly, 
            text: "1. 웹 프론트엔드 개발 및 UI/UX 유지보수\n2. 백엔드 시스템 구축 및 데이터 관리\n3. 플레이스토어 배포 및 약관등 관리" },
        { job: "집대장", Date: "2021.12 - 2022.01 ‧ 2개월", intro: "전원주택 타운하우스 한옥등 주택을 거래하는 플랫폼", img: zip, 
            text: "1. 웹 프론트엔드 개발 및 UI/UX 유지보수\n2. 백엔드 시스템 구축 및 데이터 관리" },
        { job: "주식회사마켓비", Date: "2019.12 - 2021.11 ‧ 2년", intro: "가성비 높은 가구와 인테리어 소품을 판매하는 온라인 쇼핑몰", img: marktet, 
            text: "1. 웹 프론트엔드 개발 및 UI/UX 유지보수\n2. 백엔드 시스템 구축 및 데이터 관리\n3. 업무 프로세스 자동화 및 인프라 운영\n4. 운영 지원 및 비즈니스 로직 관리\n5. CS/환불 로직 대응: 소비자 환불 등 플랫폼 운영 과정에서 발생하는 기술적·행정적 이슈 해결 및 운영 지원." },
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
            title: "위탁 관리 자동화 및 전용 웹사이트 구축", 
            skills: "Django, Docker, Vue", 
            description: [
                "24시간 적립금 자동 충전 시스템(실시간 입금 확인 로직) 구축으로 위탁 업체 정산 업무 자동화",
                "Docker 컨테이너화(Packaging)를 통한 개발 환경 표준화로 팀 내 버전 충돌 이슈 100% 해결",
                "대규모 데이터 이전 시 백업 및 정합성 검증 프로세스 리딩으로 무결성 확보"
            ], 
            img: m_1, 
            link: "https://www.getnews.co.kr/news/articleView.html?idxno=510954" 
        },
        { 
            title: "대리점 안내 및 길찾기 서비스", 
            skills: "Django, Vue, NaverMap", 
            description: [
                "전국 대리점 위치 정보 시각화 및 지역별 방문 네비게이션 기능 연동",
                "전화 연결, 주소 복사 등 편의 기능 최적화를 통한 오프라인 매장 접근성 강화"
            ], 
            img: m_2, 
            link: null 
        },
        { 
            title: "이커머스 운영 자동화 및 ERP 연동", 
            skills: "Python, Selenium, Google API", 
            description: [
                "Google Sheets API를 활용한 실시간 매출/재고 현황 공유 및 ERP 업무 자동화 시스템 구축",
                "기획전 타이머 기반 자동 오픈 시스템 및 이벤트 지원자 자동 취합 봇 개발"
            ], 
            img: m_9, 
            link: null 
        }
    ];

    // 집대장 프로젝트
    const zipProjects: Project[] = [
        { 
            title: "전원주택 특화 매물 정보 플랫폼", 
            skills: "Node.js, React, MySQL", 
            description: [
                "T-Map/Kakao Map API 연동을 통한 고도화된 위치 기반 매물 필터링 및 길찾기 시스템 구현",
                "커스텀 마커 및 거리뷰 기능을 결합한 사용자 친화적 지도 인터페이스 개발"
            ], 
            img: zi, 
            link: null 
        },
        { 
            title: "360도 VR 스마트뷰 솔루션", 
            skills: "React, Three.js", 
            description: [
                "360도 카메라 데이터를 활용한 웹 기반 VR 뷰어 구축으로 비대면 임장 환경 제공",
                "부동산 특화 UX에 맞춘 3D 인터랙션 기능 구현"
            ], 
            img: zip , 
            link: null 
        }
    ];

    // 주식회사 어글리스톤 프로젝트
    const scrapProjects: Project[] = [
        { 
            title: "스크랩마켓 B2B 플랫폼 구축", 
            skills: "Django, React, AWS, NaverCloud", 
            description: [
                "메인(AWS)-채팅(NaverCloud) 서버 분리 설계를 통해 대규모 트래픽 안정성 확보",
                "명함 커스텀 전송 시 발생하는 리소스 부하를 이미지 렌더링 방식 전환으로 해결(로딩 속도 개선)",
                "실시간 거래 시세 자동 반영 시스템 구축을 통한 플랫폼 거래 투명성 및 신뢰도 확보",
                "채팅, 경매, 지도 기반 거래 매칭 등 비즈니스 핵심 기능 개발"
            ], 
            img: sc_1, 
            link: null 
        },
        { 
            title: "스크랩마켓 앱 구현", 
            skills: "ReactNative, Django", 
            description: [
                "WebView 기반 아키텍처 설계를 통한 웹-앱 간 리소스 공유 및 배포 효율성 극대화",
                "Bridge 기술을 활용한 하이브리드 전용 기능 연동 및 사용자 경험 고도화",
                "DeepLink 네비게이션 설계를 통해 특정 서비스 접근성 향상 및 사용자 재방문 지표 개선"
            ], 
            img: ugly, 
            link: null 
        },
        { 
            title: "리사이클재료 실시간 시세 위젯 구현", 
            skills: "ReactNative, Django", 
            description: [
                "AOS 위젯을 활용해 앱 실행 없이 고철 시세를 실시간으로 확인할 수 있는 모니터링 시스템 구축",
            ], 
            img: sc_2, 
            link: null 
        },
        { 
            title: "스크랩마켓 앱 실시간 시세 화면 구현", 
            skills: "ReactNative, Django", 
            description: [
                "비철·희귀금속 실시간 시세 데이터를 자동 반영하여 최신 거래 정보 제공",
                "전일 대비·전월 대비 등락률을 시각적으로 표시하여 사용자 데이터 가독성 향상",
            ], 
            img: sc_3, 
            link: null 
        },
        { 
            title: "스크랩마켓 웹뷰 기반 실시간 매물 지도 구현", 
            skills: "ReactNative, Django", 
            description: [
                "WebView 기반 지도 화면을 앱에 연동하여 웹-앱 간 리소스 공유 및 배포 효율성 극대화",
                "현재 위치 기반 반경 내 매물을 실시간으로 표시하여 거래 매칭 접근성 향상",
                "필터 기능을 통해 원하는 조건의 매물만 선별하여 사용자 탐색 경험 개선"
            ], 
            img: sc_4, 
            link: null 
        },
        { 
            title: "스크랩마켓 웹뷰 기반 실시간 채팅 및 FCM 구현", 
            skills: "ReactNative, Django", 
            description: [
                "WebView 기반 채팅 화면을 앱에 연동하여 웹-앱 간 리소스 공유 및 배포 효율성 극대화",
                "Bridge 기술을 활용해 FCM 푸시 알림 수신 등 네이티브 기능과 웹뷰 간 연동 구현",
                "명함 정보 커스텀 전송 기능을 통한 B2B 거래 상대방 신뢰도 확인 및 사용자 경험 개선"
            ], 
            img: sc_5, 
            link: null 
        }
    ];
    
    // 바른행정 주식회사 프로젝트
    const barunProjects: Project[] = [
        {
            title: "행정24 플랫폼 구축 [TIPS 과제]",
            skills: "React, Django",
            description: [
                "행정사와 의뢰인을 연결하는 양방향 매칭 플랫폼 설계 및 개발",
                "설문 기반 클러스터링 알고리즘을 활용한 의뢰인 맞춤형 행정사 추천 기능 구현",
                "카카오톡 알림톡 API 연동을 통해 행정사 업무 진행 현황을 의뢰인에게 실시간 푸시 알림 제공",
            ],
            img: k_1,
            link: null
        },
        {
            title: "결혼비자 셀프테스트 구축 및 사이트 리뉴얼등 다양한 기능을 개발",
            skills: "React , php",
            description: [
                "결혼비자(F-6) 발급 요건 충족 여부를 실시간으로 판별하는 자가 진단(Self-Test) 엔진 설계 및 구축",
                "상담 전 사전 검증 단계를 도입하여 부적합 상담 문의율을 감소시키고 전문 행정사 업무 효율성 제고",
            ],
            img: k_3,
            link: null
        },
        { 
            title: "대기업 협업 비자 접수 플랫폼 [파트너스]", 
            skills: "Next.js, Django", 
            description: [
                "전북은행(브라보코리아), LG U+, CU 등 대형 파트너사 채널과의 유기적인 연동을 위한 전용 비자 접수 플랫폼 개발",
                "외부 대규모 인프라와의 안정적인 데이터 교환을 위해 표준화된 API 인터페이스를 설계하고 통합 유지보수 프로세스 구축" ,
                "QR 기반 상담 설문과 담당자 자동 배정 로직을 구현하여 초기 접수부터 응대까지의 리드타임(Lead-time) 대폭 단축",
                "다수의 채널에서 유입되는 고객 정보를 정확하게 분류하고 관리할 수 있는 백엔드 비즈니스 로직 고도화"
            ], 
            img: k_2, 
            link: "https://www.fetv.co.kr/news/article.html?no=191348" 
        },
        { 
            title: "케이비자 알리미 및 위젯 (App)", 
            skills: "React Native, Django", 
            description: [
                "비자 만료 기간 자동 감지 및 FCM 알림 발송 시스템 구축으로 사용자 리텐션 강화",
                "안드로이드 위젯 기능을 개발하여 앱 진입 없이도 실시간 만료 정보 확인 환경 제공",
                "Store 배포 및 하이브리드 앱 환경 최적화 수행"
            ], 
            img: k_4, 
            link: "https://play.google.com/store/apps/details?id=com.kvisaapp" 
        },
        { 
            title: "케이비자 AI & RAG 시스템 개발 [TIPS 과제]", 
            skills: "Python, Django, OpenAI, Upstage OCR", 
            description: [
                "Claude Api 및 OpenSearch 기반 RAG 시스템 구축으로 법률 상담 답변의 신뢰성 확보",
                "Upstage OCR을 활용한 행정 서류 자동 분석 및 맞춤형 서류 작성 가이드 자동화",
                "Selenium 기반 법령 데이터 스크래핑 파이프라인 구축으로 AI 학습 데이터 수집 자동화",
                "TossPay 정기 결제 시스템 연동을 통한 유료 구독 모델 수익 구조 마련"
            ], 
            img: k_6, 
            link: ai ,
            isVideo: true 
        },
        { 
            title: "행정심판연구소 보안 강의 플랫폼 고도화", 
            skills: "React, Vite, Django, AWS S3", 
            description: [
                "AWS S3 Pre-Signed URL 기술을 적용하여 유료 강의 콘텐츠 무단 복제 방지 보안 체계 구축",
                "TossPay 결제 모듈 연동 및 사용자 권한별 강의 접근 제어 시스템 구현",
                "고객 후기 관리 시스템 및 PC/모바일 반응형 UI 고도화로 서비스 전환율 개선"
            ], 
            img: k_7, 
            link: "https://www.hangsim.co.kr" 
        }, 
        { 
            title: "통합 관리자(Admin) 시스템 및 대시보드 구축", 
            skills: "Python, Django, React", 
            description: [
                "사업성장파트너·케이비자·행정심판 등 3개 서비스 통합 어드민 구축으로 운영 관리 효율 200% 향상 - 케이비자,사업성장파트너",
                "일자별 접수 현황 및 업무량 실시간 시각화 대시보드를 통한 데이터 기반 의사결정 지원 - 케이비자,사업성장파트너",
                "유튜브 API 로컬라이징 로직(썸네일 자동 추출 및 서버 저장)을 구현하여 메인 로딩 속도 최적화 - 행정심판연구소",
                "고객별 동영상 재생 시간 추적 및 결제 상태(계좌이체/카드) 통합 관리 시스템 구현 - 행정심판연구소"
            ], 
            img: k_8, 
            link: "" 
        },
        { 
            title: "AI 비자 자동분석서비스 구축", 
            skills: "React , Django , Python", 
            description: [
                "Claude API(LLM)와 내부 행정 데이터를 결합하여 사용자 맞춤형 비자 발급 가능성 예측 모델 구축",
                "수만 건의 비자 성공/실패 사례 데이터를 컨텍스트로 활용하여 AI 답변의 정확도 및 신뢰성 확보",
                "복잡한 법률 용어로 구성된 비자 요건을 사용자 친화적인 자연어 피드백으로 변환하여 제공",
            ], 
            img: k_10, // 적절한 이미지 변수로 교체 가능
            link: visa_analyze, // 실제 mp4 파일 경로로 수정하세요
            isVideo: true 
        },
        { 
            title: "블로그 자동작성", 
            skills: "Python, Selenium , Claude api", 
            description: [
                "Selenium 기반 네이버 등 블로그 플랫폼 포스팅 자동화 봇 구축",
                "Claude API를 연동하여 키워드 기반 맞춤형 정보성 콘텐츠 자동 생성 로직 구현",
                "이미지 자동 검색 및 삽입 알고리즘을 통한 포스팅 퀄리티 향상 및 작업 시간 90% 단축",
            ], 
            img: k_9, // 적절한 이미지 변수로 교체 가능
            link: blogVideo, // 실제 mp4 파일 경로로 수정하세요
            isVideo: true 
        },
    ];

    const handleToggle = (index: number | null) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    
    const handleProjectClick = (link: string | null, isVideo: boolean = false) => {
        if (isVideo && link) {
            setVideoSource(link);
            setShowVideoModal(true);
        } else if (link) {
            window.open(link, "_blank");
        }
    };
    
    const VideoModal: React.FC = () => (
        <VideoModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVideoModal(false)} >
            <VideoContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setShowVideoModal(false)}>&times;</CloseButton>
                <video key={videoSource} width="100%" height="100%" autoPlay loop controls style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }} >
                    <source src={videoSource} type="video/mp4" />
                    현재 브라우저는 비디오 태그를 지원하지 않습니다.
                </video>
            </VideoContainer>
        </VideoModalOverlay>
    );

    return (
        <FlexRowCenterStart
            style={{
                width: "100%", height: "100%", color: "white", overflow: "auto", paddingBottom:"100px"
            }}
        >
            <FlexColumnStartCenter style={{ color: "black", height: "100%", width: "100%", overflow: "auto" }}>
                <FlexColumnStartStart style={{ width: windowWidth < 700 ? "100%" :"700px", height: "100%", alignItems:windowWidth < 700 ? "center":"flex-start" }}>
                    
                    {/* 개인 정보 섹션 (유지) */}
                    <FlexRowStartStart style={{ width: windowWidth < 700 ? "100%" : "700px", marginTop: "150px", justifyContent:windowWidth < 700 ? "center" : "flex-start" }}>
                        <img src={main} style={{ width: "110px", borderRadius: "50%", marginRight: "20px" }} alt="프로필 이미지"/>
                        <FlexColumnCenterStart>
                            <h3 style={{ fontSize: "20px" }}>김성원</h3>
                            <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "15px" }}>풀스택 개발자</span>
                            <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", flexDirection:windowWidth < 400 ? "column" : "row" , alignItems:windowWidth < 400 ? "flex-start" : "center" }}>
                                <span>+82 10-8075-8012&nbsp;&nbsp;&nbsp;</span>
                                <span style={{ display:windowWidth < 400 ? "none" : "block" }}>|</span>
                                <span>&nbsp;&nbsp;&nbsp;kimeende@naver.com</span>
                            </FlexRowAllCenter>
                        </FlexColumnCenterStart>
                    </FlexRowStartStart>
                    <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", marginTop: "20px", width: windowWidth < 700 ? "90%" : "700px" }}>
    안녕하세요.<br />
    2019년도부터 개발자로 일하고 있는 김성원입니다.<br />
    Django, Node, React 등 다양한 언어와 프레임워크를 기반으로 웹/앱 개발 및 자동화 등 다양한 개발 업무를 진행했습니다.<br />
    특히, 풍부하고 다양한 기술을 바탕으로 회사 내부 인원과 서비스를 이용하는 회원들에게 혁신적인 솔루션을 제공한 경험이 있습니다.<br />
    최근에는 Claude API, OpenAI, RAG 시스템 등 AI 기술을 실무에 적극 도입하여 비자 자동 분석, 법률 상담 챗봇, 블로그 자동 생성 등 다양한 AI 기반 서비스를 개발한 경험이 있습니다.<br />
    새로운 기능 개발에 두려워하지 않고 끊임없이 성장하며 다양한 프로젝트에 기여하고 싶습니다.<br />
    감사합니다.
</FlexRowAllCenter>

                    {/* 경력 섹션 (유지) */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" :"100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>🚀 </span>
                        <Line>경력</Line>
                    </FlexRowBetweenCenter>
                    {career.map((item, index) => (
                        <FlexColumnCenterStart 
                            style={{ border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", padding: windowWidth < 700 ? "10px" : "10px 25px", width: windowWidth < 700 ? "90%" :"95%", borderRadius: "10px", marginTop: index === 0 ? 0 : 20, marginLeft: windowWidth < 700 ? "0px" : "20px", cursor: "pointer", }} 
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
                                <img src={SidaBar} style={{ height: "20px", transform: expandedIndex === index ? "rotate(270deg)" : "rotate(90deg)", transition: "transform 0.3s ease" }} alt="토글 아이콘" />
                            </FlexRowBetweenCenter>
                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ width: "100%", marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "10px", whiteSpace: "pre-line", fontSize: "13px", color: "#555", overflow: "hidden" }} >
                                        {item.text}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </FlexColumnCenterStart>
                    ))}
                    
                    {/* 스택 섹션 (유지) */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" : "100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>🛠️ </span>
                        <Line>스택</Line>
                    </FlexRowBetweenCenter>
                    <div style={{ display: windowWidth < 700 ? "flex": "grid", gridTemplateColumns: "repeat(2, 1fr)", marginLeft: windowWidth < 700 ? "0px" : "20px", gap: "10px", width: windowWidth < 700 ? "90%" : "100%", justifyContent:windowWidth < 700 ? "center": "" , alignItems:windowWidth < 700 ? "center": "" , flexDirection:windowWidth < 700 ? "column": "row" , }}>
                        {stack.map((item, index) => (
                            <FlexColumnStartStart style={{ border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", padding: "10px", borderRadius: "10px", width: "100%", }} key={index}>
                                <h3 style={{ fontSize: "15px" }}>{item.title}</h3>
                                <FlexRowStartStart style={{ flexWrap: "wrap", marginTop: "10px", gap: 5 }}>
                                    {item.data.map((stackItem, index) => (
                                        <p key={index} style={{ margin: 0, color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", backgroundColor: "#eee", padding: "2px 8px", borderRadius: "5px" }}>
                                            {stackItem}</p>
                                    ))}
                                </FlexRowStartStart>
                            </FlexColumnStartStart>
                        ))}
                    </div>

                    {/* 프로젝트 섹션 - 수정됨 */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" :"100%", margin: "40px 0px 20px", fontSize: "20px" }}>
                        <span>💻 </span>
                        <Line>프로젝트</Line>
                    </FlexRowBetweenCenter>

                    {/* 주식회사 마켓비 - 로고 마진 수정 */}
                    <img src={marktet} style={{ height: windowWidth < 700 ? "22px" : "28px", margin: "20px auto 25px 20px", display: 'block' }} alt="마켓비 로고" />
                    <ProjectGrid projects={marketBProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>
                    
                    {/* 집대장 */}
                    <img src = {zip} style={{ height: windowWidth < 700 ? "22px" :"28px", margin: "50px auto 25px 20px", display: 'block' }} alt="집대장 로고" />
                    <ProjectGrid projects={zipProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>

                    {/* 주식회사 어글리스톤 */}
                    <img src = {ugly} style={{ height: windowWidth < 700 ? "22px" :"28px", margin: "50px auto 25px 20px", display: 'block' }} alt="어글리스톤 로고" />
                    <ProjectGrid projects={scrapProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>

                    {/* 바른행정 주식회사 */}
                    <img src = {barun} style={{ height: windowWidth < 700 ? "22px" :"28px", margin: "50px auto 25px 20px", display: 'block' }} alt="바른행정 로고" />
                    <ProjectGrid projects={barunProjects} handleProjectClick={handleProjectClick} windowWidth ={windowWidth}/>

                </FlexColumnStartStart>
            </FlexColumnStartCenter>

            <AnimatePresence>
                {showVideoModal && <VideoModal />}
            </AnimatePresence>

        </FlexRowCenterStart>
    );
}

export default Home;

// 비디오 모달 스타일 컴포넌트 (유지)
const VideoModalOverlay = styled(motion.div)`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
`;
const VideoContainer = styled.div`
    position: relative; max-width: 90vw; max-height: 90vh; width: 800px; height: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); aspect-ratio: 16 / 9; background-color: black;
`;
const CloseButton = styled.button`
    position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.3); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; z-index: 10001; transition: background 0.3s; &:hover { background: rgba(255, 255, 255, 0.5); }
`;
const Line = styled.div`
    background:#f0f0f0; width:95%; font-weight:bold;
`;