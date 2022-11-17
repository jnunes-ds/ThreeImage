import React from 'react';

import {Container, Title, Content} from './Home.styles';

interface Props {
  title: string;
}

export default function Home() {
  return (
    <Container>
      <Title>Three JS</Title>
      <Content />
    </Container>
  );
}
