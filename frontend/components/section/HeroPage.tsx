import React from 'react';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import Layout from '../global/Layout';

const Section = styled(Layout)`
`

type IProps = { 
  title: string;
  description: string;
  imageUrl: string;
}

const HeroPage = ({ title, description, imageUrl }: IProps) => {
  return (
    <Section
      color="transparentDark"
      space="default"
      textAlign="center"
      background={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Row justify="center" align="middle">
        <Col xs={24} md={12}>
          <h1>{title}</h1>
          <p>{description}</p>
        </Col>
      </Row>
    </Section>
  )
}

export default HeroPage;