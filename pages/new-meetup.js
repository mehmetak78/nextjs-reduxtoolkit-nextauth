import React, {Fragment} from 'react';
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from 'next/head';
import PrivateContent from "../components/UI/PrivateContent";

const NewMeetup = (props) => {

  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    router.push('/');
  }

  return (
    <PrivateContent>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </PrivateContent>
  );
};

export default NewMeetup;
