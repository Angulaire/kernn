import React from 'react';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { position } from 'styled-system';
import TextLoop from "react-text-loop";
import Layout from '../global/Layout';
import Shapes from '../global/Shapes';
import Link from 'next/link';

const ContentCard = styled.div`
  ${position}
  padding: 80px 0;
  width: 100%;
  text-align: center;
  background: ${props => props.theme.colors.secondary.bg};
  border: 1px solid ${props => props.theme.colors.darkOnly.border};
  box-shadow: ${props => props.theme.colors.lightOnly.shadow};
  border-radius: 12px;

  p {
    @media only screen and (min-width: 768px) { 
      font-size: 36px;
    }
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
`

type IProps = { 
  title: string;
  buttons: any;
  categoriesList: any;
  jobsCount: number;
}

const defaultProps = {
  categoriesList: [],
  jobsCount: null
};

const CTA = ({ title, buttons, categoriesList, jobsCount }: IProps) => {

  return (
    <Layout
      color="primary"
      space={{
        "mx": ['20px', '80px'],
        "height": ['300px', '200px']
      }}
    >
      <ContentCard
        position="absolute"
        zIndex="10"
        bottom="-140px"
      >
        <Row justify="center" align="middle">
          <Col xs={20} md={14}>
            <p>
              <span>{title?.replace('{{jobsNumber}}', `${jobsCount}`)}</span>
              <TextLoop>
                {categoriesList.map(category =>
                  <span>{category}</span>
                )}
              </TextLoop>
            </p>
            {buttons.map((button, i) =>
              <Link href={button.url}>
                <Button type={button.type} size={button.size}>{button.text}</Button>
              </Link>
            )}
          </Col>
        </Row>
        <Shapes
          shapes={[
            {
              image: {
                url: "https://res.cloudinary.com/angulaire/image/upload/v1585307959/h1em8klkmdd0tmjszjyt.svg"
              },
              position: {
                bottom: "5px"
              },
              size: {
                height: ["40px", "60px"],
                width: ["200px", "245px"]
              }
            },
          ]}
        />
      </ContentCard>
    </Layout>
  )
}

CTA.defaultProps = defaultProps
export default CTA;