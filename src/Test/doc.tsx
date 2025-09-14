// react/src/components/DocGenerator.tsx
import React, { useState, useRef } from 'react';
import { modifyWordDocument } from './gasApi';
import { askQuestion } from '../server/first_ai';
import { v4 as uuidv4 } from "uuid";
import { FlexColumnAllCenter, FlexRowAllCenter } from '../css/common';
import doc_first from "../assets/doc/first.png"
import doc_second from "../assets/doc/second.png"
import doc_third from "../assets/doc/third.png"
import doc_four from "../assets/doc/four.png"
import doc_five from "../assets/doc/five.png"

interface FirstOption {
    title: string;
    img: string;
    trual: boolean;
    data?: string[];
}

const DocGenerator: React.FC = () => {


    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>(`
임대사업자 홍길동은 서울특별시 강남구 테헤란로 123에 거주하며, 주민등록번호는 123456-1234567이고, 전화번호는 010-1234-5678입니다. 임대사업자 등록번호는 2024-12345입니다. 임차인 김철수는 서울특별시 강남구 테헤란로 124에 거주하며, 주민등록번호는 234567-2345678이고, 전화번호는 010-2345-6789입니다.

계약서를 작성한 공인중개사는 강남공인중개사이며, 대표자는 이영희이고, 사무소 주소는 서울특별시 강남구 테헤란로 125, 등록번호는 2024-54321이며, 전화번호는 02-1234-5678입니다. 실제 계약을 담당한 공인중개사는 박민수입니다.

해당 주택은 서울특별시 강남구 테헤란로 123에 위치한 아파트로, 민간임대주택 면적은 85㎡이며, 주거전용면적은 70㎡, 공용면적은 15㎡(주거공용면적 10㎡, 그 밖의 공용면적 5㎡)입니다. 민간임대주택의 종류는 장기일반(10년)이고, 건설로 제공됩니다. 임대의무 기간은 10년이며, 개시일은 2025년 1월 1일입니다. 100세대 이상 단지에 해당하며, 부대시설로 주차장, 어린이 놀이터, 주민휴게실이 있습니다.

선순위 담보권은 근저당권으로 설정되어 있으며, 설정금액은 5억원, 설정일자는 2024년 12월 1일입니다. 국세와 지방세 체납은 없으며, 임대보증금 보증에 가입되어 있어 보증 대상 금액은 2억원입니다. 일부 가입 여부는 아니며, 일부 대상 금액은 없고, 보증 미가입 사유도 없습니다.

임대보증금 금액은 2억원이고, 월임대료는 100만원입니다. 임대차 계약기간은 2025년 1월 1일부터 2035년 12월 31일까지입니다. 계약금은 5천만원으로 2025년 1월 1일 지급하며, 중도금 5천만원은 2025년 6월 1일 지급하고, 잔금 1억원은 2025년 12월 1일 지급합니다. 임대차 대금은 국민은행 123-456-789 계좌(예금주: 홍길동)로 입금합니다.
특약사항은 테스트문구와 동일하다
        `);

    const [selectedDoc, setSelectedDoc] = useState<string | null>(null); // 선택된 문서 추적
    const clientUuidRef = useRef<string>(uuidv4());

    const first_option: FirstOption[] = [
        {
            title: "민간건설공사 표준도급계약서", img: doc_first, trual: false,
            data: ["공사명", "공사장소", "착공년월일", "준공예정년월일", "계약금액", "노무비", "계약보증금", "선금", "기성부분금", "지급자재 품목 및 수량", "공종", "공종별 계약금액", "하자보수보증금율 및 금액", "하자담보책임기간", "지체상금율", "대가지급 지연 이자율", "기타사항", "도급인 주소", "도급인 성명", "수급인 주소", "수급인 성명"]
        },
        {
            title: "결혼 배경 진술서", img: doc_second, trual: false,
            data: ["영문 성", "영문명", "생년월일", "성명", "성별", "과거에 다른 이름, 생년월일, 국적을 보유하거나 사용여부", "어머니성", "어머니명", "어머니생년월일", "아버지성", "아버지명", "아버지생년월일",
                "과거 혼인여부 ", "과거혼인여부", "자녀여부", "과거 한국방문기간 , 목적 , 지역", "입국거부.금지 또는 강제퇴거나 출국명령여부", "도움받은사람이름,주소,연락처,관계"]
        },
        {
            title: "사증 발급 인정신청서", img: doc_third, trual: false,
            // data : ["여권성" , "여권명" , "한자이름" , "성별" , "생년월일" , "국적" , "출생국가" , "국가신분증번호" , "다른 성명 사용 여부" , "복수국적여부" ,  "여권종류", "여권번호", "발급국가", "발급지","발급일자", "기간만료일",
            // "다른 여권 소지 여부", "다른 여권 종류", "다른여권번호" , "다른 여권 발급국가" , "다른 여권 기간만료일" , "본국주소" , "현거주지" , "휴대전화" , "일반전화" , " 이메일" ,  "비상연락처 성명","비상연락처 거주국가","비상연락처 전화번호","비상연락처 관계",
            // "혼인사항","배우자 성(영문)","배우자 이름(영문)","배우자 생년월일","배우자 국적", "배우자 거주지", "배우자 연락처", "자녀 유무", "자녀 수",  "최종학력", "학교명", "학교 소재지",  "현재 직업","직장/기관/학교명", "직위/과정",
            // "직장/기관/학교 주소","직장 전화번호", ""
            // ]
        },
        { title: "외국인 배우 초청장", img: doc_four, trual: false },
        {
            title: "표준 임대차 계약서", img: doc_five, trual: false,
            data: [
                "소재지",
                "토지",
                "토지면적",
                "건물",
                "건물면적",
                "임대부분",
                "임대면적",
                "보증금", "계약금", "영수자", "중도금", "중도금날짜", "잔금", "잔금날짜", "차임", "차임일",
                "존속기간", "임대차기간",
                "임대인주소", "임대인주민번호", "임대인전화", "임대인이름", "임대인대리인주소", "임대인주민", "임대대리인",
                "임차인주소", "임차인주민등록번호", "임차인전화", "임차인이름", "임차대리인주소", "임차인주민", "임차대리", "특약사항",
                // 체크박스는 모두 추출요청후 전송
                //ex ) 전세 월세 체크 박스의경우 . 전세여부 . 월세여부 추출 요청후 진행
            ]
            // data: [
            //     // 1. 계약당사자
            //         "임대사업자성명" ,
            //         "임대사업자주소" ,
            //         "임대사업자주민등록번호" ,
            //         "전화번호" ,
            //         "임대사업자등록번호" ,
            //         "임차인성명" , 
            //         "임차인주소" ,
            //         "임차인주민등록번호" , 
            //         "임차인주소" , 

            //     // 2. 공인중개사
            //         "공인중개사사무소이름" ,
            //         "공인중개사대표자" ,
            //         "공인중개사주소" ,
            //         "공인중개사등록번호" ,
            //         "공인중개사전화번호" ,
            //         "공인중개사이름" ,

            //     // 3. 민간임대주택의 표시
            //     "주택소재지",
            //     "주택유형",
            //     "민간임대주택면적",
            //     "주거전용면적",
            //     "공용면적",
            //     "합계",
            //     "주거공용면적",
            //     "그밖의공용면적",
            //     "민간임대주택의종류(공공지원/장기일반/단기/그밖의유형)",
            //     "건설/매입여부",
            //     "임대의무기간",
            //     "임대의무개시일",
            //     "100세대이상단지여부",
            //     "부대시설및복리시설종류",
            //     "선순위담보권설정여부",
            //     "선순위담보권종류",
            //     "선순위담보권설정금액",
            //     "선순위담보권설정일자",
            //     "국세·지방세체납여부",
            //     "임대보증금보증가입여부",
            //     "보증대상금액",
            //     "보증일부가입여부",
            //     "보증일부대상금액",
            //     "보증미가입사유",

            //     // 4. 계약조건
            //     "임대보증금금액",
            //     "월임대료금액",
            //     "임대차계약기간시작일",
            //     "임대차계약기간종료일",
            //     "계약금",
            //     "계약금지급일",
            //     "중도금",
            //     "중도금지급일",
            //     "잔금",
            //     "잔금지급일",
            //     "계좌번호",
            //     "은행",
            //     "예금주"
            // ]
        }
    ];

    // 워드
    const handleGenerate = async (docTitle: string) => {
        setLoading(true);
        setSelectedDoc(docTitle);
        try {
            const selected = first_option.find(doc => doc.title === docTitle);

            // data 배열이 있으면 JSON 추출용 프롬프트 구성
            const fields = selected?.data?.join(", ") || "";
            const prompt = `
                    다음 텍스트에서 각 항목의 값을 정확히 추출해서 JSON으로 만들어줘.
                    항목: [${fields}]
                    텍스트: "${name}"
                    출력 형식:
                    {
                    "주택 소재지": "",
                    "주택 유형 (아파트/연립/다세대/다가구/그 밖의 주택)": "",
                    ...
                    }
                    값이 없으면 빈 문자열로 해주세요.
                    `;
            const res: string | null = await askQuestion(
                prompt,
                "docu",
                name,
                clientUuidRef.current,
            );
            if (res) {
                // ```json ... ``` 부분만 정규식으로 추출
                var jsonClean = res.replace(/```json|```/g, "").trim();
                var jsonData = JSON.parse(jsonClean);

                console.log("추출된 JSON:", jsonData);

                console.log(jsonData)
                await modifyWordDocument(jsonData);
            }
        } catch (e) {
            console.error("문서 생성 중 오류:", e);
        } finally {
            setLoading(false);
            setSelectedDoc(null);
        }
    };

    // 한글
    const handleGenerateHwpx = async (docTitle: string) => {
        setLoading(true);
        setSelectedDoc(docTitle);
        const hwpxRes = await fetch("http://localhost:8000/api/modify-hwp/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                replacements: {
                    "{{1}}": "김", "{{2}}": "성원"
                }
            }),
        });

        if (!hwpxRes.ok) throw new Error("HWPX 생성 실패");

        const blob = await hwpxRes.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "modified.hwpx";
        link.click();
        URL.revokeObjectURL(link.href);

        setLoading(false);
    };

    return (
        <FlexColumnAllCenter style={{ width: "100%", height: "100%" }}>
            <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="내용을 입력하세요"
            />

            <FlexRowAllCenter style={{ cursor: "pointer", marginTop: "200px" }}>
                {first_option.map((a, idx) => (
                    <FlexColumnAllCenter
                        key={idx}
                        style={{ marginRight: "20px", position: "relative" }}
                    >
                        {/* hover시 이미지 보이도록 */}
                        <div style={{
                            width: "210px",
                            height: "297px",
                            border: "1px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden"
                        }}
                            className="doc-card">
                            <img
                                src={a.img}
                                alt={a.title}

                                className="doc-img"
                            />
                            {/* 버튼 */}
                            <button
                                disabled={loading && selectedDoc === a.title}
                                onClick={() => handleGenerate(a.title)}
                                style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    background: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    padding: "6px 12px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                {loading && selectedDoc === a.title ? "로딩 중..." : "문서 생성"}
                            </button>
                            <button
                                disabled={loading && selectedDoc === a.title}
                                onClick={() => handleGenerateHwpx(a.title)}
                                style={{ background: "#28a745", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }}
                            >
                                {loading && selectedDoc === a.title ? "로딩..." : "HWPX 생성"}
                            </button>
                        </div>
                        <span style={{ marginTop: "10px" }}>{a.title}</span>
                    </FlexColumnAllCenter>
                ))}
            </FlexRowAllCenter>


            {/* CSS: hover 시 이미지 노출 */}
            <style>{`
                .doc-img {
                    width:100%;
                    height:100%;
                    display: none;
                }
                .doc-card:hover .doc-img {
                    display: block;
                }
            `}</style>
        </FlexColumnAllCenter>
    );
};

export default DocGenerator;
