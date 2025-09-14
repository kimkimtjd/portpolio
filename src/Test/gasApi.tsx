// react/src/services/docService.ts
const API_BASE_URL = 'http://localhost:8000/api';

export const modifyWordDocument = async (data: Record<string, string>): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modify-word/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('문서 수정 실패');
    }

    // 파일 다운로드
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // 단일
    // link.download = 'modified_document.docx';
    // 다중
    link.download = 'test.zip';
    
    document.body.appendChild(link);
    link.click();

    // 정리
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error modifying word document:', error);
    throw new Error('문서 수정 중 오류가 발생했습니다.');
  }
};