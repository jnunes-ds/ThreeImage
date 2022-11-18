import React from 'react';
import ThreeImage from '../ThreeImage';

import {Container, Title, Content} from './Home.styles';

interface Props {
  title: string;
}

export default function Home(): JSX.Element {
  return (
    <Container>
      <Title>Three JS</Title>
      <Content>
        <ThreeImage />
      </Content>
    </Container>
  );
}
