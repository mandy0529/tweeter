import React from 'react';
import styled from 'styled-components';
import {Header, Tweet} from '../components';

function Home() {
  return (
    <Wrapper>
      <Header />
      <Tweet />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
export default Home;
