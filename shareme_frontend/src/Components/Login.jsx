import React, { useEffect } from 'react';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import { client } from '../Container/client';


const Login = () => {

  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
  const navigate = useNavigate()

useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
});

const responseGoogle = (response) => {
console.log(response);
localStorage.setItem('user', JSON.stringify(response.profileObj))

const  { name, googleId, imageUrl } = response.profileObj;

const doc = {
  _id:googleId, 
  _type: 'user',
  userName: name,
  image: imageUrl
  }
  
  client.createIfNotExists(doc).then(() => { navigate('/', { replace:true })})
}


  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className="relative"></div>
          <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
          />
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width='130px'  alt='logo'/>
              <div className="shadow-2xl">
                <GoogleLogin
                clientId={clientId}
                render={({onClick,disabled}) =>(
                  <button 
                  type= 'button'
                  className='bg-mainColor flex justify-center items-center p-2 mt-4 rounded-lg cursor-pointer outline-none'
                  onClick={onClick}
                  disabled={disabled}
                  >
                    <FcGoogle className='mr-4'/> Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'
                />
              </div>
            </div>
          </div>
        </div>

  )
}

export default Login