import {
  Button,
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
import ServiceRow from './ServiceRow';
import Image from 'next/image';
import { parseOnlyNumber } from '@/utils/converterUtil';
import { IRoom } from '@/utils/types';
import { useAddRoomMutation } from '@/libs/services/roomApi';
import { useAddServiceMutation } from '@/libs/services/serviceApi';

const serviceColumns = [
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'price',
    label: 'PRICE',
  },
  {
    key: 'currentIndicators',
    label: 'CURRENT INDICATORs',
  },
];
const serviceRows = [
  {
    id: 1,
    name: 'Electricity',
    price: '3500',
    unit: 'kwh',
  },
  {
    id: 2,
    name: 'Water',
    price: '12000',
    unit: 'm3',
  },
  {
    id: 3,
    name: 'Wifi',
    price: '30000',
    unit: 'month',
  },
];
const AddServiceModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setServiceName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [unit, setUnit] = useState(new Set([]));
  // const [area, setArea] = useState(0.0);
  // const [rentAmount, setRentAmount] = useState(0.0);
  const [selectedServices, setSelectedServices] = useState(
    new Map<string, number>(),
  );
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
  const onValueChange = (
    isChecked: boolean,
    value: { id: string; value: number },
  ) => {
    if (!isChecked) {
      setSelectedServices((pre) => {
        const newMap = new Map(pre);
        newMap.delete(value.id);
        return newMap;
      });
      console.log(false);
      return;
    }
    setSelectedServices((pre) => {
      const newMap = new Map(pre);
      newMap.set(value.id, value.value);
      return newMap;
    });
    console.log(true);
  };

  const handleAddService = async () => {
    // validate input

    //
    // @ts-ignore
    const newService: IService = {
      id: 0,
      name: name,
      price: price,
      unit: Array.from(unit)[0],
    };
    //
    try {
      const response = await addServiceTrigger(newService).unwrap();
      console.log('Added service: ' + JSON.stringify(response));
    } catch (err: any) {
      console.log('Failed to add service: ' + err.message);
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
