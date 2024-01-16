import React from 'react';
import Login from '../components/sign-login/Login';
import Signup from '../components/sign-login/Signup';
import Header from '../components/home/Header';

function HomePage() {
  return (
    <>
    <Header/>
    <Login />
    {/* <Signup/> */}
    </>
  );
}

export default HomePage;
