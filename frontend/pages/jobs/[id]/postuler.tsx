import { GetStaticProps, GetStaticPaths } from 'next'
import {Row, Col } from 'antd'
import styled from 'styled-components'
import Header from '../../../components/navigation/Header'
import Footer from '../../../components/navigation/Footer'
import { useRouter } from 'next/router'
import ApplyForm from '../../../components/data-entry/ApplyForm'
import JOBS_QUERY from '../../../apollo/queries/job/jobs'
import JOB_QUERY from '../../../apollo/queries/job/job'
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request'
import Loading from '../../../components/global/Loading'

const Hero = styled(Row)`
  padding-top: 10rem;
  padding-bottom: 3rem;

  h1 {
    font-size: 24px;
    text-align: center;
  }
`


const Apply = ({ data }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading/>
  }

  return (
    <>
      <Header afterScroll={false} />
      <Hero justify="center" align="middle">
        <Col xs={24} md={12}>
          <h1>{data.job.title}</h1>
        </Col>
      </Hero>
      <Row justify="center" align="top">
        <Col xs={24} md={12}>
          <ApplyForm />
        </Col>
      </Row>
      <Footer 
        navigation={data.navigation.footer}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(JOBS_QUERY)
  // Call an external API endpoint to get articles
  const data = await request(endpoint, query)
  const jobs = await data.jobs

  // Get the paths we want to pre-render based on articles
  const paths = jobs.map(job => `/jobs/${job.id}/postuler`)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(JOB_QUERY)
  const variables = {
    id: params.id,
  }
  const data = await request(endpoint, query, variables)

  // Pass post data to the page via props
  return { props: { data }}
}
  
export default Apply