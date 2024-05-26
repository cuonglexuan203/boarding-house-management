import { useDeleteServiceMutation } from '@/libs/services/serviceApi';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import SuccessfulIcon from './icon/SuccessfulIcon';
import FailedIcon from './icon/FailedIcon';

const DeleteServiceModal = ({ serviceId }: { serviceId: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteServiceTrigger] = useDeleteServiceMutation();
  const handleDeleteService = useCallback(async () => {
    try {
      await deleteServiceTrigger(serviceId).unwrap();
      toast.success(<p>Delete service successfully</p>, {
        icon: <SuccessfulIcon />,
      });
    } catch (err) {
      console.error(err);
      toast.error('Delete failed', {
        icon: <FailedIcon />,
      });
    }
  }, [serviceId]);
  return (
    <>
      <Button className="bg-transparent" isIconOnly onPress={onOpen}>
        <Image
          alt=""
          src={'/image/service/trash.png'}
          sizes="100%"
          width={0}
          height={0}
          className="w-8 h-auto"
        />
      </Button>
      <Modal
        placement="center"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        isDismissable={false}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex justify-center items-center w-full text-center">
                  <div className="mr-2">
                    <Image
                      alt=""
                      src={'/image/service/bin.png'}
                      sizes="100"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl ml-2 text-danger">
                      Delete Service
                    </h2>
                    <p className="italic text-default-500 font-normal">
                      Please make sure you want to delete this service
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <ModalFooter className="space-x-6">
                  <Button color="primary" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onPress={() => {
                      handleDeleteService();
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteServiceModal;
