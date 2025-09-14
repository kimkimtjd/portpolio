// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  @font-face {
    font-family: 'Ownglyph_ParkDaHyun';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* 레이아웃 계산에 매우 중요하며 권장됩니다. */
     &::-webkit-scrollbar { /* WebKit 기반 브라우저 (Chrome, Safari 등) */
        display: none; /* 스크롤바를 아예 표시하지 않음 */
    }
    -ms-overflow-style: none; /* Internet Explorer 및 Edge (레거시) */
    scrollbar-width: none; /* Firefox */
  }

  /* body 요소에 대한 추가적인 기본 스타일 재정의 (선택 사항) */
  body {
    line-height: 1.5; /* 줄 간격 설정 */
    -webkit-font-smoothing: antialiased; /* 폰트 렌더링 부드럽게 */
    &::-webkit-scrollbar { /* WebKit 기반 브라우저 (Chrome, Safari 등) */
        display: none; /* 스크롤바를 아예 표시하지 않음 */
    }
    -ms-overflow-style: none; /* Internet Explorer 및 Edge (레거시) */
    scrollbar-width: none; /* Firefox */

    /* 스크롤바 숨김으로 인한 하단 여백 추가 (스크롤바 공간 고려) */
  }

  /* 이미지 기본 스타일 */
  img, picture, video, canvas, svg {
    display: block; /* 인라인 요소의 하단 공백 제거 */
    max-width: 100%; /* 이미지 크기 반응형으로 조정 */
  }

  /* 폼 요소 기본 스타일 */
  input, button, textarea, select {
    font: inherit; /* 부모 폰트 상속 */
  }

  /* 제목 태그의 기본 마진 재정의 예시 (이미 * 선택자로 처리되지만 명시적으로 할 수 있음) */
  h1, h2, h3, h4, h5, h6 {
    margin: 0; /* h1에 특히 문제가 되는 기본 마진 제거 */
  }

  /* ul, ol의 기본 패딩/마진 및 list-style 제거 */
  ul, ol {
    margin: 0;
    padding: 0;
  }

  /* a 태그의 밑줄 제거 및 색상 상속 */
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;