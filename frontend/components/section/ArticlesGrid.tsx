import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import ArticleCard from '../../components/data-display/ArticleCard';
import Layout from '../../components/global/Layout';

const Divider = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.secondary.bg};
  height: 200px;
  width: 100%;
  top: 0;
  left: 0;
`

const ArticlesGrid = ({ articles }) => {

  return (
    <Layout
      color="primary"
      space="default"
    >
      <Divider />
      <Row justify="start" align="top">
        {articles.map(article => (
          <Col xs={24} md={8}>
            <ArticleCard article={article}/>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};


export default ArticlesGrid; 