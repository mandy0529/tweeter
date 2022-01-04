import React from 'react';
import styled from 'styled-components';
import Loader from '../components/Loader';
import {useGlobalContext} from '../context/AppContext';

function Header() {
  const {user, googleLogout, loading} = useGlobalContext();
  const {name, photo, email} = user;
  const isLoggedIn = name !== '' && photo !== '' && email !== '';

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {isLoggedIn && (
        <>
          <div>
            <h3>{name}</h3>
            <h4>{email}</h4>
            <img src={photo} alt="profile" />
          </div>

          <button onClick={googleLogout}>logout</button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: teal;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default Header;
