import React from 'react';
import styled from 'styled-components';

import {useGlobalContext} from '../context/AppContext';

function Login() {
  const {googleLogin} = useGlobalContext();

  return (
    <Wrapper>
      <button onClick={googleLogin}>google login</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 5rem;
`;
export default Login;
