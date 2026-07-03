import React, { useState , useEffect } from "react";
import {  FlexColumnCenterStart, FlexColumnStartCenter, FlexColumnStartStart, FlexRowAllCenter, FlexRowBetweenCenter,  FlexRowCenterStart,  FlexRowStartStart } from "../css/common";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import SidaBar from "../assets/common/sidebar_back.png";
import marktet from "../assets/logo/marketb.png"
import zip from "../assets/logo/zip.png"
import ugly from "../assets/logo/uglystone.png"
import barun from "../assets/logo/k-visa.png"
import main from "../assets/main.jpg"
import side from "../assets/logo/SideProject.png"

import m_1 from "../assets/project/m_1.png"
import m_2 from "../assets/project/m_2.png"
import m_9 from "../assets/project/m_9.png"
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
import k_6 from "../assets/project/k_6.png"
import k_7 from "../assets/project/k_7.png"
import k_8 from "../assets/project/k_8.png"
import k_9 from "../assets/project/k_9.png"
import k_10 from "../assets/project/k_10.png"
import k_11 from "../assets/project/k_11.png"

import pr_1 from "../assets/project/pr_1.png"
import pr_2 from "../assets/project/pr_2.png"

import blogVideo from "../assets/blog.mov";
import ai from "../assets/ai.mov"
import visa_analyze from "../assets/visa_analyze.mp4"
import no from "../assets/project/no.jpg"

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
    onCardClick: (project: Project) => void;
    windowWidth: number;
}

type ProjectTab = "토이" |"마켓비" | "집대장" | "어글리스톤" | "바른행정";

// ── Styled Components ──────────────────────────────────────────

// ── 프로젝트 이미지 그리드 ─────────────────────────────────────

const GridContainer = styled.div<{ $windowWidth: number }>`
  display: ${props => props.$windowWidth < 700 ? "flex" : "grid"};
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: ${props => props.$windowWidth < 700 ? "100%" : "calc(100% - 20px)"};
  margin-left: ${props => props.$windowWidth < 700 ? "0px" : "20px"};
  padding: ${props => props.$windowWidth < 700 ? "0 10px" : "0"};
  flex-direction: ${props => props.$windowWidth < 700 ? "column" : "row"};
  align-items: ${props => props.$windowWidth < 700 ? "center" : "stretch"};
`;

const ImageCard = styled(motion.div)<{ $windowWidth: number }>`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #f0f0f0;
  width: ${props => props.$windowWidth < 700 ? "100%" : "100%"};
  max-width: ${props => props.$windowWidth < 700 ? "400px" : "none"};
  aspect-ratio: 4 / 3;

  &:hover .overlay {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
`;

const CardPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  color: #888;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  class: overlay;
`;

const OverlayTitle = styled.p`
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  margin: 0;
`;

const OverlaySkills = styled.p`
  color: rgba(255,255,255,0.75);
  font-size: 11px;
  text-align: center;
  margin: 0;
`;



// ── 팝업 모달 ──────────────────────────────────────────────────

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(3px);
`;

const ModalBox = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  width: min(600px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
`;

const ModalImageWrap = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 16px 16px 0 0;
  background: #f0f0f0;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  margin: 0;
`;

const ModalClose = styled.button`
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 18px;
  cursor: pointer;
  color: #555;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: #e5e7eb;
    color: #111;
  }
`;

const SkillTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

const SkillTag = styled.span`
  background-color: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 6px;
  text-transform: uppercase;
  border: 1px solid #e2e8f0;
`;

const DescriptionList = styled.ul`
  margin: 0;
  padding-left: 18px;
  margin-bottom: 20px;
`;

const DescriptionItem = styled.li`
  color: #4b5563;
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 5px;
  list-style-type: disc;

  &::marker {
    color: #cbd5e1;
  }
`;

const ModalActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
`;

const ActionButton = styled.button<{ $isVideo?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.$isVideo ? "#ef4444" : "#2563eb"};
  background: ${props => props.$isVideo ? "#fef2f2" : "#eff6ff"};
  border: 1px solid ${props => props.$isVideo ? "#fecaca" : "#bfdbfe"};
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$isVideo ? "#fee2e2" : "#dbeafe"};
  }
`;

const TabContainer = styled.div<{ $windowWidth: number }>`
  display: flex;
  gap: 8px;
  margin-left: ${props => props.$windowWidth < 700 ? "0px" : "20px"};
  margin-bottom: 28px;
  width: ${props => props.$windowWidth < 700 ? "90%" : "100%"};
  flex-wrap: wrap;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 20px;
  border: 2px solid ${props => props.$active ? "#1a1a1a" : "rgb(229 231 235)"};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  img {
    height: 16px;
    transition: filter 0.2s ease;
  }

  &:hover {
    border-color: #1a1a1a;
  }
`;



// ── ProjectGrid Component (이미지만 노출) ──────────────────────

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onCardClick, windowWidth }) => (
    <GridContainer $windowWidth={windowWidth}>
        {projects.map((project: Project, index: number) => (
            <ImageCard
                key={index}
                $windowWidth={windowWidth}
                onClick={() => onCardClick(project)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                layout
            >
                {project.img === no ? (
                    <CardPlaceholder>COMING SOON</CardPlaceholder>
                ) : (
                    <CardImage src={project.img} alt={project.title} />
                )}

                <CardOverlay className="overlay">
                    <OverlayTitle>{project.title}</OverlayTitle>
                    <OverlaySkills>{project.skills}</OverlaySkills>
                </CardOverlay>

            </ImageCard>
        ))}
    </GridContainer>
);

// ── Main Component ─────────────────────────────────────────────

function Home() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
    const [videoSource, setVideoSource] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [activeTab, setActiveTab] = useState<ProjectTab>("토이");

    // 프로젝트 팝업 상태
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

    // 팝업 열릴 때 스크롤 막기
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    const tabs: { key: ProjectTab; img: string }[] = [
        { key: "토이",     img: side },
        { key: "마켓비",     img: marktet },
        { key: "집대장",     img: zip     },
        { key: "어글리스톤", img: ugly    },
        { key: "바른행정",   img: barun   },
    ];

    const career: CareerItem[] = [
        { job: "바른행정 주식회사", Date: "2024.11 ~", intro: "복잡하고 불투명한 행정 문제를 해결하는 IT기반의 기업", img: barun,
            text: "1. Django,Fast api 등 Python, MySQL 기반 백엔드 기능 개발 및 데이터 관리\n2. React, Vite 기반 웹 프론트엔드 개발 및 UI/UX 유지보수\n3. 플레이스토어·앱스토어 배포 및 약관·서비스 운영 관리\n4. AI 관련 데이터 정리 및 TIPS 과제 관리\n 5. Selenium, Claude API, Google Sheets API 기반 블로그 자동작성 및 데이터 스크래핑 자동화\n6. 블로그 자동작성 및 데이터 스크래핑 등 자동화 업무" },
        { job: "주식회사 어글리스톤", Date: "2022.01 - 2024.11 . 2년 10개월", intro: "리사이클 업계의 불공정한 거래를 해결하고 투명한 거래를 위한 플랫폼", img: ugly,
            text: "1. Django, Python, MySQL 기반 백엔드 시스템 구축 및 데이터 관리\n2. React, Next, Vue.js 기반 웹 프론트엔드 개발 및 UI/UX 유지보수\n3. AWS S3, Solapi, Naver Maps 등 외부 API 연동 및 서비스 기능 구현\n 4. 플레이스토어·앱스토어 배포 및 약관·운영 관리" },
        { job: "집대장", Date: "2021.12 - 2022.01 ‧ 2개월", intro: "전원주택 타운하우스 한옥등 주택을 거래하는 플랫폼", img: zip,
            text: "1. Express , MySQL 기반 백엔드 시스템 구축 및 데이터 관리\n2. React, Redux 기반 웹 프론트엔드 개발 및 UI/UX 유지보수\n 3. 주택 매물 조회 서비스의 지도·3D 스캐닝 기능 연동" },
        { job: "주식회사마켓비", Date: "2019.12 - 2021.11 ‧ 2년", intro: "가성비 높은 가구와 인테리어 소품을 판매하는 온라인 쇼핑몰", img: marktet,
            text: "1. Django, MySQL 기반 백엔드 시스템 구축 및 데이터 관리\n2. 웹 프론트엔드 개발 및 UI/UX 유지보수\n3. 업무 프로세스 자동화 및 인프라 운영\n4. 운영 지원 및 비즈니스 로직 관리\n5. CS/환불 로직 대응 및 운영 이슈 처리" },
    ];

    const stack: StackItem[] = [
        { title: "Language", data: ["JavaScript", "TypeScript", "css", "Python", "SQL"] },
        { title: "FrontEnd", data: ["Next js", "React js", "Zustand", "Redux", "ReactNative", "Styled-Components"] },
        { title: "BackEnd", data: ["Node js", "Socket io", "Docker", "Django", "PostgreSQL", "MySQL"] },
        { title: "Cloud", data: ["AWS", "NaverCloud", "Vercel"] },
        { title: "AI", data: ["Claude API", "OpenAI", "AWS-Bedrock", "OpenSearch", "RAG"] },
        { title: "Etc", data: ["Selenium", "Pandas", "openpyxl", "LLM"] },
    ];

    // ── 토이 프로젝트 ───────────────────────────────────────
    const ToyProjects: Project[] = [
        {
            title: "첫걸음",
            skills: "React, Express ",
            description: [
                "대학생(멘토)과 편입생(멘티)의 정보 등록 및 조건 맞춤형 매칭 서비스",
                "매칭 성공 시 원활한 소통을 지원하기 위한 Socket.io 기반의 실시간 채팅 기능 구현",
                "Kakao 및 Naver OAuth 2.0 기반의 다중 소셜 로그인 및 사용자 인증 기능 구현"
            ],
            img: pr_2,
            link: null
        },
        {
            title: "한국관광지 AI [한국관광지콘텐츠랩]",
            skills: "React, FastApI, Vite , OpenAI API",
            description: [
                "한국관광공사 OpenAPI 표준 데이터를 기반으로 주소지 및 위.경도 정보를 매핑하여 JSON 데이터셋을 고도화하고, 이를 활용한 RAG(검색 증강 생성) 중심의 맞춤형 여행 대화 서비스 구현",
                "사용자가 선택한 광역시·시군구의 관광지 데이터를 필터링하고, 위도,경도를 활용하여 다중 선택된 목적지 간의 최적 이동 경로를 계산하여 제안하는 추천 기능 구현",
                "Kakao OAuth 2.0 기반의 간편 로그인 및 사용자 인증 기능 구현"
            ],
            img: pr_1,
            link: null
        },
    ];

    // ── 마켓비 프로젝트 ───────────────────────────────────────
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
        },
    ];

    // ── 집대장 프로젝트 ───────────────────────────────────────
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
            img: zip,
            link: null
        }
    ];

    // ── 어글리스톤 프로젝트 ───────────────────────────────────
    const uglyProjects: Project[] = [
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

    // ── 바른행정 프로젝트 ──────────────────────────────────────
    const barunProjects: Project[] = [
        {
            title: "행정24 플랫폼 구축 [TIPS 과제]",
            skills: "React, Django",
            description: [
                "행정사와 의뢰인을 연결하는 양방향 매칭 플랫폼 설계 및 개발",
                "설문 기반 클러스터링 알고리즘을 활용한 의뢰인 맞춤형 행정사 추천 기능 구현",
                "카카오톡 알림톡 API 연동을 통해 행정사 업무 진행 현황을 의뢰인에게 실시간 푸시 알림 제공",
                "Kakao 및 Naver OAuth 2.0 기반의 다중 소셜 로그인 및 사용자 인증 기능 구현"
            ],
            img: k_1,
            link: null
        },
        {
            title: "결혼비자 셀프테스트 구축 및 사이트 리뉴얼등 다양한 기능을 개발",
            skills: "React, php",
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
                "외부 대규모 인프라와의 안정적인 데이터 교환을 위해 표준화된 API 인터페이스를 설계하고 통합 유지보수 프로세스 구축",
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
                "Store 배포 및 하이브리드 앱 환경 최적화 수행",
                "Kakao, Naver, Google 등 OAuth 2.0 기반의 다중 소셜 로그인 및 사용자 인증 기능 구현", 
            ],
            img: k_4,
            link: "https://play.google.com/store/apps/details?id=com.kvisaapp"
        },
        {
            title: "행정심판연구소 보안 강의 플랫폼 고도화",
            skills: "React, Vite, Django, AWS S3",
            description: [
                "AWS S3 Pre-Signed URL 기술을 적용하여 유료 강의 콘텐츠 무단 복제 방지 보안 체계 구축",
                "TossPay 결제 모듈 연동 및 사용자 권한별 강의 접근 제어 시스템 구현",
                "고객 후기 관리 시스템 및 PC/모바일 반응형 UI 고도화로 서비스 전환율 개선",
                "Kakao, Naver, Google 등 OAuth 2.0 기반의 다중 소셜 로그인 및 사용자 인증 기능 구현", ],
            img: k_7,
            link: "https://www.hangsim.co.kr"
        },
        {
            title: "통합 관리자(Admin) 시스템 및 대시보드 구축",
            skills: "Python, Django, React",
            description: [
                "사업성장파트너·케이비자·행정심판 등 3개 서비스 통합 어드민 구축으로 운영 관리 효율 200% 향상",
                "일자별 접수 현황 및 업무량 실시간 시각화 대시보드를 통한 데이터 기반 의사결정 지원",
                "유튜브 API 로컬라이징 로직(썸네일 자동 추출 및 서버 저장)을 구현하여 메인 로딩 속도 최적화",
                "고객별 동영상 재생 시간 추적 및 결제 상태(계좌이체/카드) 통합 관리 시스템 구현"
            ],
            img: k_8,
            link: ""
        },
        {
            title: "블로그 자동작성",
            skills: "Python, Selenium, Claude API",
            description: [
                "Selenium 기반 네이버 등 블로그 플랫폼 포스팅 자동화 봇 구축",
                "Claude API를 연동하여 키워드 기반 맞춤형 정보성 콘텐츠 자동 생성 로직 구현",
                "이미지 자동 검색 및 삽입 알고리즘을 통한 포스팅 퀄리티 향상 및 작업 시간 90% 단축",
            ],
            img: k_9,
            link: blogVideo,
            isVideo: true
        },
        {
            title: "케이비자 AI & RAG 시스템 개발 [TIPS 과제]",
            skills: "Python, Django, OpenAI, Upstage OCR",
            description: [
                "Claude API 및 OpenSearch 기반 RAG 시스템 구축으로 법률 상담 답변의 신뢰성 확보",
                "Upstage OCR을 활용한 행정 서류 자동 분석 및 맞춤형 서류 작성 가이드 자동화",
                "Selenium 기반 법령 데이터 스크래핑 파이프라인 구축으로 AI 학습 데이터 수집 자동화",
                "TossPay 정기 결제 시스템 연동을 통한 유료 구독 모델 수익 구조 마련",
                "Kakao, Naver, Google 등 OAuth 2.0 기반의 다중 소셜 로그인 및 사용자 인증 기능 구현",
            ],
            img: k_6,
            link: ai,
            isVideo: true
        },
        {
            title: "AI 비자 자동분석서비스 구축",
            skills: "React, Django, Python, Claude API",
            description: [
                "Claude API(LLM)와 내부 행정 데이터를 결합하여 사용자 맞춤형 비자 발급 가능성 예측 모델 구축",
                "수만 건의 비자 성공/실패 사례 데이터를 컨텍스트로 활용하여 AI 답변의 정확도 및 신뢰성 확보",
                "복잡한 법률 용어로 구성된 비자 요건을 사용자 친화적인 자연어 피드백으로 변환하여 제공",
            ],
            img: k_10,
            link: visa_analyze,
            isVideo: true
        },
        {
            title: "행정돕다 AI",
            skills: "React, FastApi, Python, Claude API",
            description: [
                "Claude API와 내부 행정 데이터를 결합하여 행정 업무에 특화된 맞춤형 AI 모델을 구축",
                "특정사이트의 크롤링 기능을 참고하여 행정업무소식을 매일 오전 자동으로 추출",
                "네이버 데이터랩 , 유튜브 Data API , 구글 Ads API를 통해 사이트별 실시간 검색 키워드를 추출하여 검색마케팅 참고 기능을 구축",
                "내부 행정 데이터를 기반으로 블로그 초안과 유튜브 시나리오를 자동으로 추천 및 생성하는 AI 시스템을 구현",
                "의뢰인 정보와 행정 업무 입력 시 AI가 맞춤형 상담 분석을 수행하고 필요한 서류를 자동으로 작성",
                "Kakao OAuth 2.0 기반의 다중 소셜 로그인 및 사용자 인증 기능 구현",
            ],
            img: k_11,
            link: '',
        },
    ];

    const handleToggle = (index: number | null) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // 카드 클릭 → 팝업 열기
    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
    };

    // 팝업 내 링크/영상 버튼
    const handleProjectAction = (link: string | null, isVideo: boolean = false) => {
        if (isVideo && link) {
            setVideoSource(link);
            setShowVideoModal(true);
        } else if (link) {
            window.open(link, "_blank");
        }
    };

    const VideoModal: React.FC = () => (
        <VideoModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVideoModal(false)}>
            <VideoContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setShowVideoModal(false)}>&times;</CloseButton>
                <video key={videoSource} width="100%" height="100%" autoPlay loop controls style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}>
                    <source src={videoSource} type="video/mp4" />
                    현재 브라우저는 비디오 태그를 지원하지 않습니다.
                </video>
            </VideoContainer>
        </VideoModalOverlay>
    );

    return (
        <FlexRowCenterStart style={{ width: "100%", height: "100%", color: "white", overflow: "auto", paddingBottom: "100px" }}>
            <FlexColumnStartCenter style={{ color: "black", height: "100%", width: "100%", overflow: "auto" }}>
                <FlexColumnStartStart style={{ width: windowWidth < 700 ? "100%" : "700px", height: "100%", alignItems: windowWidth < 700 ? "center" : "flex-start" }}>

                    {/* ── 개인 정보 섹션 ── */}
                    <FlexRowStartStart style={{ width: windowWidth < 700 ? "100%" : "700px", marginTop: "150px", justifyContent: windowWidth < 700 ? "center" : "flex-start" }}>
                        <img src={main} style={{ width: "110px", borderRadius: "50%", marginRight: "20px" }} alt="프로필 이미지" />
                        <FlexColumnCenterStart>
                            <h3 style={{ fontSize: "20px" }}>김성원</h3>
                            <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "15px" }}>AI 서비스 풀스택 개발자</span>
                            <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", flexDirection: windowWidth < 400 ? "column" : "row", alignItems: windowWidth < 400 ? "flex-start" : "center" }}>
                                <span>+82 10-8075-8012&nbsp;&nbsp;&nbsp;</span>
                                <span style={{ display: windowWidth < 400 ? "none" : "block" }}>|</span>
                                <span>&nbsp;&nbsp;&nbsp;kimeende@naver.com</span>
                            </FlexRowAllCenter>
                        </FlexColumnCenterStart>
                    </FlexRowStartStart>

                    {/* ── 자기소개 ── */}
                    <FlexRowAllCenter style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", marginTop: "20px", width: windowWidth < 700 ? "90%" : "700px" }}>
                    안녕하세요. <br/>
                    Claude/OpenAI API와 RAG 시스템 등 최신 AI 기술을 실무에 녹여내는 풀스택 개발자 김성원입니다.<br/>
                    Django와 FastAPI를 활용한 고성능 파이썬 백엔드부터 React 기반의 프론트엔드까지 아우르며 유연한 웹/앱 서비스를 설계해 왔습니다.<br/> 
                    특히 단순한 기술 테스트를 넘어 비자 자동 분석, 법률 상담 챗봇, 블로그 자동화 등 데이터의 신뢰성이 중요한 LLM 기반 서비스를 실제 상용 수준으로 개발하고 안정적으로 운영한 경험이 있습니다.<br/>
                    전북은행, LG U+, CU 등 대기업과의 협업 프로젝트 및 정부 TIPS 과제를 주도적으로 수행하며 높은 기준의 비즈니스 요구사항을 충족하고 대규모 환경에서의 문제 해결력을 키웠습니다. <br/>
                    기술의 변화를 빠르게 흡수하고 이를 실실적인 서비스 가치로 전환하는 데 탁월한 역량을 발휘하며, 앞으로도 도전적인 프로젝트에서 핵심적인 기여를 하고 싶습니다. <br/>
                    감사합니다.
                    </FlexRowAllCenter>

                    {/* ── 경력 섹션 ── */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" : "100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>🚀 </span>
                        <Line>경력</Line>
                    </FlexRowBetweenCenter>
                    {career.map((item, index) => (
                        <FlexColumnCenterStart
                            style={{ border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", padding: windowWidth < 700 ? "10px" : "10px 25px", width: windowWidth < 700 ? "90%" : "95%", borderRadius: "10px", marginTop: index === 0 ? 0 : 20, marginLeft: windowWidth < 700 ? "0px" : "20px", cursor: "pointer" }}
                            key={index}
                            onClick={() => handleToggle(index)}
                        >
                            <FlexRowBetweenCenter style={{ width: "100%" }}>
                                <FlexRowStartStart>
                                    <span style={{ fontSize: "15px", display: windowWidth < 700 ? "none" : "block" }}>{item.job}</span>
                                    <img src={item.img} style={{ height: "15px", marginLeft: windowWidth < 700 ? "0px" : "10px" }} alt={`${item.job} 로고`} />
                                </FlexRowStartStart>
                                <span style={{ color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px" }}>{item.Date}</span>
                            </FlexRowBetweenCenter>
                            <FlexRowBetweenCenter style={{ width: "100%" }}>
                                <span style={{ marginTop: "10px", fontSize: "14px" }}>{item.intro}</span>
                                <img src={SidaBar} style={{ height: "20px", transform: expandedIndex === index ? "rotate(270deg)" : "rotate(90deg)", transition: "transform 0.3s ease" }} alt="토글 아이콘" />
                            </FlexRowBetweenCenter>
                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ width: "100%", marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "10px", whiteSpace: "pre-line", fontSize: "13px", color: "#555", overflow: "hidden" }}>
                                        {item.text}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </FlexColumnCenterStart>
                    ))}

                    {/* ── 스택 섹션 ── */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" : "100%", margin: "30px 0px", fontSize: "20px" }}>
                        <span>🛠️ </span>
                        <Line>Stack</Line>
                    </FlexRowBetweenCenter>
                    <div style={{ display: windowWidth < 700 ? "flex" : "grid", gridTemplateColumns: "repeat(2, 1fr)", marginLeft: windowWidth < 700 ? "0px" : "20px", gap: "10px", width: windowWidth < 700 ? "90%" : "100%", justifyContent: windowWidth < 700 ? "center" : "", alignItems: windowWidth < 700 ? "center" : "", flexDirection: windowWidth < 700 ? "column" : "row" }}>
                        {stack.map((item, index) => (
                            <FlexColumnStartStart style={{ border: "2px solid rgb(229 231 235 / var(--tw-border-opacity, 1))", padding: "10px", borderRadius: "10px", width: "100%" }} key={index}>
                                <h3 style={{ fontSize: "15px" }}>{item.title}</h3>
                                <FlexRowStartStart style={{ flexWrap: "wrap", marginTop: "10px", gap: 5 }}>
                                    {item.data.map((stackItem, index) => (
                                        <p key={index} style={{ margin: 0, color: "rgb(75 85 99/var(--tw-text-opacity,1))", fontSize: "13px", backgroundColor: "#eee", padding: "2px 8px", borderRadius: "5px" }}>
                                            {stackItem}
                                        </p>
                                    ))}
                                </FlexRowStartStart>
                            </FlexColumnStartStart>
                        ))}
                    </div>

                    {/* ── 프로젝트 섹션 ── */}
                    <FlexRowBetweenCenter style={{ width: windowWidth < 700 ? "95%" : "100%", margin: "40px 0px 20px", fontSize: "20px" }}>
                        <span>💻 </span>
                        <Line>Project</Line>
                    </FlexRowBetweenCenter>

                    {/* ── 회사별 탭 버튼 ── */}
                    <TabContainer $windowWidth={windowWidth}>
                        {tabs.map(({ key, img }) => (
                            <TabButton key={key} $active={activeTab === key} onClick={() => setActiveTab(key)}>
                                <img src={img} alt={key} />
                            </TabButton>
                        ))}
                    </TabContainer>

                    {/* ── 탭별 프로젝트 렌더링 (이미지 그리드) ── */}
                    <AnimatePresence mode="wait">
                        {activeTab === "토이" && (
                            <motion.div key="토이" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ width: "100%" }}>
                                <ProjectGrid projects={ToyProjects} onCardClick={handleCardClick} windowWidth={windowWidth} />
                            </motion.div>
                        )}
                        {activeTab === "마켓비" && (
                            <motion.div key="마켓비" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ width: "100%" }}>
                                <ProjectGrid projects={marketBProjects} onCardClick={handleCardClick} windowWidth={windowWidth} />
                            </motion.div>
                        )}
                        {activeTab === "집대장" && (
                            <motion.div key="집대장" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ width: "100%" }}>
                                <ProjectGrid projects={zipProjects} onCardClick={handleCardClick} windowWidth={windowWidth} />
                            </motion.div>
                        )}
                        {activeTab === "어글리스톤" && (
                            <motion.div key="어글리스톤" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ width: "100%" }}>
                                <ProjectGrid projects={uglyProjects} onCardClick={handleCardClick} windowWidth={windowWidth} />
                            </motion.div>
                        )}
                        {activeTab === "바른행정" && (
                            <motion.div key="바른행정" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ width: "100%" }}>
                                <ProjectGrid projects={barunProjects} onCardClick={handleCardClick} windowWidth={windowWidth} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </FlexColumnStartStart>
            </FlexColumnStartCenter>

            {/* ── 프로젝트 상세 팝업 ── */}
            <AnimatePresence>
                {selectedProject && (
                    <ModalOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <ModalBox
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalImageWrap>
                                {selectedProject.img === no ? (
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)", color: "#888", fontSize: "14px", fontWeight: 500, letterSpacing: "1px" }}>
                                        COMING SOON
                                    </div>
                                ) : (
                                    <ModalImage src={selectedProject.img} alt={selectedProject.title} />
                                )}
                            </ModalImageWrap>

                            <ModalBody>
                                <ModalHeader>
                                    <ModalTitle>{selectedProject.title}</ModalTitle>
                                    <ModalClose onClick={() => setSelectedProject(null)}>×</ModalClose>
                                </ModalHeader>

                                <SkillTagContainer>
                                    {selectedProject.skills.split(',').map(s => s.trim()).map((skill, i) => (
                                        <SkillTag key={i}>{skill}</SkillTag>
                                    ))}
                                </SkillTagContainer>

                                <DescriptionList>
                                    {selectedProject.description.map((desc, i) => (
                                        <DescriptionItem key={i}>{desc.replace(/^- /, '')}</DescriptionItem>
                                    ))}
                                </DescriptionList>

                                {selectedProject.link && (
                                    <ModalActionRow>
                                        <ActionButton
                                            $isVideo={!!selectedProject.isVideo}
                                            onClick={() => handleProjectAction(selectedProject.link, selectedProject.isVideo)}
                                        >
                                            {selectedProject.isVideo ? "▶ 영상 보기" : "자세히 보기 →"}
                                        </ActionButton>
                                    </ModalActionRow>
                                )}
                            </ModalBody>
                        </ModalBox>
                    </ModalOverlay>
                )}
            </AnimatePresence>

            {/* ── 영상 모달 ── */}
            <AnimatePresence>
                {showVideoModal && <VideoModal />}
            </AnimatePresence>
        </FlexRowCenterStart>
    );
}

export default Home;

// ── 하단 Styled Components ─────────────────────────────────────

const VideoModalOverlay = styled(motion.div)`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.9); display: flex; align-items: center;
  justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
`;
const VideoContainer = styled.div`
  position: relative; max-width: 90vw; max-height: 90vh; width: 800px;
  height: auto; border-radius: 12px; overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); aspect-ratio: 16 / 9; background-color: black;
`;
const CloseButton = styled.button`
  position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.3);
  color: white; border: none; border-radius: 50%; width: 40px; height: 40px;
  font-size: 24px; cursor: pointer; z-index: 10001; transition: background 0.3s;
  &:hover { background: rgba(255, 255, 255, 0.5); }
`;
const Line = styled.div`
  background: #f0f0f0; width: 95%; font-weight: bold;
`;