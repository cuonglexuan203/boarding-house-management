'use client';
import RoomGrid from '@/components/RoomGrid';
import { Badge, CheckboxGroup, Tooltip } from '@nextui-org/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import ExportButton from '@/components/ExportButton';
import { AgGridReact } from 'ag-grid-react';
import { IRowNode } from 'ag-grid-community';
import { IRoom } from '@/utils/types';
import AddRoomModal from '@/components/AddRoomModal';

interface IFilterOption {
  key: string;
  value: string;
}

const HomeManagement = () => {
  const gridRef = useRef<AgGridReact>(null);
  // const [selected, setSelected] = useState('management');
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
      { key: 'available', value: 'Availability' },
      { key: 'occupied', value: 'Staying' },
      { key: 'reserved', value: 'Currently reserved' },
      { key: 'waiting', value: 'Waiting room' },
    ];
  }, []);

  const isExternalFilterPresent = useCallback((): boolean => {
    return selectedFilterOptions.length > 0;
  }, [selectedFilterOptions]);

  const doesExternalFilterPass = useCallback(
    (node: IRowNode<IRoom>): boolean => {
      let isMatched = true;
      if (node.data) {
        selectedFilterOptions.forEach((selectedOption) => {
          if (selectedOption === 'available') {
            isMatched =
              isMatched && node.data?.status.toLowerCase() === 'available';
          }
          if (selectedOption === 'occupied') {
            isMatched =
              isMatched && node.data?.status.toLowerCase() === 'occupied';
          }
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
            <h2 className="text-2xl font-semibold">Manage Room List</h2>
            <p className="italic text-sm text-gray-500">
              All rooms in <span className="">Boarding House</span>
            </p>
          </div>
          {/* Room mange guide and Add room button */}
          <div>
            <Tooltip
              content="Add new room"
              color="primary"
              placement="left-start"
              closeDelay={200}
              delay={500}
            >
              <AddRoomModal />
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
          <RoomGrid
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            gridRef={gridRef}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeManagement;
