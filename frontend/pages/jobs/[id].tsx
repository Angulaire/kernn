import { GetStaticProps, GetStaticPaths } from 'next'
import { Row, Col, Button } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../components/navigation/Header'
import Footer from '../../components/navigation/Footer' 
import JOBS_QUERY from '../../apollo/queries/job/jobs'
import JOB_QUERY from '../../apollo/queries/job/job'
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request'
import Loading from '../../components/global/Loading'
import Layout from '../../components/global/Layout'
import HeroJob from '../../components/section/HeroJob'

const Job = ({ data }) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loading/>
  }

  return (
    <>
      <Header afterScroll={false} />
      <HeroJob 
        job={data.job}
      />
      <Layout
        color="primary"
        space="default"
      >
      <Row justify="center" align="middle">
        <Col xs={24} md={20}>
          <h2>À propos</h2>
          <p>{data.job.company_description}</p>
          <h2>Descriptif du poste</h2>
          <p>{data.job.mission_description}</p>
        </Col>
      </Row>
      </Layout>
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
  const paths = jobs.map(job => `/jobs/${job.id}`)
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

export default Job