import React from 'react';
import Logo from '../global/Logo'
import Nav from './Nav'
import HeaderAuth from './HeaderAuth'
import styled from 'styled-components'

interface ThemeProps {
  readonly defaultTheme: string;
};

const HeaderGroup = styled.header<ThemeProps>`
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: transparent;
  position: fixed;
  width: 100%;
  height: 80px;
  padding: 0px 80px;
  z-index: 100;

  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  &.HeaderOn {
    backdrop-filter: blur(20px);
    background: ${props => props.theme.colors.primary.bgDark};
    border-bottom: 1px solid ${props => props.theme.colors.primary.border};

    svg {
      path {
        fill: ${props => props.theme.colors.primary.text};
      }
    }

    .theme-color {
      color: ${props => props.theme.colors.primary.text};
    }

  }

  @media only screen and (min-width: 768px) {
    path {
      fill: ${props => (props.defaultTheme === "light") && "white"};
    }

    .theme-color {
      color: ${props => (props.defaultTheme === "light") && "white"};
    }
  }
  
`

type HeaderProps = {
  afterScroll: boolean;
  defaultTheme: string;
  showLogo: boolean;
  showNav: boolean;
  showActions: boolean;
  isAuthenticated: boolean;
};


class Header extends React.Component<HeaderProps> {
  static defaultProps = {
    afterScroll: false,
    defaultTheme: "dark",
    showLogo: true,
    showNav: true,
    showActions: true,
    isAuthenticated: false
  };
  
  state = {
    hasScrolled: false
  }

  handleScroll = (event) => {
    const scrollTop = window.pageYOffset
  
    if (scrollTop > 5) {
      this.setState({ hasScrolled: true })
    } else {
      this.setState({ hasScrolled: false })
    }
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  
  render() {
    const { isAuthenticated } = this.props
    return (     
      <HeaderGroup 
        className={(this.state.hasScrolled === true || this.props.afterScroll === false) && 'HeaderOn'}
        defaultTheme={this.props.defaultTheme}
      >
        <a href="/">
          <Logo/>
        </a>
        <Nav showNav={this.props.showNav}/>
        {/* <HeaderAuth showActions={this.props.showActions} isAuthenticated={isAuthenticated} /> */}
      </HeaderGroup>
    )
  }
}

export default Header;