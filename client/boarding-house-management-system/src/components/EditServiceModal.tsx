import { useGetRoomsQuery } from '@/libs/services/roomApi';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import CustomSelect from './CustomSelect';
import RoomCheckbox from './RoomCheckbox';
import { parseOnlyNumber } from '@/utils/converterUtil';
import { IService } from '@/utils/types';
import { useUpdateServiceMutation } from '@/libs/services/serviceApi';
import { toast } from 'react-toastify';
import FailedIcon from './icon/FailedIcon';
import SuccessfulIcon from './icon/SuccessfulIcon';

const EditServiceModal = ({ service }: { service: IService }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedRooms, setSelectedRooms] = useState<string[]>(
    service.roomIds.map(String),
  );
  const [name, setServiceName] = useState(service.name);
  const [price, setPrice] = useState(service.price);
  const [unit, setUnit] = useState(new Set([service.unit]));
  const [isMeteredService, setIsMeteredService] = useState(
    service.isMeteredService,
  );
  const [updateServiceTrigger] = useUpdateServiceMutation();
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
  //
  const {
    data: rooms = [],
    isLoading: isRoomLoading,
    error: roomError,
  } = useGetRoomsQuery();

  const occupiedRooms = useMemo(
    () => rooms?.filter((r) => r.status.toLowerCase() === 'occupied'),
    [rooms],
  );
  const handleUpdateService = async () => {
    if (name.trim().length === 0) {
      setServiceName(service.name);
      toast.error('Service name can not empty', {
        icon: <FailedIcon />,
      });
      return;
    }
    if (Array.from(unit).length === 0) {
      setUnit(new Set([service.unit]));
      toast.error('Please select unit', {
        icon: <FailedIcon />,
      });
      return;
    }
    try {
      const modifiedService: IService = {
        id: service.id,
        name,
        price,
        // @ts-ignore
        unit: Array.from(unit).at(0),
        isMeteredService,
        roomIds: selectedRooms.map(Number),
      };
      const updatedService =
        await updateServiceTrigger(modifiedService).unwrap();
      toast.success(
        <p>
          Add service <span>(ID: {updatedService.id})</span> successfully
        </p>,
        {
          icon: <SuccessfulIcon />,
        },
      );
      console.log('Service updated: ' + JSON.stringify(updatedService));
    } catch (err: any) {
      console.error(err);
      toast.error('Update failed', {
        icon: <FailedIcon />,
      });
    }
  };

  return (
    <>
      <Button className="bg-transparent" isIconOnly onPress={onOpen}>
        <Image
          alt=""
          src={'/image/service/edit.png'}
          sizes="100%"
          width={0}
          height={0}
          className="w-8 h-auto"
        />
      </Button>
      <Modal
        placement="top"
        size="5xl"
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
                <div className="flex justify-center items-center w-full text-center">
                  <Image
                    alt=""
                    src={'/image/room/add.png'}
                    sizes="100"
                    width={40}
                    height={40}
                  />
                  <div>
                    <h2 className="text-2xl ml-2">Edit Service</h2>
                    <p className="italic text-default-500">
                      Click the Select 1 or more rooms to service
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-5">
                  {/* Room info */}
                  <div className="col-span-3">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">Room List</h2>
                      <p className="italic text-xs text-gray-500">
                        Service room list
                      </p>
                    </div>
                    {/* Room list */}
                    <div className="mt-2">
                      {isRoomLoading ? (
                        'Loading...'
                      ) : roomError ? (
                        'Error'
                      ) : (
                        <CheckboxGroup
                          color="warning"
                          label="Select rooms"
                          orientation="horizontal"
                          value={selectedRooms}
                          onValueChange={setSelectedRooms}
                        >
                          {occupiedRooms.map((r) => (
                            <RoomCheckbox key={r.id} value={r} />
                          ))}
                        </CheckboxGroup>
                      )}
                    </div>
                  </div>
                  {/* Service info */}
                  <div className="space-y-4 col-span-2">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">
                        Service information
                      </h2>
                      <p className="italic text-xs text-gray-500">
                        Enter complete information for the service
                      </p>
                    </div>
                    {/* Required infor */}
                    <div className="grid grid-cols-2 gap-4">
                      <Spacer y={3} />
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
                <ModalFooter className="space-x-6">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleUpdateService();
                      onClose();
                    }}
                  >
                    Update
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

export default EditServiceModal;
