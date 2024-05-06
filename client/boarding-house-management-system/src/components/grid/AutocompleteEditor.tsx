import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { CustomCellEditorProps } from 'ag-grid-react';
import React from 'react';

export interface IAutocompleteItemData {
  value: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const AutocompleteEditor = (
  params: CustomCellEditorProps & {
    items: IAutocompleteItemData[];
    label: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  },
) => {
  return (
    <div>
      <Autocomplete
        color="primary"
        label={params.label}
        startContent={params.startContent}
        endContent={params.endContent}
        variant="underlined"
        className="max-w-xs focus:outline-none"
        selectedKey={params.value}
        onSelectionChange={(value) => {
          if (value === null || value === '') {
            return;
          }
          params.onValueChange(value);
          params.stopEditing();
        }}
      >
        {params.items.map(({ value, startContent, endContent }) => {
          return (
            <AutocompleteItem
              startContent={startContent}
              endContent={endContent}
              key={value}
              value={value}
            >
              {value}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>
    </div>
  );
};

export default AutocompleteEditor;
