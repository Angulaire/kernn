import DarkModeToggle from '../global/DarkModeToggle'
import Layout from '../global/Layout'
import { Row, Col } from 'antd';
import Logo from '../global/Logo'
import { TwitterCircleFilled, LinkedinFilled } from '@ant-design/icons';
import styled from 'styled-components';

const FooterGroup = styled.footer`
  border-top: 1px solid ${props => props.theme.colors.primary.border};
`

const Sitemap = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 22px;
  li {
    margin: 12px 0;
  }
`

const SEO = styled(Col)`
  @media only screen and (min-width: 768px) { 
    border-right: 1px solid ${props => props.theme.colors.primary.border};
  }
  margin-bottom: 40px;

  h3 {
    font-size: 26px;
  }
  p {
    font-size: 14px;
  }
  ul {
    list-style: none;
    padding: 35px 0 0 0;
    li {
      margin-right: 12px;
      display: inline;
      svg { 
        font-size: 22px;
      }
    }
  }

`

const CopyrightFooter = styled(Row)`
  border-top: 1px solid ${props => props.theme.colors.primary.border};
  margin-top: 20px;
  padding-top: 20px;

  p {
    margin: 12px 0;
    font-size: 14px;
  }
`

type IProps = {
  navigation: any;
  space: any;
}

const defaultProps = {
  navigation: [],
  space: {
    "p": ['40px 20px 20px 20px', '40px 80px 20px 80px']
  }
};

const Footer = ({ navigation, space }: IProps) => {
  return (
    <FooterGroup>
      <Layout
        color="navigation"
        space={space}
        textAlign={['center', 'left']}
      >
        <Row justify="start" align="top" gutter={[8, 8]}>
          <SEO xs={24} md={6}>
            <Logo/>
            <ul>
              <li>
                <a href="https://twitter.com/Jonathannabais" target="_blank">
                  <TwitterCircleFilled />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jonathannabais/" target="_blank">
                  <LinkedinFilled />
                </a>
              </li>
            </ul>
            <DarkModeToggle />
          </SEO>
          {navigation.map(category =>
            <Col xs={12} md={{ span: 3, offset: 1 }}>
              <h4>{category.categoryName}</h4>
              <Sitemap>
                {category.links.map((link, i) => 
                  <li key={i}>
                    <a href={link.href} target={link.target}>{link.name}</a>
                  </li>
                )}
              </Sitemap>
            </Col>
          )}
        </Row>
        <CopyrightFooter justify="space-between" align="middle">
          <Col xs={24} md={12}>
            <p>© Powered by <a href="http://angulaire.io/" target="_blank">Angulaire</a></p>
          </Col>
        </CopyrightFooter>
      </Layout>
    </FooterGroup>
  )
}

Footer.defaultProps = defaultProps;
export default Footer