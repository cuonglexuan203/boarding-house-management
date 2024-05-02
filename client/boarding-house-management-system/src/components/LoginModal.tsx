'use client';
import React, { useEffect } from 'react';
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

export default function LoginModal() {
  const { onOpenChange } = useDisclosure();
  const router = useRouter();
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
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
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
                <Button color="primary" onPress={() => onClose(defaultOnClose)}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
