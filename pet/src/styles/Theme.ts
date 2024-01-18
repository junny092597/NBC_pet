import { css } from "styled-components";

const colors = {
    brandcolor100: "#E38BEF",
    brandcolor200: "#DD74EC",
    brandcolor300: "#D85EE9",
    brandcolor400: "#D247E6",
    brandcolor500: "#EDB7F5",
    brandcolor600: "#F3CEF8",
    brandcolor700: "#F8E4FB",
    brandcolor800: "#FEFBFE",
}

const theme = {
    colors,
  };

export default theme;
export type Theme = typeof theme;
