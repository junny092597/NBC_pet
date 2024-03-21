import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Jalnan from '../assets/fonts/Jalnan2TTF.ttf'
import npfont from '../assets/fonts/국민연금체.ttf'


const GlobalStyles = createGlobalStyle`
${reset}
*{ box-sizing: border-box }

@font-face {
    font-family: 'Jalnan';
    src: local('Jalnan'), local('Jalnan');
    font-style: normal;
    src: url(${Jalnan}) format('truetype');
}

@font-face {
    font-family: 'MBC1961GulimM';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'npfont';
    src: local('npfont'), local('npfont');
    font-style: normal;
    src: url(${npfont}) format('truetype');
}
`;

export default GlobalStyles;
