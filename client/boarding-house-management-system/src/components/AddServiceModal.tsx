import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from './icon/PlusIcon';
import { useMemo, useState } from 'react';
import CustomSelect from './CustomSelect';
import Image from 'next/image';
import { parseOnlyNumber } from '@/utils/converterUtil';
import { IService } from '@/utils/types';
import { useAddServiceMutation } from '@/libs/services/serviceApi';
import { toast } from 'react-toastify';
import FailedIcon from './icon/FailedIcon';
import SuccessfulIcon from './icon/SuccessfulIcon';

const AddServiceModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setServiceName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [unit, setUnit] = useState(new Set([]));
  const [isMeteredService, setIsMeteredService] = useState(false);
  const [addServiceTrigger, { isLoading }] = useAddServiceMutation();
  const UNIT_TYPE = useMemo(
    () => [
      'kWh',
      'Cubic Meter',
      'Month',
      'Person',
      'Item',
      'Time',
      'Thing',
      'Kg',
    ],
    [],
  );

  const handleAddService = async () => {
    // validate input
    if (name.trim().length === 0) {
      toast.error('Service name can not empty', {
        icon: <FailedIcon />,
      });
      return;
    }
    if (Array.from(unit).length === 0) {
      toast.error('Please select unit', {
        icon: <FailedIcon />,
      });
      return;
    }

    //
    // @ts-ignore
    const newService: IService = {
      id: 0,
      name: name,
      price: price,
      unit: Array.from(unit)[0],
      isMeteredService,
    };
    //
    try {
      const response = await addServiceTrigger(newService).unwrap();
      toast.success(
        <p>
          Add service <span>(ID: {response.id})</span> successfully
        </p>,
        {
          icon: <SuccessfulIcon />,
        },
      );
    } catch (err: any) {
      console.log('Failed to add service: ' + err.message);
      toast.error('Add failed', {
        icon: <FailedIcon />,
      });
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        size="sm"
        className="focus:outline-none rounded-full bg-primary w-6 h-12 flex items-center justify-center"
      >
        <PlusIcon className="text-white" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
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
                <div className="flex justify-center items-center w-full">
                  <Image
                    alt=""
                    src={'/image/room/add.png'}
                    sizes="100"
                    width={40}
                    height={40}
                  />
                  <h2 className="text-2xl ml-2">Add Service</h2>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Room info */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">
                        Service Information
                      </h2>
                      <p className="italic text-xs text-gray-500">
                        Input basic Service information
                      </p>
                    </div>
                    {/* Required infor */}
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        size="sm"
                        className="col-span-2"
                        isRequired
                        isClearable
                        label="Service name"
                        value={name}
                        onValueChange={setServiceName}
                      />
                      <CustomSelect
                        size="sm"
                        isRequired={true}
                        label="Select unit"
                        items={UNIT_TYPE}
                        selectedKey={unit}
                        onSelectionChange={setUnit}
                      />
                      <Input
                        size="sm"
                        type="currency"
                        isRequired
                        label="Price"
                        placeholder="0.0"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              VND
                            </span>
                          </div>
                        }
                        value={price.toLocaleString()}
                        onValueChange={(value) => {
                          setPrice(parseOnlyNumber(value));
                        }}
                      />
                      <Checkbox
                        size="md"
                        className="col-span-2"
                        isSelected={isMeteredService}
                        onValueChange={setIsMeteredService}
                      >
                        <p className="font-semibold text-sm">Metered Service</p>
                        <p className="text-xs">
                          Tenant usage varies before and after
                        </p>
                      </Checkbox>
                    </div>
                  </div>
                </div>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleAddService();
                      onClose();
                    }}
                  >
                    Add
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

export default AddServiceModal;
