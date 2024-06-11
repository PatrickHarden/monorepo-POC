import React, { FC } from 'react';
import styled from 'styled-components';
import { GLCheckbox } from '@ryanshaug/gl-controls';


interface Props {
  /** map header */
  mapHeader : string
}

const GLMap: FC<Props> = (props:Props) => {

  const { mapHeader } = props;

  return (
    <Container>
        <Header>{mapHeader}</Header>
        <GLCheckbox name="check" label="That sounds cool" checked={true}/> 
    </Container>
  );
}

const Container = styled.div`
  width:100%;
  display:inline-flex;
  position:relative;
`;

const Header = styled.div`
    font-size: 32px;
    font-weight: bold
`;

export default GLMap;