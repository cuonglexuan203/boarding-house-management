import React, { useCallback } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { ChevronDownIcon } from './icon/ChevronDownIcon';

export default function ExportButton({
  onPressCsvExport,
  onPressExcelExport,
}: {
  onPressCsvExport: (e: ProgressEvent) => void;
  onPressExcelExport: (e: ProgressEvent) => void;
}) {
  const [selectedOption, setSelectedOption] = React.useState(
    new Set(['excel']),
  );

  const descriptionsMap = {
    excel:
      'Export room information to an Excel file, preserving formatting and enabling advanced analysis.',
    csv: 'Export room information to a CSV file, ensuring compatibility and ease of data exchange.',
    table:
      'Export room information to a Table file for structured data presentation and integration.',
  };

  const labelsMap = {
    excel: 'Export to Excel file',
    csv: 'Export to CSV file',
    table: 'Export to Table file',
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];
  const onPressExport = useCallback(
    (e: ProgressEvent) => {
      if (selectedOptionValue === 'csv') {
        onPressCsvExport(e);
      } else if (selectedOptionValue === 'excel') {
        onPressExcelExport(e);
      }
    },
    [selectedOptionValue, onPressCsvExport, onPressExcelExport],
  );
  return (
    <ButtonGroup variant="flat">
      {/* @ts-ignore */}
      <Button onPress={onPressExport}>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="excel options"
          selectedKeys={selectedOption}
          selectionMode="single"
          //   @ts-ignore
          onSelectionChange={(e) => {
            console.log(e);
            // @ts-ignore
            setSelectedOption(e);
          }}
          className="max-w-[300px]"
        >
          <DropdownItem key="excel" description={descriptionsMap['excel']}>
            {labelsMap['excel']}
          </DropdownItem>
          <DropdownItem key="csv" description={descriptionsMap['csv']}>
            {labelsMap['csv']}
          </DropdownItem>
          <DropdownItem key="table" description={descriptionsMap['table']}>
            {labelsMap['table']}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
