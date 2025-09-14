// import React, { useState, useRef } from 'react';

// // Props 타입 정의
// interface HwpReplacerProps {
//   filePath: string;
//   replacements: Record<string, string>;
// }

// const HwpReplacer: React.FC<HwpReplacerProps> = ({ filePath, replacements }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const linkRef = useRef<HTMLAnchorElement>(null);

//   const replaceAndDownload = async () => {
//     setIsProcessing(true);
//     setError(null);

//     try {
//       // public 폴더에 있는 HWP 파일 가져오기
//       // React에서는 public 폴더의 파일을 루트 경로로 접근합니다
//       const response = await fetch(filePath);
//       if (!response.ok) {
//         throw new Error(`파일을 불러오는데 실패했습니다: ${response.status}`);
//       }

//       const arrayBuffer = await response.arrayBuffer();
      
//       // 파일 다운로드 (hwp.js 대신 직접 다운로드)
//       const blob = new Blob([arrayBuffer], { 
//         type: 'application/haansofthwp' 
//       });
//       const url = URL.createObjectURL(blob);
      
//       if (linkRef.current) {
//         linkRef.current.href = url;
//         linkRef.current.download = 'document.hwp';
//         linkRef.current.click();
//       }
      
//       // 메모리 해제
//       setTimeout(() => URL.revokeObjectURL(url), 100);
      
//       setError('hwp.js 기능이 제한되어 원본 파일을 다운로드합니다. 실제 치환 기능은 서버 측에서 구현해야 합니다.');
      
//     } catch (err) {
//       console.error('HWP 처리 중 오류 발생:', err);
//       setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h2>HWP 문서 텍스트 치환 도구</h2>
//       <p>파일: {filePath}</p>
      
//       <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '4px' }}>
//         <strong>치환 패턴:</strong>
//         {Object.entries(replacements).map(([pattern, replacement]) => (
//           <div key={pattern} style={{ margin: '5px 0' }}>
//             <code>{`{{${pattern}}}`}</code> → <strong>{replacement}</strong>
//           </div>
//         ))}
//       </div>
      
//       <div style={{ 
//         padding: '10px', 
//         backgroundColor: '#fff3cd', 
//         border: '1px solid #ffeaa7',
//         borderRadius: '4px',
//         marginBottom: '15px'
//       }}>
//         <strong>참고:</strong> 현재 브라우저에서 HWP 파일 편집 기능이 제한적입니다.
//         완전한 기능을 위해서는 서버 측 처리 구현이 필요합니다.
//       </div>
      
//       <button 
//         onClick={replaceAndDownload} 
//         disabled={isProcessing}
//         style={{
//           padding: '10px 15px',
//           backgroundColor: isProcessing ? '#ccc' : '#007acc',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: isProcessing ? 'not-allowed' : 'pointer',
//           fontSize: '16px',
//           marginBottom: '10px'
//         }}
//       >
//         {isProcessing ? '처리 중...' : '파일 다운로드'}
//       </button>
      
//       {error && (
//         <div style={{ 
//           color: '#d32f2f', 
//           marginTop: '15px', 
//           padding: '10px',
//           backgroundColor: '#ffebee',
//           borderRadius: '4px'
//         }}>
//           {error}
//         </div>
//       )}
      
//       {/* 숨겨진 다운로드 링크 */}
//       <a ref={linkRef} style={{ display: 'none' }} />
//     </div>
//   );
// };

// export default HwpReplacer;
import React from "react";
import JSZip from "jszip";

interface ReplacementMap {
  [key: string]: string;
}

const HwpXReplacer: React.FC<{ filePath: string; replacements: ReplacementMap }> = ({ filePath, replacements }) => {
  const handleReplace = async () => {
    // 1. HWPX 파일 fetch
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    // 2. JSZip으로 압축 해제
    const zip = await JSZip.loadAsync(arrayBuffer);

    // 3. 문서 XML 읽기 (Contents 폴더 내 document.xml 기준)
    const documentXmlFile = zip.file("Contents/Document.xml");
    if (!documentXmlFile) {
      alert("Document.xml을 찾을 수 없습니다.");
      return;
    }

    let xmlText = await documentXmlFile.async("text");

    // 4. 플레이스홀더 치환
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      const value = replacements[key];
      xmlText = xmlText.split(placeholder).join(value);
    }

    // 5. XML 파일 다시 압축
    zip.file("Contents/Document.xml", xmlText);
    const newBlob = await zip.generateAsync({ type: "blob" });

    // 6. 다운로드
    const link = document.createElement("a");
    link.href = URL.createObjectURL(newBlob);
    link.download = "modified.hwpx";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return <button onClick={handleReplace}>HWPX 치환 후 다운로드</button>;
};

export default HwpXReplacer;
