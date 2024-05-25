'use client';
import { Badge, CheckboxGroup, Tooltip } from '@nextui-org/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import ExportButton from '@/components/ExportButton';
import { AgGridReact } from 'ag-grid-react';
import { IRowNode } from 'ag-grid-community';
import { IInvoice } from '@/utils/types';
import ContractGrid from '@/components/ContractGrid';
import AddContractModal from '@/components/AddContractModal';

interface IFilterOption {
  key: string;
  value: string;
}
const ContractManagement = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [selected, setSelected] = useState('management');
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>(
    [],
  );

  const onBtnCsvExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);
  const onBtnExcelExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  //  Filter
  const filterOptions = useMemo<IFilterOption[]>(() => {
    return [
      { key: 'paid', value: 'Paid' },
      { key: 'unpaid', value: 'Unpaid' },
    ];
  }, []);

  const isExternalFilterPresent = useCallback((): boolean => {
    return selectedFilterOptions.length > 0;
  }, [selectedFilterOptions]);

  const doesExternalFilterPass = useCallback(
    (node: IRowNode<IInvoice>): boolean => {
      let isMatched = true;
      if (node.data) {
        selectedFilterOptions.forEach((selectedOption) => {
          filterOptions.forEach((opt) => {
            if (selectedOption === opt.key) {
              isMatched =
                isMatched &&
                node.data?.status.toLowerCase() === opt.value.toLowerCase();
            }
          });
        });
      }
      return isMatched;
    },
    [selectedFilterOptions],
  );

  return (
    <section className="flex w-full flex-col justify-center items-center p-4 mt-6">
      <div className="mt-4 w-full">
        {/* Information */}
        <div className="flex justify-between">
          {/* Page infor */}
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">All housing receipts</h2>
            <p className="italic text-sm text-gray-500">
              You&apos;ll see monthly invoices Be invoiced or generate monthly
              invoices if they haven&apos;t already been created in{' '}
              <span className="">Boarding House</span>
            </p>
          </div>
          {/* Invoice mange guide and Add invoice button */}
          <div>
            <Tooltip
              content="Add new tenant"
              color="primary"
              placement="left-start"
              closeDelay={200}
              delay={500}
            >
              <AddContractModal />
            </Tooltip>
          </div>
        </div>
        {/* Grid functionality */}
        <div className="flex justify-between">
          {/* Filter */}
          <div className="p-2 flex mt-4 rounded-md">
            {/* Filter icon */}
            <div className="flex justify-center items-center p-2 pr-4 mr-4 border-r-3 border-r-slate-200">
              <Badge content={selectedFilterOptions.length} color="primary">
                <FontAwesomeIcon size="2x" icon={faFilter} />
              </Badge>
            </div>
            {/* Filter options */}
            <div>
              <CheckboxGroup
                label="Select filter options"
                orientation="horizontal"
                value={selectedFilterOptions}
                onValueChange={setSelectedFilterOptions}
              >
                {filterOptions.map((i) => {
                  return (
                    <CustomCheckbox key={i.key} value={i.key}>
                      {i.value}
                    </CustomCheckbox>
                  );
                })}
              </CheckboxGroup>
            </div>
          </div>
          {/* Export */}
          <div className="flex justify-center items-end">
            <ExportButton
              onPressCsvExport={onBtnCsvExport}
              onPressExcelExport={onBtnExcelExport}
            />
          </div>
        </div>
        {/* Grid */}
        <div className="w-full mt-12">
          <ContractGrid
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            gridRef={gridRef}
          />
        </div>
      </div>
    </section>
  );
};

export default ContractManagement;
