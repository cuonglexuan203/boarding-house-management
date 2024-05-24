'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Image } from '@nextui-org/react';
import { MailIcon } from '@/components/icon/MailIcon';
import { LockIcon } from '@/components/icon/LockIcon';
import { UserIcon } from '@/components/icon/UserIcon';
import { PhoneIcon } from '@/components/icon/PhoneIcon';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setAllFieldsFilled(checkAllFieldsFilled());
  }, [username, phoneNumber, email, password, confirmPassword]);

  useEffect(() => {
    // Check if passwords match whenever either password or confirmPassword changes
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const checkAllFieldsFilled = () => {
    return (
      !!username && !!phoneNumber && !!email && !!password && !!confirmPassword
    );
  };

  const handleRegister = () => {
    if (!checkAllFieldsFilled()) {
      console.log('Please fill in all fields before registering');
      return;
    }

    if (!passwordsMatch) {
      console.log('Passwords do not match');
      return;
    }

    console.log('Registration successful!');
    router.push('/');
  };

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
            Register
          </h2>
          <div>
            <Input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              endContent={
                <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Username"
              variant="bordered"
              className="mb-6 input-large"
            />
          </div>
          <div>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              endContent={
                <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Phone Number"
              variant="bordered"
              className="mb-6 input-large"
            />
          </div>
          <div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Email"
              variant="bordered"
              className="mb-6 input-large"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Password"
              type="password"
              variant="bordered"
              className="input-large"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Confirm Password"
              type="password"
              variant="bordered"
              className="input-large"
            />
          </div>
          {!passwordsMatch && (
            <span className="text-red-500">Passwords do not match</span>
          )}
          <div className="flex justify-center hover:scale-105">
            <Button
              color="primary"
              disabled={!allFieldsFilled || !passwordsMatch}
              onClick={handleRegister}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-600 focus:ring-blue-500 ${
                (!allFieldsFilled || !passwordsMatch) &&
                'opacity-50 cursor-not-allowed'
              }`}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
