'use client';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { MailIcon } from './icon/MailIcon';
import { LockIcon } from './icon/LockIcon';
import { UserIcon } from './icon/UserIcon';
import { PhoneIcon } from './icon/PhoneIcon';
import { useRouter } from 'next/navigation';

export default function RegisterModal() {
  const { onOpenChange } = useDisclosure();
  const router = useRouter();
  const onClose = (defaultOnClose: () => void) => {
    router.back();
    defaultOnClose();
  };

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
    onClose(onOpenChange);
  };

  return (
    <Modal
      hideCloseButton
      isOpen={true}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(defaultOnClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
            <ModalBody>
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
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    placeholder="Password"
                    type="password"
                    variant="bordered"
                  />
                </div>
                <div>
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    placeholder="Confirm Password"
                    type="password"
                    variant="bordered"
                  />
                </div>
              </div>
              {!passwordsMatch && (
                <span className="text-red-500">Passwords do not match</span>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => onClose(defaultOnClose)}
              >
                Close
              </Button>
              <Button
                color="primary"
                disabled={!allFieldsFilled || !passwordsMatch}
                onPress={handleRegister}
              >
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
