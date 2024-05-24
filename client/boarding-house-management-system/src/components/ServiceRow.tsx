import { getReadableNumber } from '@/utils/converterUtil';
import { IService } from '@/utils/types';
import { Checkbox } from '@nextui-org/react';

const ServiceRow = ({
  service,
  onValueChange,
}: {
  service: IService;
  onValueChange: (
    isChecked: boolean,
    value: {
      id: number;
    },
  ) => void;
}) => {
  const s = service;
  return (
    <tr key={s.id}>
      <td className="p-3">
        <Checkbox
          onValueChange={(isChecked) =>
            onValueChange(isChecked, {
              id: s.id,
            })
          }
        />
      </td>
      <td className="p-3">{s.name}</td>
      <td className="p-3">{getReadableNumber(s.price)}</td>
    </tr>
  );
};

export default ServiceRow;
