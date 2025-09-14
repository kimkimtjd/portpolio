import styled, { keyframes } from "styled-components";
import {
    FlexRowAllCenter, FlexRowStartEnd, FlexRowEndStart, FlexColumnCenterStart, FlexColumnAllCenter
} from "../css/common";
import { useFirstStore } from "../stores/firstStore";
import first_link from "../assets/first/first_link.png"
import first_send from "../assets/first/first_send.png"
import first_delete from "../assets/first/first_delete.png"
import first_pdf from "../assets/first/first_pdf.png"
import { useState, useRef } from "react";
import FirstAiBefore from "./first_ai_before";
import First_Result from "./first_result";


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;


function First() {
    // 검색어   
    const { title, setTitle , addQA } = useFirstStore();
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [answerLoading, setanswerLoading] = useState<boolean>(false); // 로딩 상태

    const SendAnswer = () => {
        addQA({ question: title, answer: ""  });
        setTitle(""); // 입력창 초기화
        setanswerLoading(true); // 로딩 모드
    }

    // 파일 선택 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0]);
        }
    };

    // 파일 첨부 버튼 클릭 -> input 실행
    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    // 파일 삭제 핸들러
    const handleFileRemove = () => {
        setAttachedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // input 초기화
    };

    // 파일 크기 포맷 (KB, MB)
    const formatFileSize = (size: number) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };


    return (
        <>
            
            {answerLoading ? (
            <First_Result />
            ) : (
            <FirstAiBefore />
            )}

            {/* 입력화면 */}
            <InputBox>
                <InputText
                    placeholder="요청하실 내용을 입력해 주세요."
                    value={title ?? ""}  // null 방지
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setTitle(e.target.value)
                    }
                />
                {/* 첨부된 파일 표시 */}
                {attachedFile && (
                    <AttachedFileBox >
                        <FlexRowAllCenter style={{ background: "white", borderRadius: "5px", padding: "13px" }}>
                            <img
                                src={first_pdf}
                                style={{ height: "46px", margin: "0px 10px" }}
                            />
                            <FlexColumnCenterStart style={{ marginLeft: "10px" }}>
                                <span>{attachedFile.name}</span>
                                <FileSizeText>PDF {formatFileSize(attachedFile.size)}</FileSizeText>
                            </FlexColumnCenterStart>
                        </FlexRowAllCenter>
                        <RemoveButton onClick={handleFileRemove}
                            src={first_delete}
                        />
                    </AttachedFileBox>
                )}
                <FlexRowAllCenter style={{ width: "100%", height: "40px" }}>

                    <FlexRowStartEnd style={{ width: "50%", height: "100%" }}>
                        <FlexRowAllCenter
                            onClick={handleAttachClick}
                            style={{ cursor: "pointer", padding: "7px 13px 6px 13px", borderRadius: "10px", background: "white", color: "#84848f", fontSize: "15px", fontWeight: "600" }}>
                            <img
                                src={first_link}
                                style={{ height: "16px", marginRight: "5px" }}
                            />
                            파일첨부
                        </FlexRowAllCenter>
                        {/* 숨겨진 input */}
                        <input
                            type="file"
                            accept="application/pdf"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </FlexRowStartEnd>

                    <FlexRowEndStart style={{ width: "50%", height: "100%" }}>
                        <FlexRowAllCenter
                            onClick={() => SendAnswer()}
                            style={{ cursor: "pointer", padding: "7px 10px 4px 10px", borderRadius: "20px", background: "#1c69ff", color: "#ffffff", fontSize: "15px", fontWeight: "600" }}>
                            <img
                                src={first_send}
                                style={{ height: "16px", marginRight: "5px" }}
                            />
                            전송
                        </FlexRowAllCenter>
                    </FlexRowEndStart>

                </FlexRowAllCenter>
            </InputBox>

        </>
    )
}

export default First;


// 입력창
const InputBox = styled.div`
  width: 1033px;
  padding: 20px 15px 10px 13px;
  border-radius: 10px;
  margin-top:70px;
  margin-bottom:40px;
  background-color: #f5f6f9;
`;

// 입력창
const InputText = styled.textarea.attrs({
    maxLength: 300, // 최대 입력 글자수 300자
})`
  width: 100%;
  max-height: 30px;
  background-color: transparent;
  resize: none;          /* 크기 조절 불가 */
  overflow: auto;        /* 필요시 스크롤 표시 */
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 1.5;
    color: black;      /* 글자 색상 */
    font-size: 18px;      /* 글자 크기 */
    font-weight: 600;     /* 글자 두께 */
  &::placeholder {
    color: #91969c;      /* 글자 색상 */
    font-size: 18px;      /* 글자 크기 */
    font-weight: 600;     /* 글자 두께 */
  }
`;

const AttachedFileBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #333;
`;

const FileSizeText = styled.span`
  font-size: 13px;
  color: #666;
`;

const RemoveButton = styled.img`
  width:20px;
  height:20px;
  cursor: pointer;
  position:relative;
  right:10px;
  top:-5px;
`;


