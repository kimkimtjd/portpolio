import { useState, useRef, useEffect } from 'react';
import { HomeTitle } from '../css/common.tsx';
import { useNavigate } from 'react-router-dom';

// ResizeHandle 컴포넌트 분리
// const ResizeHandle = ({ top, onMouseDown }) => {
//   return (
//     <div
//       className="resize-handle"
//       onMouseDown={onMouseDown}
//       style={{
//         position: 'absolute',
//         top: `${top}px`,
//         left: '0%',
//         width: '100%',
//         height: '2px',
//         cursor: 'ns-resize',
//         backgroundColor: 'rgb(204, 204, 204)',
//         zIndex: 10,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
      
//     </div>
//   );
// };

const GuaranteeForm = () => {
  const [selectedRef, setSelectedRef] = useState(null);
  const [heights, setHeights] = useState([43, 43, 43, 43, 43]);
  const [heights_2, setHeights_2] = useState([43, 43, 43, 43, 43, 43, 43, 43, 43, 80]);
  const [fontSize, setFontSize] = useState('3');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');

  const isResizing = useRef(false);
  const currentResizeIndex = useRef(0);
  const navigate = useNavigate(); //

  const titleRef = useRef(null);
  const testRef = useRef(null);
  const inputRef = useRef(null);
  const secondRef = useRef(null);
  const second_firstRef = useRef(null);
  const thirdRef = useRef(null);
  const third_firstRef = useRef(null);
  const fourRef = useRef(null);
  const four_firstRef = useRef(null);
  const fiveRef = useRef(null);
  
  const se_1Ref = useRef(null);
  const se_2Ref = useRef(null);
  const se_3Ref = useRef(null);
  const se_4Ref = useRef(null);
  const se_5Ref = useRef(null);
  const se_6Ref = useRef(null);
  const se_7Ref = useRef(null);
  const se_8Ref = useRef(null);
  const se_9Ref = useRef(null);
  const se_10Ref = useRef(null);
  const se_11Ref = useRef(null);
  const se_12Ref = useRef(null);
  const se_13Ref = useRef(null);
  const se_14Ref = useRef(null);

  // A4 페이지 내용을 담는 ref
  const a4PageRef = useRef(null);


  // 선택 상태 감지
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection?.toString();

      if (text && text.length > 0) {
        const anchorNode = selection?.anchorNode;
        
        if (anchorNode && anchorNode.nodeType === Node.TEXT_NODE) {
          const parentElement = anchorNode.parentElement;
          
          // 모든 ref에 대해 확인
          const refs = [
            titleRef, testRef, inputRef, secondRef, second_firstRef, 
            thirdRef, third_firstRef, fourRef, four_firstRef, fiveRef,
            se_1Ref, se_2Ref, se_3Ref, se_4Ref, se_5Ref, se_6Ref, 
            se_7Ref, se_8Ref, se_9Ref, se_10Ref, se_11Ref, se_12Ref, 
            se_13Ref, se_14Ref
          ];
          
          for (const ref of refs) {
            if (parentElement && ref.current?.contains(parentElement)) {
              setSelectedRef(ref.current);
              return;
            }
          }
          
          setSelectedRef(null);
        } else {
          setSelectedRef(null);
        }
      } else {
        setSelectedRef(null);
      }
    };

  document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // 스타일 토글
  const toggleStyle = (style, value = null) => {
    if (!selectedRef) return;
    
    selectedRef.focus();
    document.execCommand('styleWithCSS', false, true);
    
    switch (style) {
      case 'bold':
        document.execCommand('bold');
        return;
      case 'italic':
        document.execCommand('italic');
        return;
      case 'underline':
        document.execCommand('underline');
       return; // 커서 유지
      case 'strikeThrough':
        document.execCommand('strikeThrough');
       return; // 커서 유지
      case 'fontName':
        document.execCommand('fontName', false, value);
        setFontFamily(value);
       return; // 커서 유지
      case 'fontSize':
        document.execCommand('fontSize', false, value);
        setFontSize(value);
       return; // 커서 유지
      case 'foreColor':
        document.execCommand('foreColor', false, value);
        setTextColor(value);
       return; // 커서 유지
      case 'justifyLeft':
        document.execCommand('justifyLeft');
       return; // 커서 유지
      case 'justifyCenter':
        document.execCommand('justifyCenter');
       return; // 커서 유지
      case 'justifyRight':
        document.execCommand('justifyRight');
       return; // 커서 유지
      case 'insertOrderedList':
        document.execCommand('insertOrderedList');
        return; // 커서 유지
        // break;
      case 'insertUnorderedList':
        document.execCommand('insertUnorderedList');
        return; // 커서 유지
        // break;
      case 'outdent':
        document.execCommand('outdent');
       return; // 커서 유지
      case 'indent':
        document.execCommand('indent');
       return; // 커서 유지
      default:
        break;
    }
    
    window.getSelection()?.removeAllRanges();
  };

  // 폰트 패밀리 변경
  const changeFontFamily = (family) => {
    if (!selectedRef) return;
    selectedRef.focus();
    document.execCommand('fontName', false, family);
    setFontFamily(family);
  };

  // 폰트 크기 변경
  const changeFontSize = (size) => {
    if (!selectedRef) return;
    selectedRef.focus();
    document.execCommand('fontSize', false, size);
    setFontSize(size);
  };

  // 텍스트 색상 변경
  const changeTextColor = (color) => {
    if (!selectedRef) return;
    selectedRef.focus();
    document.execCommand('foreColor', false, color);
    setTextColor(color);
  };

  // 각 조절바의 위치 계산 (누적 높이)
  const calculateTopPositions = () => {
    const positions = [];
    let cumulativeHeight = 0;
    
    for (let i = 0; i < heights.length; i++) {
      cumulativeHeight += heights[i];
      positions.push(cumulativeHeight);
    }
    
    return positions;
  };

  const calculateTopPositions_second = () => {
    const positions = [];
    let cumulativeHeight = 0;
    
    for (let i = 0; i < heights_2.length; i++) {
      cumulativeHeight += heights_2[i];
      positions.push(cumulativeHeight);
    }
    
    return positions;
  };

  // 조절 핸들러 생성 함수
  // const createResizeHandler = (index) => (e) => {
  //   e.preventDefault();
  //   isResizing.current = true;
  //   currentResizeIndex.current = index;

  //   const startY = e.clientY;
  //   const startHeight = heights[index];

  //   const handleMouseMove = (e) => {
  //     if (!isResizing.current) return;
  //     const newHeight = Math.max(30, startHeight + (e.clientY - startY));
      
  //     setHeights(prev => {
  //       const newHeights = [...prev];
  //       newHeights[index] = newHeight;
  //       return newHeights;
  //     });
  //   };

  //   const handleMouseUp = () => {
  //     isResizing.current = false;
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // };

  // 조절 핸들러 생성 함수
  // const createResizeHandler_se = (index) => (e) => {
  //   e.preventDefault();
  //   isResizing.current = true;
  //   currentResizeIndex.current = index;

  //   const startY = e.clientY;
  //   const startHeight = heights_2[index];

  //   const handleMouseMove = (e) => {
  //     if (!isResizing.current) return;
  //     const newHeight = Math.max(30, startHeight + (e.clientY - startY));
      
  //     setHeights_2(prev => {
  //       const newHeights = [...prev];
  //       newHeights[index] = newHeight;
  //       return newHeights;
  //     });
  //   };

  //   const handleMouseUp = () => {
  //     isResizing.current = false;
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // };

  const handleDownload = async () => {
    // const element = document.getElementById("a4-page_id");
    // if (!element) return;

    // // html2canvas로 DOM을 캡처
    // const canvas = await html2canvas(element, { scale: 2 });
    // const imgData = canvas.toDataURL("image/png");

    // // jsPDF로 PDF 생성 (A4)
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // const pdfWidth = 210; // A4 width mm
    // const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // 비율 유지

    // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    // pdf.save("guarantee_form.pdf");
    console.log(secondRef.current.innerHTML);
  };

  const goToMain = () => {
  };


  // 각 행의 누적 높이 계산
  // const topPositions = calculateTopPositions();
  // const topPositions_2 = calculateTopPositions_second();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <button
          onClick={goToMain} // ← 메인으로 가기
          style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          에디터버전
        </button>
      <div className="button-group">
        <div className="style-buttons">
          {/* 글꼴 선택 */}
          <select 
            value={fontFamily} 
            onChange={(e) => changeFontFamily(e.target.value)}
            style={{ marginRight: '10px', padding: '5px', height: '30px' }}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
          </select>

          {/* 글자 크기 조절 */}
          <select 
            value={fontSize} 
            onChange={(e) => changeFontSize(e.target.value)}
            style={{ marginRight: '10px', padding: '5px', height: '30px' }}
          >
            <option value="1">아주 작게</option>
            <option value="2">작게</option>
            <option value="3">중간</option>
            <option value="4">크게</option>
            <option value="5">아주 크게</option>
            <option value="6">특대</option>
            <option value="7">최대</option>
          </select>

          {/* 기본 스타일 버튼들 */}
          <button onClick={() => toggleStyle('bold')} title="굵게" style={{padding: '5px 10px', height: '30px'}}>
            <b>B</b>
          </button>
          <button onClick={() => toggleStyle('italic')} title="기울임" style={{padding: '5px 10px', height: '30px'}}>
            <i>I</i>
          </button>
          <button onClick={() => toggleStyle('underline')} title="밑줄" style={{padding: '5px 10px', height: '30px'}}>
            <u>U</u>
          </button>
          <button onClick={() => toggleStyle('strikeThrough')} title="취소선" style={{padding: '5px 10px', height: '30px'}}>
            <s>S</s>
          </button>

          {/* 글자색 변경 */}
          <input 
            type="color" 
            value={textColor} 
            onChange={(e) => changeTextColor(e.target.value)}
            title="글자색 변경"
            style={{ width: '30px', height: '30px', verticalAlign: 'middle', margin: '0 5px' }}
          />

          {/* 정렬 버튼들 */}
          <button onClick={() => toggleStyle('justifyLeft')} title="왼쪽 정렬" style={{padding: '5px 10px', height: '30px'}}>
            ↶
          </button>
          <button onClick={() => toggleStyle('justifyCenter')} title="가운데 정렬" style={{padding: '5px 10px', height: '30px'}}>
            ⇔
          </button>
          <button onClick={() => toggleStyle('justifyRight')} title="오른쪽 정렬" style={{padding: '5px 10px', height: '30px'}}>
            ↷
          </button>

          {/* 리스트 버튼들 */}
          <button onClick={() => toggleStyle('insertOrderedList')} title="숫자 목록" style={{padding: '5px 10px', height: '30px'}}>
            1.
          </button>
          <button onClick={() => toggleStyle('insertUnorderedList')} title="글머리 기호" style={{padding: '5px 10px', height: '30px'}}>
            • 
          </button>

          {/* 들여쓰기/내어쓰기 */}
          <button onClick={() => toggleStyle('indent')} title="들여쓰기" style={{padding: '5px 10px', height: '30px'}}>
            →
          </button>
          <button onClick={() => toggleStyle('outdent')} title="내어쓰기" style={{padding: '5px 10px', height: '30px'}}>
            ←
          </button>

          <button onClick={handleDownload} style={{padding: '5px 10px', height: '30px'}}>PDF 다운로드</button>
        </div>
      </div>

      {/* A4 페이지 내용을 담는 div에 ref 추가 */}
      <div className="a4-page" id='a4-page_id' ref={a4PageRef}>
        <HomeTitle>신원보증서</HomeTitle>

        {/* 1번째 단락 */}
        {/* <div style={{ position: 'relative', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', marginTop: '50px', width: '100%' }}>
          <FlexRowStartCenter style={{ width: '100%', textAlign: 'center', fontSize: '16px' }}>
            <FlexColumnAllCenter style={{ width: '15%', textAlign: 'center', height: `${heights.reduce((a, b) => a + b, 0)}px` }}>
              피보증<br />외국인
            </FlexColumnAllCenter>

            <FlexColumnStartStart style={{ width: '90%', textAlign: 'center', position: 'relative' }}>
              <FlexRowStartStart style={{ width: '100%', textAlign: 'center', height: `${heights[0]}px`  }}>
                <FlexColumnStartStart
                  style={{ width: '33.33%', textAlign: 'center', height: "100%", borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc' }}
                >
                  <span style={{ fontSize:"15px", marginLeft:"5px"}}>성</span>
                  <div
                    ref={titleRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    style={{ fontSize: '15px', textAlign: 'center', width: "100%", border: "none", height: '100%' }}
                  ></div>
                </FlexColumnStartStart>

                <FlexColumnStartStart
                  style={{ width: '33.33%', textAlign: 'center', height: "100%", borderRight: '1px solid #ccc' }}
                >
                  <span style={{ fontSize:"15px", marginLeft:"5px" }}>명</span>
                  <div
                    ref={testRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    style={{ fontSize: '15px', textAlign: 'center', width: "100%", border: "none", height: '100%' }}
                  ></div>
                </FlexColumnStartStart>

                <FlexColumnStartStart
                  style={{ width: '33.33%', textAlign: 'center', height: "100%", }}
                >
                  <span style={{ fontSize:"15px", marginLeft:"5px"}}>漢字</span>
                  <div
                    ref={inputRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    style={{ fontSize: '15px', textAlign: 'center', width: "100%", border: "none", height: '100%' }}
                  ></div>
                </FlexColumnStartStart>
              </FlexRowStartStart>
              
              {[secondRef, thirdRef, fourRef, fiveRef].map((ref, index) => (
                <FlexRowStartStart 
                  key={index} 
                  style={{ width: '100%', textAlign: 'center', height: `${heights[index + 1]}px`, }}
                >
                  <FlexColumnStartStart style={{ width: index === 3 ? '100%' : '66.66%', textAlign: 'center', height: "100%", borderRight: index < 3 ? '1px solid #ccc' : 'none', borderLeft: '1px solid #ccc' }}>
                    <span style={{ fontSize:"15px", marginLeft:"5px"}}>
                      {index === 0 ? '생년월일' : index === 1 ? '국적' : index === 2 ? '대한민국 주소' : '체류목적'}
                    </span>
                    <div
                      ref={ref}
                      contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      style={{ fontSize: '15px', textAlign: 'center', width: "100%", border: "none", height: '100%' }}
                    ></div>
                  </FlexColumnStartStart>
                  
                  {index < 3 && (
                    <FlexColumnStartStart style={{ width: '33.33%', textAlign: 'center', height: "100%",  }}>
                      <span style={{ fontSize:"15px", marginLeft:"5px"}}>
                        {index === 0 ? '성별' : index === 1 ? '여권번호' : '전화번호'}
                      </span>
                      <div
                        ref={index === 0 ? second_firstRef : index === 1 ? third_firstRef : four_firstRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="editable"
                        style={{ fontSize: '15px', textAlign: 'center', width: "100%", border: "none", height: '100%' }}
                      ></div>
                    </FlexColumnStartStart>
                  )}
                </FlexRowStartStart>
              ))}
              
              {topPositions.map((top, index) => (
                <ResizeHandle 
                  key={index}
                  top={top}
                  onMouseDown={createResizeHandler(index)}
                />
              ))}
            </FlexColumnStartStart>
          </FlexRowStartCenter>
        </div> */}
        
        {/* 2번째 단락 */}
        {/* <div style={{ position: 'relative', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', marginTop: '30px', width: '100%' }}>
          <FlexRowStartCenter style={{ width: '100%', textAlign: 'center', fontSize: '16px' }}>
            <FlexColumnAllCenter style={{ width: '15%', textAlign: 'center', height: `${heights_2.reduce((a, b) => a + b, 0)}px` }}>
              신원보증인
            </FlexColumnAllCenter>

            <FlexColumnStartStart style={{ width: '90%', textAlign: 'center', position: 'relative' }}>
            
              {[
                se_1Ref , se_3Ref, se_5Ref , se_7Ref, se_8Ref , se_9Ref , se_11Ref , se_12Ref, se_13Ref, se_14Ref
              ].map((ref, index) => (
                <FlexRowStartStart 
                  key={index} 
                  style={{ width: '100%', textAlign: 'center', height: `${heights_2[index]}px`, }}
                >
                  <FlexColumnStartStart style={{ width: 
                      index === 0 || index === 4 || index === 5 || index === 9 ? '100%' : '66.66%', textAlign: 'center', height: "100%", 
                       borderLeft: '1px solid #ccc' }}>
                    <span style={{ fontSize:"15px", marginLeft:"5px"}}>
                      {index === 0 ? '가. 인적사항' : index === 1 ? '성명' : index === 2 ? '국적' : index === 3 ? '여권번호 또는 생년월일' : index === 4 ? '주소' : index === 5 ? '피보증인과의 관계' : 
                      index === 6 ? '근무처' : index === 7 ? '근무처주소' : index === 8 ? '나. 보증기간(보증기간의 최장기간은 4년으로 한다)' : 
                      '다. 보증내용'}
                    </span>
                    <div
                      ref={ref}
                      contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      style={{ fontSize: '15px', width: "100%", border: "none", minHeight: '30px', }}
                    ></div>
                  </FlexColumnStartStart>
                  
                  {(index === 1 || index === 2 || index === 3 || index === 6 || index === 7) && (
                    <FlexColumnStartStart style={{ width: '33.33%', textAlign: 'center', height: "100%", borderLeft: '1px solid #ccc' }}>
                      <span style={{ fontSize:"15px", marginLeft:"5px"}}>
                        {index === 1 ? '漢字' : index === 2 ? '성별' : index === 3 ? '전화번호' : index === 6 ? "직위" : "비고"}
                      </span>
                      <div
                        ref={
                          index === 1 ? se_2Ref : 
                          index === 2 ? se_4Ref : 
                          index === 3 ? se_10Ref : 
                          index === 7 ? se_12Ref : null}
                        contentEditable
                        suppressContentEditableWarning
                        className="editable"
                        style={{ fontSize: '15px', textAlign: 'center', width: "100%", border: "none", height: '100%' }}
                      ></div>
                    </FlexColumnStartStart>
                  )}
                </FlexRowStartStart>
              ))}
              
              {topPositions_2.map((top, index) => (
                <ResizeHandle 
                  key={index}
                  top={top}
                  onMouseDown={createResizeHandler_se(index)}
                />
              ))}

            </FlexColumnStartStart>
          </FlexRowStartCenter>
        </div> */}

        <div style={{ textAlign:"left" , padding:"0px" , borderBottom:"3px solid black" , height:"1000px" , width:"100%"}} 
         contentEditable
                      suppressContentEditableWarning
                      className="editable"
                      ref={secondRef}>
            {/* 위 신원보증인은 피보증외국인이 대한민국에 체류함에 있어서 그 신원에 이상이 없음을 확인하 고 위 사항을 보증합니다.
            <p style={{ textAlign:"right" , fontSize:"13px"}}>&nbsp;&nbsp;년
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일</p>
              <p style={{ textAlign:"right" , marginTop:"10px"}}>신원보증인 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize:"13px"}}>(서명 또는 인)</span>
              </p> */}
        </div>
      </div>

      <style>{`
        .a4-page { 
          width: 210mm; 
          min-height: 297mm; 
          padding: 20mm; 
          margin: 10mm auto; 
          background-color: white; 
          border: 1px solid #ccc; 
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
          display: flex; 
          flex-direction: column; 
          justify-content: center;
          align-items: center;
        }
        .button-group { 
          display: flex; 
          flex-direction: column; 
          gap: 10px; 
          margin-top: 20px; 
          margin-bottom: 20px;
        }
        .style-buttons { 
          display: flex; 
          gap: 10px; 
          flex-wrap: wrap;
          align-items: center;
        }
        button { 
          padding: 6px 12px; 
          border-radius: 4px; 
          border: none; 
          cursor: pointer; 
          background-color: #3498db; 
          color: white; 
        }
        button:hover { 
          opacity: 0.8; 
        }
        .editable:focus {
          outline: none;
          border: none;
        }
        .resize-handle:hover {
          background-color: #2980b9;
        }
        .editable ul, .editable ol {
          display: block !important;
          list-style-position: inside;  /* 글머리 기호 안쪽 */
          padding-left: 20px;           /* 들여쓰기 공간 */
          margin: 0;
          text-align: left;
          list-style-type: disc;        /* 글머리 기호 */
        }

        .editable ol {
          list-style-type: decimal;     /* 숫자 목록 */
        }
      `}</style>
    </div>
  );
};

export default GuaranteeForm;