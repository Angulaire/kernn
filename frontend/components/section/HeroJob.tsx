import React from 'react';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import Layout from '../global/Layout';
import Link from 'next/link';


type IProps = { 
  job: any;
}

const HeroJob = ({ job }: IProps) => {
  return (
    <Layout
      color="primary"
      space="default"
      textAlign="center"
    >
      <Row justify="center" align="middle">
        <Col xs={24} md={18}>
          <h1>{job.title}</h1>
          <Link href={'/jobs/[id]/postuler'} as={`/jobs/${job.id}/postuler`}>
            <Button type="primary">Postuler</Button>
          </Link>
        </Col>
      </Row>
    </Layout>
  )
}

export default HeroJob;