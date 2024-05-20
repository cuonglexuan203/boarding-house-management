import { getReadableNumber, parseOnlyNumber } from '@/utils/converterUtil';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { CustomCellEditorProps } from 'ag-grid-react';
import Image from 'next/image';
import React, { useState } from 'react';

export interface ISurchargeEditorMoelProps extends CustomCellEditorProps {
  label: string;
  currentValue: number;
  currentReason: string;
  className?: string;
}

const SurchargeEditorModal = ({
  label,
  currentValue,
  currentReason,
  className,
  onValueChange,
  stopEditing,
}: ISurchargeEditorMoelProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const [surchargeType, setSurchargeType] = useState(
    currentValue >= 0 ? 'plus' : 'deductions',
  );
  const [surcharge, setSurcharge] = useState(Math.abs(currentValue));
  const [reason, setReason] = useState(currentReason);

  const handleUpdateSurcharge = () => {
    const newSurcharge = {
      surcharge: surchargeType === 'plus' ? surcharge : -1 * surcharge,
      surchargeReason: reason,
    };
    onValueChange(newSurcharge);
  };

  return (
    <div className={className}>
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
          {(onClose) => {
            return (
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
                    <h2 className="text-2xl ml-2">{label}</h2>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <RadioGroup
                    size="lg"
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
                    value={reason}
                    onValueChange={setReason}
                  />
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={(e) => {
                        onClose();
                        stopEditing();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        handleUpdateSurcharge();
                        onClose();
                        stopEditing();
                      }}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SurchargeEditorModal;
