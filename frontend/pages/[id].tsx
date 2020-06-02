import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from "next/router";
import { Row, Col } from 'antd';
import styled from 'styled-components';
import PAGES_QUERY from "../apollo/queries/page/pages";
import PAGE_QUERY from "../apollo/queries/page/page";
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request'
import Loading from '../components/global/Loading'
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import HeroSideForm from '../components/section/HeroSideForm';

const Page = ({ data }) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loading/>
  }

  return (
    <HeroSideForm 
      section={data.pages[0].content[0]}
      navigation={data.navigation}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(PAGES_QUERY)
  // Call an external API endpoint to get articles
  const data = await request(endpoint, query)
  const pages = await data.pages

  // Get the paths we want to pre-render based on articles
  const paths = pages.map(page => `/${page.slug}`)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(PAGE_QUERY)
  const variables = {
    slug: params.id,
  }
  const data = await request(endpoint, query, variables)

  // Pass post data to the page via props
  return { props: { data }}
}

export default Page; 