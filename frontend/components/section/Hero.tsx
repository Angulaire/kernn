import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { space, typography } from 'styled-system';
import Layout from '../global/Layout';

const Title = styled.h1`
  ${space}
`

const Description = styled.p`
  ${typography}
  ${space}
`


type IProps = { 
  title: string;
  description: string;
}

const Hero = ({ title, description }: IProps) => {
  return (
    <Layout
      color="primary"
      space="default"
      textAlign="center"
    >
      <Row justify="center" align="middle">
          <Title 
            px={['0', '300px']}
          >
            {title}
          </Title>
          <Description 
            fontSize={['18px', '24px']}
            px={['0', '120px']}
          >
            {description}
          </Description>
      </Row>
    </Layout>
  )
}

export default Hero;