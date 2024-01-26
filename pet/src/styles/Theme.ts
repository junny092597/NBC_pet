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
    //네비게이션쪽 초록계열 컬러
    lightGreen: '#D9F8E5',
    //헤더,풋터부분 노랑계열 컬러
    darkYello: '#F6F7C4',
  },
};

export default theme;
export type Theme = typeof theme;
