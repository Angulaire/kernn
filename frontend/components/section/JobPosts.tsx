import React from 'react';
import { Row, Col } from 'antd';
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

const JobCard = styled.div`
  min-height: 140px;
  .time-ago {
    font-size: 14px;
  }

`

type IProps = { 
  title: string;
  jobPosts: any;
}

const JobPosts = ({ title, jobPosts}: IProps) => {
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
      <Row justify="center" align="middle" gutter={[32, 32]}>
        {jobPosts.map((job) => 
          <Col xs={24} md={6}>
            <JobCard>
              <p className="time-ago">Il y a 2 jours</p>
              <h3>{job.title}</h3>
              <p>{`${job.contract}, à ${job.location_town}`}</p>
            </JobCard>
          </Col>
        )}
      </Row>
    </Layout>
  )
}

export default JobPosts;