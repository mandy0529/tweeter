import React, {useState} from 'react';
import styled from 'styled-components';
import {collectionRef} from '../firebase';
import {addDoc, serverTimestamp} from 'firebase/firestore';

function Tweet() {
  const [tweet, setTweet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      message: tweet,
    });

    setTweet('');
  };

  const handleChange = (e) => {
    const {value} = e.target;
    setTweet(value);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={tweet}
          placeholder="what's on your mind ?"
        />
        <input type="submit" value="submit" />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 3rem;
`;
export default Tweet;
