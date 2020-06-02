import React from 'react';
import { GetStaticProps } from 'next'
import { useRouter } from "next/router";
import HOMEPAGE_QUERY from "../apollo/queries/page/homepage";
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request'
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import Hero from '../components/section/Hero';
import Categories from '../components/section/Categories'
import JobPosts from '../components/section/JobPosts'
import SearchImage from '../components/section/SearchImage';
import defaultPage from '../hocs/defaultPage'
import Testimonials from '../components/section/Testimonials';
import ArticlesGrid from '../components/section/ArticlesGrid';
import CTA from '../components/section/CTA'

interface IndexPageProps {
  isAuthenticated: boolean;
  data: any;
}

class IndexPage extends React.Component<IndexPageProps> {

  render() {
    const { isAuthenticated, data } = this.props;
    return (
      <>
        <Header 
          afterScroll
          isAuthenticated={isAuthenticated}
        />
        {data.homepage.content.map(section => {
          if ( section.__typename === "ComponentHero") {
            return (
              <>
                <Hero
                  title={section.titleHero}
                  description={section.description}
                />
                <SearchImage />
              </>
            )
          }
          if ( section.__typename === "ComponentCategories") {
            return (
              <Categories
                title={section.title}
                categories={data.jobCategories}
              />
            )
          }
          if ( section.__typename === "ComponentTestimonials") {
            return (
              <Testimonials 
                testimonials={section.testimonial}
              />
            )
          }
          if ( section.__typename === "ComponentJobs") {
            return (
              <JobPosts 
                title={section.titleJobs}
                jobPosts={data.jobs}
              />
            )
          }
          if ( section.__typename === "ComponentCta") {
            return (
              <>
                <ArticlesGrid
                  articles={data.articles}
                />
                <CTA
                  title={section.ctaTitle}
                  categoriesList={section.categoriesList}
                  jobsCount={data.jobsCount}
                  buttons={section.button}
                />
              </>
            )
          }
        })}
        <Footer
          navigation={data.navigation.footer}
          space={{
            "p": ['200px 20px 20px 20px', '200px 80px 20px 80px']
          }}
        />
      </>
    )
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const data = await request(`${process.env.API_BASE_URL}/graphql`, print(HOMEPAGE_QUERY))
  return { props: { data }}
}

export default IndexPage