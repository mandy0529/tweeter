import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {collectionRef, storage} from '../firebase';
import {addDoc, serverTimestamp, onSnapshot} from 'firebase/firestore';
import {Tweet} from '.';
import {useGlobalContext} from '../context/AppContext';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';

function Form() {
  const {user} = useGlobalContext();
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState('');

  let newNumber = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageArray = [];
    file.map((item, index) => {
      const storageRef = ref(storage, `${item.name}`);
      const uploadTask = uploadBytesResumable(storageRef, item);

      uploadTask.on(
        'state_changed',
        (item) => {
          Math.round((item.bytesTransferred / item.totalBytes) * 100);
        },
        (error) => console.log(error, '2'),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          imageArray.push(url);
          newNumber++;
          console.log(newNumber, 'newnumber1');
          if (file.length === newNumber) {
            console.log(newNumber, 'newnumber2');
            await addDoc(collectionRef, {
              message: tweet,
              createdAt: serverTimestamp(),
              owner: user.id,
              url: imageArray,
            });
          }
        }
      );
    });

    setTweet('');
    setPreview('');
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

  const fileUpload = (e) => {
    const files = Array.from(e.target.files).map((item) => {
      setFile((prev) => [...prev, item]);
      return URL.createObjectURL(item);
    });
    setPreview(files);
    // Array.from(e.target.files).map((item) => {
    //   let fileArray = [];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(item);
    //   reader.onloadend = (finishevent) => {
    //     return fileArray.push({
    //       ...finishevent,
    //       url: finishevent.target.result,
    //     });
    //   };
    //   setPreview(fileArray);
    // });
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
          required
        />
        <input type="submit" value="submit" />
      </form>
      <div>
        <input
          required
          multiple
          type="file"
          name="file"
          accept="image/*"
          onChange={fileUpload}
        />
        {preview &&
          preview.map((item, index) => {
            return <img key={index} src={item} alt="preview" />;
          })}
      </div>
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
  img {
    width: 100px;
  }
`;

export default Form;
