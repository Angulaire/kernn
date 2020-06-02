import React from 'react';
import { Row, Col, Button, Carousel } from 'antd';
import styled from 'styled-components';
import Layout from '../global/Layout';
import TestimonialCard from '../data-display/TestimonialCard';

const StyledCarousel = styled(Carousel)`
  ul {
    position: relative !important;
    justify-content: left !important;
    margin-block-start: 0;
    padding-inline-start: 0;
    margin: 20px 0 !important;
    button {
      background: ${props => props.theme.colors.primary.bg} !important;
    }
  }
  img {
    margin: 20px 0;
  }
`

type TestimonialsProps = {
  testimonials: any;
}

class Testimonials extends React.Component<TestimonialsProps> {
  state = {
    nav1: null,
    nav2: null
  };

  slider1: any;
  slider2: any;

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render(){
    const { testimonials } = this.props

    return (
      <section>
        <Layout
          color="secondary" 
          space={{
            "p": ['40px 20px', '140px 80px 0 0']
          }}
        >
          <Row justify="center" align="middle">
            <Col xs={24} md={12}>
              <Carousel
                dots={false}
                fade
                asNavFor={this.state.nav2}
                ref={slider => (this.slider1 = slider)}
              >
                {testimonials.map(testimonial =>
                  <div>
                    <TestimonialCard 
                      testimonial={testimonial}
                    />
                  </div>
                )}
              </Carousel>
            </Col>
            <Col xs={24} md={{ span: 10, offset: 2 }}>
              <StyledCarousel
                fade
                asNavFor={this.state.nav1}
                ref={slider => (this.slider2 = slider)}
              >
                {testimonials.map(testimonial =>
                  <div>
                    <p>TÉMOIGNAGES</p>
                    <h2>{testimonial.title}</h2>
                    <p>{testimonial.description}</p>
                  </div>
                )}
              </StyledCarousel>
            </Col>
          </Row>
        </Layout>
      </section>
    )
  }
}
export default Testimonials