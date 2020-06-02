import React from 'react'
import Router from 'next/router'
import { Row, Col, Button } from 'antd';
import styled from 'styled-components'
import Layout from '../global/Layout'
import SearchHome from '../data-entry/SearchHome';

const HeroSearchGroup = styled.div`
  position: relative;
`

const ImageCard = styled.div`
  background: url(https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 400px;
  border-radius: 12px;
`

const SearchImage = () => {

  return (
    <section>
      <Layout
        color="primary"
        space="default"
      >
        <Row justify="center" align="middle">
          <Col xs={24} md={24}>
            <HeroSearchGroup>
              <SearchHome />
              <ImageCard />
            </HeroSearchGroup>
          </Col>
        </Row>
      </Layout>
    </section>
  )
}

export default SearchImage