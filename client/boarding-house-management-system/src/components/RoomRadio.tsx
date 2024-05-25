import { getReadableNumber } from '@/utils/converterUtil';
import { IRoom } from '@/utils/types';
import { Checkbox, Chip, Radio } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const RoomRadio = ({ value }: { value: IRoom }) => {
  return (
    <div className="rounded-lg border-1 p-1 min-w-44">
      <Radio value={value.id.toString()}>
        <div className="flex">
          <div className="flex justify-center items-center mr-2">
            <Image
              alt=""
              src={'/image/room/bedroom.png'}
              sizes="100"
              width={0}
              height={0}
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">
              {value.floor}/{value.roomNumber}
            </p>
            <Chip size="sm" color="primary">
              {value.status.toLowerCase()}
            </Chip>
            <div className="flex mt-2">
              <div className="flex items-center justify-center mr-1">
                <Image
                  alt=""
                  src={'/image/invoice/dollar.png'}
                  sizes="100"
                  width={0}
                  height={0}
                  className="w-4 h-4"
                />
              </div>
              <p className="flex items-center justify-center text-xs">
                {getReadableNumber(value.rentAmount)} VND
              </p>
            </div>
          </div>
        </div>
      </Radio>
    </div>
  );
};

export default RoomRadio;
