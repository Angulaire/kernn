import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';
import { Row, Col, Button, Tag, Avatar} from 'antd';
import styled from 'styled-components';
import ARTICLES_QUERY from "../../apollo/queries/article/articles";
import ARTICLE_QUERY from "../../apollo/queries/article/article";
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request'
import { Markdown } from 'react-showdown';
import { Image, Transformation} from 'cloudinary-react';
import ArticleAuthor from '../../components/data-display/ArticleAuthor';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import Loading from '../../components/global/Loading'

const Article = ({ article, navigation }) => {
  const router = useRouter()
  const slug = encodeURIComponent(article.title)
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loading/>
  }

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        canonical={`https://kernn.io/blog/${article.slug}`}
        openGraph={{
          title: article.title,
          description: article.description,
          url: `https://kernn.io/blog/${article.slug}`,
          type: 'article',
          article: {
            publishedTime: article.published_at,
            modifiedTime: '2018-01-21T18:04:43Z',
            expirationTime: '2022-12-21T22:04:11Z',
            authors: [
              `https://www.kernn.io/authors/${article.user.username}`,
            ],
            tags: [article.category.name]
          },
          images: [
            {
              url: `https://res.cloudinary.com/angulaire/image/upload/c_scale,h_630,w_1200/w_800,c_fit,l_text:Helvetica_52_bold:${slug},co_rgb:FFF,g_west,x_105/v1584009185/og-image-article_lykoq7.png`,
              alt: article.image.alt,
              width: 1200,
              height: 630,
            }
          ]
        }}
      />
      <Header afterScroll/>
      <Row justify="center" align="top" style={{padding: "100px 0"}}>
        <Col xs={24} md={16}>
          <Tag color={article.category.color}>{article.category.name}</Tag>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <ArticleAuthor article={article} />
        </Col>
      </Row>
      <Image 
        cloudName="angulaire" 
        publicId={article.image.media.provider_metadata.public_id} 
        alt={article.image.alt}
        secure="true"
        width="100%"
      >
        <Transformation 
          quality="auto" 
          fetchFormat="auto"
        />
      </Image>
      <Row justify="center" align="top">
        <Col xs={24} md={16} style={{padding: "80px 0"}}>
          <Markdown markup={article.content} />
        </Col>
      </Row>
      <Footer 
        navigation={navigation.footer}
      />
    </>
  );
    
};

export const getStaticPaths: GetStaticPaths = async () => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(ARTICLES_QUERY)
  // Call an external API endpoint to get articles
  const data = await request(endpoint, query)
  const articles = await data.articles

  // Get the paths we want to pre-render based on articles
  const paths = articles.map(article => `/blog/${article.slug}`)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(ARTICLE_QUERY)
  const variables = {
    slug: params.id,
  }
  const data = await request(endpoint, query, variables)
  const article = await data.articles[0]
  const navigation = await data.navigation

  // Pass post data to the page via props
  return { props: { article, navigation }}
}

export default Article; 