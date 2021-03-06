import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import React, {useState} from 'react';
import styled from 'styled-components';
import {useGlobalContext} from '../context/AppContext';
import {db, storage} from '../firebase';
import {deleteObject, ref} from 'firebase/storage';

function Tweet({message, id, owner, url}) {
  const {user} = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTweet, setEditedTweet] = useState(message);

  const handleDelete = async () => {
    const isOk = window.confirm('are you sure delete this item ?');
    if (isOk) {
      const deletedRef = doc(db, 'tweets', id);
      await deleteDoc(deletedRef);
      url.map(async (item) => {
        const deserveRef = ref(storage, item);
        await deleteObject(deserveRef);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isOk = window.confirm('are you sure edit this item ?');
    if (isOk) {
      const updateRef = doc(db, 'tweets', id);
      await updateDoc(updateRef, {
        message: editedTweet,
      });
      setIsEditing(false);
    }
  };

  return (
    <Wrapper>
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setEditedTweet(e.target.value)}
              type="text"
              value={editedTweet}
              placeholder="edit your message"
            />
            <input type="submit" value="update" />
          </form>
          <button onClick={() => setIsEditing(false)}>cancel</button>
        </>
      ) : (
        <div className="tweet" key={id}>
          <div>{message}</div>
          {/* {url &&
            url.map((item, index) => {
              return <img key={index} src={item} alt="tweet-img" />;
            })} */}
          {owner === user.id && (
            <>
              <button data-id={id} onClick={handleDelete}>
                delete
              </button>
              <button onClick={() => setIsEditing((prev) => !prev)}>
                edit
              </button>
            </>
          )}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .tweet {
    margin: 1rem 0;
  }
`;
export default Tweet;
