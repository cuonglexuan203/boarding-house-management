'use client';
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from '@nextui-org/react';
import { MailIcon } from './icon/MailIcon';
import { LockIcon } from './icon/LockIcon';
import { useRouter } from 'next/navigation';
import { useSignInMutation } from '@/libs/services/authApi';
import { setJwtAuthToken } from '@/utils/auth';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { setLoading } from '@/libs/features/loadingSlice';
import FloatingLoading from './FloatingLoading';
import { toast } from 'react-toastify';
import SuccessfulIcon from './icon/SuccessfulIcon';
import FailedIcon from './icon/FailedIcon';

export default function LoginModal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onOpenChange } = useDisclosure();
  const router = useRouter();
  const [loginTrigger] = useSignInMutation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    try {
      const data = await loginTrigger({ username, password }).unwrap();
      toast('Login successful', {
        icon: <SuccessfulIcon />,
      });
      await setJwtAuthToken(data);
      router.refresh(); // Redirect to home page or any other page after login
    } catch (err) {
      toast.error('Login failed', {
        icon: <FailedIcon />,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onClose = (defaultOnClose: () => void) => {
    router.back();
    defaultOnClose();
  };

  return (
    <>
      <Modal
        hideCloseButton
        isOpen={true}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(defaultOnClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onValueChange={setUsername}
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
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
                  onPress={async () => {
                    await handleSignIn();
                    onClose(defaultOnClose);
                  }}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isLoading && <FloatingLoading />}
    </>
  );
}
