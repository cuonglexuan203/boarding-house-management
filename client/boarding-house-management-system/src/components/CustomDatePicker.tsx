import { parseDate } from '@internationalized/date';
import { DatePicker } from '@nextui-org/react';
import { CustomCellEditorProps } from 'ag-grid-react';
import React, { useState } from 'react';

export interface ICustomDatePickerProps extends CustomCellEditorProps {
  label: string;
  className?: string;
}

const CustomDatePicker = ({
  value = '1990-01-01',
  label,
  className,
  onValueChange,
  stopEditing,
}: ICustomDatePickerProps) => {
  const [dateValue, setDateValue] = useState(parseDate(value));

  return (
    <div className={className}>
      <DatePicker
        variant="underlined"
        className="w-full"
        size="lg"
        label={label}
        value={dateValue}
        onChange={(calendarDate) => {
          setDateValue(calendarDate);
          onValueChange(calendarDate.toString());
          stopEditing();
        }}
        showMonthAndYearPickers
      />
    </div>
  );
};

export default CustomDatePicker;
