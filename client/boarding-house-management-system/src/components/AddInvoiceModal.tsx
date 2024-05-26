import {
  Button,
  CheckboxGroup,
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
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { PlusIcon } from './icon/PlusIcon';
import Image from 'next/image';
import { parseDate } from '@internationalized/date';
import { getReadableNumber, parseOnlyNumber } from '@/utils/converterUtil';
import { getCurrentDateString } from '@/utils/dateUtil';
import { useGetRoomsQuery } from '@/libs/services/roomApi';
import RoomCheckbox from './RoomCheckbox';
import { IAddInvoice, IInvoice } from '@/utils/types';
import { useAddInvoiceMutation } from '@/libs/services/invoiceApi';
import { toast } from 'react-toastify';
import SuccessfulIcon from './icon/SuccessfulIcon';
import FailedIcon from './icon/FailedIcon';

const reasons = [
  {
    label: 'First month collection',
    value: 'FIRST_MONTH',
  },
  {
    label: 'Monthly collection',
    value: 'MONTHLY',
  },
  {
    label: 'Deposit collection',
    value: 'DEPOSIT',
  },
  {
    label: 'Cyclical room charge',
    value: 'CYCLICAL_ROOM_CHARGE',
  },
  {
    label: 'Service fees',
    value: 'SERVICE_FEE',
  },
  {
    label: 'Surcharge collection',
    value: 'SURCHARGE',
  },
  {
    label: 'Unknown collection',
    value: 'UNKNOWN',
  },
];

const AddInvoiceModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pollingMonth, setPollingMonth] = useState(
    parseDate(getCurrentDateString()),
  );
  const [type, setType] = useState(new Set(['MONTHLY']));
  const [invoiceDate, setInvoiceDate] = useState(
    parseDate(getCurrentDateString()),
  );
  const [paymentDeadline, setPaymentDeadline] = useState(
    parseDate(getCurrentDateString()),
  );
  const [numberOfMonth, setNumberOfMonth] = useState(1);
  const [surchargeType, setSurchargeType] = useState('plus');
  const [surcharge, setSurcharge] = useState(0);
  const [surchargeReason, setSurchargeReason] = useState('');
  //
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  //
  const {
    data: rooms = [],
    isLoading: isRoomLoading,
    error: roomError,
  } = useGetRoomsQuery();
  const [addInvoiceTrigger] = useAddInvoiceMutation();

  const occupiedRooms = useMemo(
    () => rooms?.filter((r) => r.status.toLowerCase() === 'occupied'),
    [rooms],
  );
  const handleAddInvoices = async () => {
    const newInvoice: IInvoice = {
      // @ts-ignore
      type: Array.from(type).at(0),
      invoiceDate: invoiceDate.toString(),
      paymentDeadline: paymentDeadline.toString(),
      numberOfMonth,
      pollingMonth: pollingMonth.toString(),
      surcharge: surchargeType === 'plus' ? surcharge : -surcharge,
      surchargeReason,
    };
    const roomIds = selectedRooms;
    const addInvoicesBody: IAddInvoice = {
      invoice: newInvoice,
      roomIds,
    };
    try {
      const response = await addInvoiceTrigger(addInvoicesBody).unwrap();
      toast.success(<p>Add {response.length} invoice successfully</p>, {
        icon: <SuccessfulIcon />,
      });
    } catch (err: any) {
      console.log('Failed to add invoice: ' + err.message);
      toast.error('Add invoice failed', {
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
                    <h2 className="text-2xl ml-2">
                      Multi-room billing (Fast billing)
                    </h2>
                    <p className="italic text-default-500">
                      Click the Select 1 or more rooms to bill
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
                        Bill room list
                      </p>
                    </div>
                    {/* Room list */}
                    <div>
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
                  {/* Invoice info */}
                  <div className="space-y-4 col-span-2">
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-xl font-semibold">
                        Invoice information
                      </h2>
                      <p className="italic text-xs text-gray-500">
                        Enter complete information for billing
                      </p>
                    </div>
                    {/* Required infor */}
                    <div className="grid grid-cols-2 gap-3">
                      <DatePicker
                        isRequired
                        size="md"
                        label={'Polling month'}
                        value={pollingMonth}
                        onChange={setPollingMonth}
                        showMonthAndYearPickers
                      />
                      <Input
                        isRequired
                        type="number"
                        label="Number of month"
                        value={numberOfMonth.toString()}
                        onValueChange={(value) => {
                          const numberOfMonthValue = parseInt(value);
                          setNumberOfMonth(
                            numberOfMonthValue < 0
                              ? Math.abs(numberOfMonthValue)
                              : numberOfMonthValue,
                          );
                        }}
                      />
                      <Select
                        isRequired
                        className="col-span-2"
                        label="Reasons for collecting money"
                        placeholder="Select a reason"
                        selectedKeys={type}
                        // @ts-ignore
                        onSelectionChange={setType}
                      >
                        {reasons.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <DatePicker
                        isRequired
                        size="md"
                        label={'Invoice date'}
                        value={invoiceDate}
                        onChange={setInvoiceDate}
                        showMonthAndYearPickers
                      />
                      <DatePicker
                        isRequired
                        size="md"
                        label={'Payment deadline'}
                        value={paymentDeadline}
                        onChange={setPaymentDeadline}
                        showMonthAndYearPickers
                      />
                    </div>
                    {/* Surcharge infor */}
                    {/* Header */}
                    <div className="border-s-4 border-[#4b4ce4] ps-2">
                      <h2 className="text-lg font-semibold">Plus/Subtract:</h2>
                      <p className="italic text-xs text-gray-500">
                        For example, add New Year&apos;s Day, reduce covid ...
                      </p>
                    </div>
                    <div className="space-y-3">
                      <RadioGroup
                        size="md"
                        label="Select surcharge type"
                        orientation="horizontal"
                        color="warning"
                        value={surchargeType}
                        onValueChange={setSurchargeType}
                      >
                        <Radio value="plus" description="Add to invoice">
                          Plus
                        </Radio>
                        <Radio
                          value="deductions"
                          description="Deduction for invoice"
                        >
                          Deductions
                        </Radio>
                      </RadioGroup>
                      <Input
                        size="md"
                        className="col-span-2"
                        isRequired
                        isClearable
                        label="Amount plus/deduction(vnd)"
                        value={getReadableNumber(surcharge).toString()}
                        onValueChange={(value) => {
                          const surchargeValue = parseOnlyNumber(value);
                          setSurcharge(
                            surchargeValue < 0
                              ? Math.abs(surchargeValue)
                              : surchargeValue,
                          );
                        }}
                      />
                      <Textarea
                        label="Reason for addition or deduction"
                        value={surchargeReason}
                        onValueChange={setSurchargeReason}
                      />
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
                      handleAddInvoices();
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

export default AddInvoiceModal;
