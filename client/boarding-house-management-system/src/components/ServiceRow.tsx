import { getReadableNumber, parseOnlyNumber } from '@/utils/converterUtil';
import { Checkbox, Input } from '@nextui-org/react';
import React, { useState } from 'react';

const ServiceRow = ({
  service,
  onValueChange,
}: {
  service: any;
  onValueChange: (
    isChecked: boolean,
    value: { id: string; value: number },
  ) => void;
}) => {
  const [currentIndicator, setCurrentIndicator] = useState<number>(0);
  const s = service;
  return (
    <tr key={s.id}>
      <td className="p-3">
        <Checkbox
          onValueChange={(isChecked) =>
            onValueChange(isChecked, { id: s.id, value: currentIndicator })
          }
        />
      </td>
      <td className="p-3">{s.name}</td>
      <td className="p-3">{getReadableNumber(s.price)}</td>
      <td className="p-3">
        <Input
          className="text-default-400 text-small"
          size="sm"
          type="currency"
          // @ts-ignore
          value={currentIndicator.toLocaleString()}
          onValueChange={(v) => setCurrentIndicator(parseOnlyNumber(v))}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span>/{s.unit}</span>
            </div>
          }
        />
      </td>
    </tr>
  );
};

export default ServiceRow;
