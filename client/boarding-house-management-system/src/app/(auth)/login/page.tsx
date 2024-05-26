'use client';
import React, { useState } from 'react';
import { Input, Checkbox, Button, Link, Image } from '@nextui-org/react';
import { MailIcon } from '@/components/icon/MailIcon';
import { LockIcon } from '@/components/icon/LockIcon';
import { useRouter } from 'next/navigation';
import { useSignInMutation } from '@/libs/services/authApi';
import { setJwtAuthToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { setLoading } from '@/libs/features/loadingSlice';
import FloatingLoading from '@/components/FloatingLoading';
import { toast } from 'react-toastify';
import SuccessfulIcon from '@/components/icon/SuccessfulIcon';
import FailedIcon from '@/components/icon/FailedIcon';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginTrigger] = useSignInMutation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const jwtToken = Cookies.get('jwtToken');
  if (jwtToken) {
    router.replace('/');
  }
  if (jwtToken) {
    return <></>;
  }
  const handleSignIn = async () => {
    dispatch(setLoading(true));
    try {
      const data = await loginTrigger({ username, password }).unwrap();
      setJwtAuthToken(data);
      router.refresh(); // Redirect to home page or any other page after login
      toast('Login successful', {
        icon: <SuccessfulIcon />,
      });
    } catch (err) {
      toast.error('Login failed', {
        icon: <FailedIcon />,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const isSignInDisabled = !username || !password;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-1000">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-20">
          <Image
            src="/logo/roomhub_icon.jpg"
            alt="RoomHub Icon"
            width={300}
            height={100}
          />
        </div>
        <div className="w-full max-w-md p-8 top-20 bg-white rounded-lg shadow-lg transform transition duration-500 relative">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Log in
          </h2>
          <Input
            autoFocus
            endContent={
              <MailIcon className="text-3xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Username"
            variant="underlined"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            endContent={
              <LockIcon className="text-3xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            type="password"
            variant="underlined"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between mb-6">
            <Checkbox
              classNames={{
                label: 'text-sm',
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <div className="flex justify-center ">
            <Button
              color="primary"
              onClick={handleSignIn}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-600 focus:ring-blue-500  hover:scale-105 ${isSignInDisabled && 'opacity-50 cursor-not-allowed'}`}
              disabled={isSignInDisabled}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <FloatingLoading />}
    </>
  );
};

export default Login;
