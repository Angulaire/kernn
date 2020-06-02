import { createGlobalStyle } from 'styled-components'

const baseColors = {
  blue: '#0E2A3E',
  green: '#1EB650',
  white: '#FFF',
  whiteDark: '#FAFAFA',
  black: '#050505',
  blackDark: '#121212',
  greyLight: '#EAEAEA',
  grey: '#CCC',
  greyDark: 'rgba(68, 68, 68, 0.8)',
  shadow: '0 5px 10px rgba(0,0,0,.12)'
}

const baseFilter = {
  white: 'brightness(0) invert(1)'
}

export const lightTheme = {
  colors: {
    primary: {
      bg: baseColors.white,
      bgDark: baseColors.whiteDark,
      border: baseColors.greyLight,
      text: baseColors.blue,
      textDark: baseColors.grey
    },
    secondary: {
      bg: baseColors.blue,
      text: baseColors.white
    },
    accent: {
      bg: baseColors.blue,
      text: baseColors.white,
      filter: baseFilter.white
    },
    darkOnly: {
      border: 'none',
      filter: 'none'
    },
    lightOnly: {
      shadow: baseColors.shadow
    },
    green: baseColors.green,
    black: baseColors.black,
    white: baseColors.white,
    grey: baseColors.grey
  }
}

export const darkTheme = {
  colors: {
    primary: {
      bg: baseColors.black,
      bgDark: baseColors.blackDark,
      border: baseColors.greyDark,
      text: baseColors.white,
      textDark: baseColors.greyDark
    },
    secondary: {
      bg: baseColors.black,
      text: baseColors.white
    },
    accent: {
      bg: baseColors.blackDark,
      text: baseColors.white,
      filter: baseFilter.white
    },
    darkOnly: {
      border: baseColors.greyDark,
      filter: baseFilter.white
    },
    lightOnly: {
      shadow: 'none'
    },
    green: baseColors.green,
    black: baseColors.black,
    white: baseColors.white,
    grey: baseColors.greyDark
  }
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Geomanist;
    src: url(/fonts/Geomanist-Bold.woff);
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: Geomanist;
    src: url(/fonts/Geomanist-Regular.woff);
    font-weight: normal;
    font-style: normal;
  }
  
  body {
    font-family: Geomanist, -apple-system, system-ui, BlinkMacSystemFont, Helvetica Neue, sans-serif;
		-webkit-font-smoothing: antialiased;
		background-color: ${props => props.theme.colors.primary.bg};
  }
	h1 {
    @media only screen and (min-width: 768px) { 
      font-size: 4rem;
    }
    font-size: 2.5rem;
    line-height: 1.1em;
    margin: 50px 0;
  }
  h2 {
    @media only screen and (min-width: 768px) {
      font-size: 42px;
    }
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: 50px;
  }



  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.05rem;
    color: ${props => props.theme.colors.primary.text};
    font-weight: bold;
  }
	
	p {
		color: ${props => props.theme.colors.grey};
		font-size: 18px;
		font-weight: normal;
		line-height: 1.4;
    margin-bottom: 1rem;
	}
	
	*:focus {
		outline:none
  }

  .ant-btn-lg {
    padding: 0 25px;
  }
  .ant-btn-link {
    color: ${props => props.theme.colors.primary.text};
  }
  
`