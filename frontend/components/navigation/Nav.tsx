import React from "react";
import { Button } from 'antd'
import Link from "next/link"
import styled from 'styled-components'

const NavGroup = styled.nav`
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
  
  &.HeaderOff {
    display: none;
  }

  @media (min-width: 768px) { 
    padding: 0px 80px;
  }
  
`

type NavProps = {
  showNav: boolean;
};

const Nav = ({ showNav }: NavProps) => {
  if (showNav) {
    return (
      <NavGroup>
        <Link href="/">
          <Button type="link" className="theme-color">Accueil</Button>
        </Link>
        <Link href="/jobs/index" as="/jobs">
          <Button type="link" className="theme-color">Annonces</Button>
        </Link>
        <Link href="/landing">
          <Button type="link" className="theme-color">Landing</Button>
        </Link>
        <Link href="/blog/index" as="/blog">
          <Button type="link" className="theme-color">Blog</Button>
        </Link>
      </NavGroup>
    );
  } else return null
};

export default Nav; 