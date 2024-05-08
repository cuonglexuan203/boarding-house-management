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
const AddRoomModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [roomName, setRoomName] = useState('');
  const [floor, setFloor] = useState(new Set([]));
  const [type, setType] = useState(new Set([]));
  const [area, setArea] = useState(0.0);
  const [rentAmount, setRentAmount] = useState(0.0);
  const [selectedServices, setSelectedServices] = useState(
    new Map<string, number>(),
  );
  const [addRoomTrigger, { isLoading }] = useAddRoomMutation();
  const FLOOR_TYPE = useMemo(
    () => ['GROUND', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'],
    [],
  );
  const ROOM_TYPE = useMemo(
    () => ['SINGLE', 'DOUBLE', 'TRIPLE', 'UNKNOWN'],
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

  const handleAddRoom = async () => {
    // validate input

    //
    // @ts-ignore
    const newRoom: IRoom = {
      id: 0,
      roomNumber: roomName,
      rentAmount,
      type: Array.from(type)[0],
      floor: Array.from(floor)[0],
      area,
    };
    //
    try {
      const response = await addRoomTrigger(newRoom).unwrap();
      console.log('Added room: ' + JSON.stringify(response));
    } catch (err: any) {
      console.log('Failed to add room: ' + err.message);
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
                  <h2 className="text-2xl ml-2">Add Room</h2>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Room info */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">
                        Room Information
                      </h2>
                      <p className="italic text-xs text-gray-500">
                        Input basic room information
                      </p>
                    </div>
                    {/* Required infor */}
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        size="sm"
                        className="col-span-2"
                        isRequired
                        isClearable
                        label="Room name"
                        value={roomName}
                        onValueChange={setRoomName}
                      />
                      <CustomSelect
                        size="sm"
                        isRequired={true}
                        label="Select floor"
                        items={FLOOR_TYPE}
                        selectedKey={floor}
                        onSelectionChange={setFloor}
                      />
                      <CustomSelect
                        size="sm"
                        isRequired={true}
                        label="Select type"
                        items={ROOM_TYPE}
                        description="Exmple: a DOUBLE room type means it is for two people"
                        selectedKey={type}
                        onSelectionChange={setType}
                      />
                      <Input
                        size="sm"
                        type="currency"
                        isRequired
                        label="Area"
                        placeholder="0.0"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              m2
                            </span>
                          </div>
                        }
                        value={area.toLocaleString()}
                        onValueChange={(value) => {
                          setArea(parseOnlyNumber(value));
                        }}
                      />
                      <Input
                        size="sm"
                        type="currency"
                        isRequired
                        label="Rent mount"
                        placeholder="0.0"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              VND
                            </span>
                          </div>
                        }
                        value={rentAmount.toLocaleString()}
                        onValueChange={(value) =>
                          setRentAmount(parseOnlyNumber(value))
                        }
                      />
                    </div>
                  </div>
                  {/* Service info */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">Service used</h2>
                      <p className="italic text-xs text-gray-500">
                        More services such as electricity, water, garbage, wifi
                        ...
                      </p>
                    </div>
                    {/* Service table */}
                    <div>
                      <table className="text-left text-sm">
                        <thead className="uppercase underline underline-offset-1 font-bold">
                          <tr>
                            <th className="p-3">
                              {/* <Checkbox value={'all'} /> */}
                            </th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Current Indicators</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceRows.map((s) => (
                            <ServiceRow
                              key={s.id}
                              service={s}
                              onValueChange={onValueChange}
                            />
                          ))}
                        </tbody>
                      </table>
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
                      handleAddRoom();
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

export default AddRoomModal;
