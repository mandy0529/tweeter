import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {collectionRef} from '../firebase';
import {addDoc, serverTimestamp, getDocs, onSnapshot} from 'firebase/firestore';
import {Tweet} from '.';
import {useGlobalContext} from '../context/AppContext';

function Form() {
  const {user} = useGlobalContext();
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      message: tweet,
      createdAt: serverTimestamp(),
      owner: user.id,
    });
    setTweet('');
  };

  const handleChange = (e) => {
    const {value} = e.target;
    setTweet(value);
  };

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      let newBook = [];
      data.docs.map((item) => {
        return newBook.push({...item.data(), id: item.id});
      });
      setTweets(newBook);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
      <div>
        {tweets &&
          tweets.map((item) => {
            return <Tweet key={item.id} {...item} />;
          })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 3rem;
`;
export default Form;
