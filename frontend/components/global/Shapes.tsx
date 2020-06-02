import styled from 'styled-components';
import { position, layout, background } from 'styled-system'

const Shape = styled.div`
  ${layout}
  ${position}
  ${background}
  display: block;
  background-repeat: no-repeat;
  background-size: contain;
`

type IProps = { 
  shapes: any;
}

const defaultProps = {
  shapes: []
};

const Shapes = ({ shapes }: IProps) => {
  
  return (
    <>
      {shapes.map(shape =>
        <Shape
          position="absolute"
          zIndex={shape.position?.zIndex}
          top={shape.position?.top}
          right={shape.position?.right}
          bottom={shape.position?.bottom}
          left={shape.position?.left}
          width={shape.size?.width}
          height={shape.size?.height}
          backgroundImage={`url(${shape.image.url})`}
        />
      )}
    </>
  )
}

Shapes.defaultProps = defaultProps;
export default Shapes