import React from 'react';
import styled from 'styled-components';
import {Header, Form} from '../components';

function Home() {
  return (
    <Wrapper>
      <Header />
      <Form />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
export default Home;
