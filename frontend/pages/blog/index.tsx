import React from 'react';
import { GetStaticProps } from 'next'
import { useRouter } from "next/router";
import { Row, Col, Tag } from 'antd'
import styled from 'styled-components'
import ArticleCard from '../../components/data-display/ArticleCard'
import ARTICLES_QUERY from "../../apollo/queries/article/articles";
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request'
import ArticleAuthor from '../../components/data-display/ArticleAuthor'
import Link from 'next/link'
import { Image, Transformation} from 'cloudinary-react';
import Header from "../../components/navigation/Header";
import Footer from "../../components/navigation/Footer";
import Layout from "../../components/global/Layout"
import CTA from "../../components/section/CTA";
import Loading from '../../components/global/Loading'
import ArticlesGrid from '../../components/section/ArticlesGrid';


const ImageGroup = styled.div`
  margin-bottom: 12px;
  img {
    height: 26rem;
    object-fit: cover;
  }
`
const LastArticleContentGroup = styled.div`
  h1 {
    color: white;
    font-size: 2.8rem;
    margin: 18px 0;
  }
`

const BlogIndex = ({ articles, navigation }) => {
  const router = useRouter()
  const lastArticle = articles.slice(0, 1)[0];
  const otherArticles = articles.slice(1, articles.length);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loading/>
  }

  return (
    <>
      <Header afterScroll defaultTheme="light"/>
      <Link href={'/blog/[id]'} as={`/blog/${lastArticle.slug}`}>
        <a>
          <Layout
            color="secondary"
            space={{
              "p": ['40px 10px 0 10px', '140px 80px 0 0']
            }}
          >
            <Row justify="start" align="middle">
              <Col xs={0} md={10}>
                <ImageGroup>
                  <Image 
                    cloudName={process.env.CLOUDINARY_CLOUD_NAME} 
                    publicId={lastArticle.image.media.provider_metadata.public_id} 
                    alt={lastArticle.image.alt}
                    secure="true"
                    width="100%"
                  >
                    <Transformation 
                      fetchFormat="auto"
                    />
                  </Image>
                </ImageGroup>
              </Col>
              <Col xs={0} md={{span: 10, offset: 2}}>
                <LastArticleContentGroup>
                  <Tag color={lastArticle.category.color}>{lastArticle.category.name}</Tag>
                  <h1>{lastArticle.title}</h1>
                  <p style={{fontSize: "1.4rem"}}>{lastArticle.description}</p>
                  <ArticleAuthor article={lastArticle}/>
                </LastArticleContentGroup>
              </Col>
              <Col xs={24} md={0}>
                <ArticleCard article={lastArticle}/>
              </Col>
            </Row>
          </Layout>
        </a>
      </Link>
      <ArticlesGrid
        articles={otherArticles}
      />
      <CTA
        title="Comment optimiser son profil LinkedIn pour être visible par les recruteurs"
        buttons={
          [
            {
              text: "Recevoir le livre blanc",
              type: "primary",
              size: "large",
              url: "/landing"
            }
          ]
        }
      />
      <Footer
        navigation={navigation.footer}
        space={{
          "p": ['200px 20px 20px 20px', '200px 80px 20px 80px']
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const data = await request(`${process.env.API_BASE_URL}/graphql`, print(ARTICLES_QUERY))
  const articles = await data.articles
  const navigation = await data.navigation
  return { props: { articles, navigation }}
}

export default BlogIndex; 