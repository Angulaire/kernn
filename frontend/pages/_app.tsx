import React from 'react'
import App from 'next/app'
import TagManager from 'react-gtm-module'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config'
import Providers from '../components/global/Providers';
import { ApolloProvider } from "@apollo/react-hooks";  
import withApollo from "../hocs/withApollo";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost"

const tagManagerArgs = {
  gtmId: 'GTM-KMVLCMK'
}

interface IProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

class MyApp extends App<IProps> {
  componentDidMount () {
    TagManager.initialize(tagManagerArgs)
  }

  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <ApolloProvider client={apollo}>
        <DefaultSeo {...SEO} />
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp);