import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';
import Shapes from '../global/Shapes'
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';

const PlayerGroup = styled.div`
  ${space}
  overflow: hidden;
  position: relative;

  .react-player {
    background: ${props => props.theme.colors.secondary.bg};
  }
`



class TestimonialCard extends React.Component {
  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.refs.player))
  }

  handlePause = () => {
    this.refs.player.showPreview()
  }

  render() {
    const { testimonial } = this.props

    return (
      <PlayerGroup
        pt={['38px','110px']}
      >
        <ReactPlayer
          ref='player'
          url={testimonial.videoUrl}
          light={testimonial.imageThumbnail.url}
          onPlay={this.handleClickFullscreen}
          onPause={this.handlePause}
          playing
          width="100%"
          className='react-player'
        />
        <Shapes
          shapes={[
            {
              image: {
                url: "https://res.cloudinary.com/angulaire/image/upload/v1585303208/vewuqzxqnut2cfjev6yc.svg"
              },
              position: {
                zIndex: "-1",
                top: "0"
              },
              size: {
                height: ["200px", "435px"],
                width: ["200px", "435px"]
              }
            },
          ]}
        />
      </PlayerGroup>
    );
  }
};

export default TestimonialCard