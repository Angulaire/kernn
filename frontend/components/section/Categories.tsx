import React from 'react';
import { Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import Layout from '../global/Layout';

const Title = styled.div`
  position: relative;
  padding-top: 30px;
  .border-top {
    position: absolute;
    top: 0;
    border-top: 4px solid ${props => props.theme.colors.green};
    width: 50px;
  }
`

const CategoryCard = styled.div`
  h3 {
    padding-top: 12px;
  }
  img {
      filter: ${props => props.theme.colors.darkOnly.filter};
    }
  border-radius: 12px;
  padding: 20px 40px;
  -webkit-transition: all 1s ease; /* Safari et Chrome */
  -moz-transition: all 1s ease; /* Firefox */
  -ms-transition: all 1s ease; /* Internet Explorer 9 */
  -o-transition: all 1s ease; /* Opera */
  transition: all 1s ease;
  &:hover {
    background: ${props => props.theme.colors.accent.bg};
    h3 {
      color: ${props => props.theme.colors.white};
    }
    img {
      filter: ${props => props.theme.colors.accent.filter};
    }
  }
`

type IProps = { 
  title: string;
  categories: any;
}

const Categories = ({ title, categories}: IProps) => {
  return (
    <Layout
      color="primary"
      space="default"
    >
      <Row justify="start" align="middle">
        <Col xs={24} md={5}>
          <Title>
            <div className="border-top"/>
            <h2>{title}</h2>
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[8, 8]}>
        {categories.map((category) => 
          <Col xs={24} md={6}>
            <CategoryCard>
              <a>
                <img src={category.icon?.url} alt={`${category.name} icon`}/>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </a>
            </CategoryCard>
          </Col>
        )}
      </Row>
    </Layout>
  )
}

export default Categories;