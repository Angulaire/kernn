import React from 'react';
import styled from 'styled-components'
import { Button } from 'antd'
import Link from 'next/link'
// import AuthModals from '../feedback/AuthModals'
import { unsetToken } from "../../utils/auth";

const ButtonsGroup = styled.div`
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;

  .btn-rounded {
    border-radius: 22px;
    background-color: transparent;
    color: #1EB650;
    border-color: #1EB650;
  }

`

type ActionsProps = {
  showActions: boolean;
  isAuthenticated: boolean;
};

class HeaderActions extends React.Component<ActionsProps> {

  render () {

    const { showActions, isAuthenticated } = this.props
    if (showActions) {
      return (
        <>
          {isAuthenticated ? (
            <ButtonsGroup>
              <Link href="/">
                <Button className="btn-rounded" onClick={unsetToken}>Se déconnecter</Button>
              </Link>
            </ButtonsGroup>
          ) : (
            <ButtonsGroup>
              {/* <AuthModals /> */}
            </ButtonsGroup>
          )}
        </>
      )
    } else return null
  }

}

export default HeaderActions;