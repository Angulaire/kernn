import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { ReactiveBase, DataSearch, ReactiveList, MultiDropdownList } from '@appbaseio/reactivesearch';
import { Row, Col } from 'antd';
import JobCard from '../../components/data-display/JobCard';
import styled from 'styled-components';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import CTA from '../../components/section/CTA'
import HeroPage from '../../components/section/HeroPage'
import JOBS_QUERY from '../../apollo/queries/job/jobs';
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request';
import Loading from '../../components/global/Loading';

const StyledReactiveBase = styled(ReactiveBase)`
  .result-stats {
    margin: 4rem auto 0 auto;
  }

  .css-1i2ldnt {
    display: none;
  }

  .no-results {
    img {
      display: block;
      margin: 0 auto;
    }
  }

`

const SearchGroup = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  background: white;
  margin-top: -30px;
  position: absolute;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px;
  width: 100%;

  .block {
    width: 100%;
    max-width: 240px;

    input {
      height: 55px;
      border-radius: 8px 0 0 8px;
      background: transparent;
    }

    button {
      border-left: none;
      height: 55px;
    }

    .css-x6igpv {
      top: 55px;
      border-radius: 0 0 8px 8px;
    }

    .last-select {
      border-radius: 0 8px 8px 0;
    }
    
  }

`

const JobsIndex = ({ data }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading/>
  }

  return (
    <>
      <Header 
        afterScroll 
        defaultTheme="light"
      />
      <HeroPage 
        title={data.jobsIndex.hero.title}
        description={data.jobsIndex.hero.description}
        imageUrl={data.jobsIndex.hero.image.url}
      />
      <Row justify="center" align="top">
        <Col xs={24} md={14}>
          <StyledReactiveBase
            app={process.env.APPBASE_APP_ID}
            credentials={process.env.APPBASE_API_KEY}
          >
            <SearchGroup>
              <DataSearch
                componentId="search"
                dataField={["title"]}
                queryFormat="and"
                showIcon={false}
                autosuggest={false}
                URLParams
                placeholder="Intitulé ou mots-clés..."
                defaultValue={(router.query.search !== undefined) && `${router.query.search}`}
                className="block"
              />
              <MultiDropdownList
                componentId="jobContract"
                dataField="contract.keyword"
                placeholder="Contrat"
                className="block"
              />
              <MultiDropdownList
                componentId="locationTown"
                dataField="location_town.keyword"
                placeholder="Lieu..."
                showSearch
                searchPlaceholder="Votre ville..."
                className="block"
                defaultValue={router.query.location !== undefined && (
                  typeof router.query.location === "object" ? (
                    router.query.location
                  ) : (
                    [router.query.location]
                  )
                )}
              />
            </SearchGroup>  
            <ReactiveList
              componentId="results"
              dataField="job"
              pagination={true}
              size={30}
              pages={3}
              renderResultStats={function(stats) {
                return (
                  <div className="result-stats">
                    <h4>{`${stats.numberOfResults} jobs trouvés en ${stats.time} ms`}</h4>
                  </div>
                )
              }}
              renderNoResults={function(stats) {
                return (
                  <div className="no-results">
                    <img src="https://res.cloudinary.com/angulaire/image/upload/c_scale,w_460/v1585831784/iw0elj82dmafo1tdzowd.gif" alt="No result design by vinodcgart"/>
                  </div>
                )
              }}
              react={{
                and: ['search', 'jobContract', 'locationTown'],
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                  {data.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                    />
                  ))}
                </ReactiveList.ResultCardsWrapper>
              )}
            />
          </StyledReactiveBase>
        </Col>
      </Row>
      <CTA
        title={data.jobsIndex.cta.title}
        categoriesList={data.jobsIndex.cta.categoriesList}
        jobsCount={data.jobsCount}
        buttons={data.jobsIndex.cta.button}
      />
      <Footer
        navigation={data.navigation.footer}
        space={{
          "p": ['200px 20px 20px 20px', '200px 80px 20px 80px']
        }}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`
  const query = print(JOBS_QUERY)
  const data = await request(endpoint, query)

  return { props: { data }}
}

export default JobsIndex