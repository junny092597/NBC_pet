import { css } from 'styled-components';

const colors = {
  brandcolor100: '#E38BEF',
  brandcolor200: '#DD74EC',
  brandcolor300: '#D85EE9',
  brandcolor400: '#D247E6',
  brandcolor500: '#EDB7F5',
  brandcolor600: '#F3CEF8',
  brandcolor700: '#F8E4FB',
  brandcolor800: '#FEFBFE',
};

const theme = {
  color: {
    //쇼핑페이지 리뷰버튼 컬러
    ReviewButtonColor: '#E6E6D5',
    //쇼핑페이지 버튼 컬러
    ButtonColor: '#F6F7C4',
    ButtonColor2: '#D9F8E5',
    //네비게이션쪽 초록계열 컬러
    lightGreen: '#E2FAEB',
    //헤더,풋터부분 노랑계열 컬러
    darkYello: '#FFF8E3',
  },
};

export default theme;
export type Theme = typeof theme;
