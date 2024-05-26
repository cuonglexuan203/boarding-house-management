import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { PlusIcon } from './icon/PlusIcon';
import Image from 'next/image';
import { parseDate } from '@internationalized/date';
import { getReadableNumber, parseOnlyNumber } from '@/utils/converterUtil';
import { getCurrentDateString } from '@/utils/dateUtil';
import { useGetRoomsQuery } from '@/libs/services/roomApi';
import { IAddContract, IContract, IUser } from '@/utils/types';
import { useGetTenantsQuery } from '@/libs/services/tenantApi';
import Error from './Error';
import { TenantInputForm } from './TenantInputForm';
import RoomRadio from './RoomRadio';
import { useAddContractMutation } from '@/libs/services/contractApi';
import FailedIcon from './icon/FailedIcon';
import { toast } from 'react-toastify';
import SuccessfulIcon from './icon/SuccessfulIcon';

const AddContractModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //
  const [depositAmount, setDepositAmount] = useState(0);
  const [numberOfMember, setNumberOfMember] = useState(1);
  const [startDate, setStartDate] = useState(parseDate(getCurrentDateString()));
  const [endDate, setEndDate] = useState(parseDate(getCurrentDateString()));

  const [selectedRoom, setSelectedRoom] = useState<string>();
  const [tenantOption, setTenantOption] = useState('old');
  const [tenantId, setTenantId] = useState(new Set([]));
  const [tenantData, setTenantData] = useState<{ tenant: IUser }>({
    //@ts-ignore
    tenant: null,
  });
  //
  const {
    data: rooms = [],
    isLoading: isRoomLoading,
    error: roomError,
    refetch: roomRefetch,
  } = useGetRoomsQuery();
  const {
    data: tenants = [],
    isLoading: isTenantLoading,
    error: tenantError,
  } = useGetTenantsQuery();
  const [addContractTrigger] = useAddContractMutation();

  const availableRooms = useMemo(
    () => rooms?.filter((r) => r.status.toLowerCase() === 'available'),
    [rooms],
  );
  const handleAddContract = async () => {
    const newContract: IContract = {
      id: 0,
      depositAmount,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      numberOfMember,
      status: 'UNPAID',
      //   @ts-ignore
      contractRepresentation: null,
    };
    const roomId = selectedRoom;
    if (!roomId) {
      return;
    }
    const addContractBody: IAddContract = {
      contract: newContract,
      //   @ts-ignore
      contractRepresentation:
        tenantOption === 'old'
          ? {
              id: Array.from(tenantId)?.at(0),
            }
          : tenantData.tenant,
      roomId: Number(roomId),
    };
    try {
      const response = await addContractTrigger(addContractBody).unwrap();

      toast.success(
        <p>
          Add contract <span>(ID: {response.id})</span> successfully
        </p>,
        {
          icon: <SuccessfulIcon />,
        },
      );
    } catch (err: any) {
      console.log('Failed to add contract: ' + err.message);
      toast.error('Add failed', {
        icon: <FailedIcon />,
      });
    }
  };
  if (isRoomLoading || isTenantLoading) {
    return <div>loading...</div>;
  }
  if (roomError || tenantError) {
    return <Error />;
  }
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
                    <h2 className="text-2xl ml-2">Add a new contract</h2>
                    <p className="italic text-default-500">
                      Click the Select 1 or more rooms to contract
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-5 overflow-scroll scrollbar-hide">
                  {/* Room info */}
                  <div className="col-span-3 max-h-[450px]">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">Room List</h2>
                      <p className="italic text-xs text-gray-500">
                        Contract room list
                      </p>
                    </div>
                    {/* Room list */}
                    <div>
                      {isRoomLoading ? (
                        'Loading...'
                      ) : roomError ? (
                        'Error'
                      ) : (
                        <RadioGroup
                          color="warning"
                          label="Select rooms"
                          orientation="horizontal"
                          value={selectedRoom}
                          onValueChange={setSelectedRoom}
                        >
                          {availableRooms.map((r) => (
                            <RoomRadio key={r.id} value={r} />
                          ))}
                        </RadioGroup>
                      )}
                    </div>
                  </div>
                  {/* Contract info */}
                  <div className="space-y-4 col-span-2 max-h-[450px]">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">
                        Contract information
                      </h2>
                      <p className="italic text-xs text-gray-500">
                        Enter complete information for contract
                      </p>
                    </div>
                    {/* Required infor */}
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        isRequired
                        type="number"
                        label="Number of member"
                        value={numberOfMember.toString()}
                        onValueChange={(value) => {
                          const numberOfMemberValue = parseInt(value);
                          if (numberOfMemberValue === 0) {
                            setNumberOfMember(1);
                            return;
                          }
                          setNumberOfMember(
                            numberOfMemberValue < 0
                              ? Math.abs(numberOfMemberValue)
                              : numberOfMemberValue,
                          );
                        }}
                      />
                      <Input
                        isRequired
                        label="Deposit amount"
                        value={getReadableNumber(depositAmount).toString()}
                        onValueChange={(value) => {
                          const depositAmountValue = parseOnlyNumber(value);
                          setDepositAmount(
                            depositAmountValue < 0
                              ? Math.abs(depositAmountValue)
                              : depositAmountValue,
                          );
                        }}
                      />

                      <DatePicker
                        isRequired
                        size="md"
                        label={'Start date'}
                        value={startDate}
                        onChange={setStartDate}
                        showMonthAndYearPickers
                      />
                      <DatePicker
                        isRequired
                        size="md"
                        label={'End date'}
                        value={endDate}
                        onChange={setEndDate}
                        showMonthAndYearPickers
                      />
                      <RadioGroup
                        className="col-span-2"
                        color="warning"
                        label="Select contract representation for contract"
                        value={tenantOption}
                        onValueChange={setTenantOption}
                        orientation="horizontal"
                      >
                        <Radio value={'old'}>Existing tenant</Radio>
                        <Radio value={'new'}>New tenant</Radio>
                      </RadioGroup>
                    </div>

                    {/* Contrac representation */}
                    <div>
                      {tenantOption === 'old' && (
                        <Select
                          isRequired
                          className="col-span-2"
                          label="Select existing tenant for the contract"
                          selectedKeys={tenantId}
                          // @ts-ignore
                          onSelectionChange={setTenantId}
                        >
                          {tenants.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.fullName + ' - ' + t.phoneNumber}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                      {tenantOption === 'new' && (
                        // @ts-ignore
                        <TenantInputForm data={tenantData} />
                      )}
                    </div>
                  </div>
                </div>
                <ModalFooter className="space-x-6">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={async () => {
                      await handleAddContract();
                      roomRefetch();
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

export default AddContractModal;
