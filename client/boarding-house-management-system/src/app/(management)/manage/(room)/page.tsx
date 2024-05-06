'use client';
import RoomGrid from '@/components/RoomGrid';
import { PlusIcon } from '@/components/icon/PlusIcon';
import {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { CheckIcon } from '@/components/icon/CheckIcon';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import ExportButton from '@/components/ExportButton';
import { AgGridReact } from 'ag-grid-react';

interface IFilterOption {
  key: string;
  value: string;
}

const HomeManagement = () => {
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

  const filterOptions = useMemo<IFilterOption[]>(() => {
    return [
      { key: 'availability', value: 'Availability' },
      { key: 'staying', value: 'Staying' },
      { key: 'forbidden', value: 'Forbidden' },
      { key: 'repair', value: 'Under repair room' },
      { key: 'waiting', value: 'Room' },
    ];
  }, []);
  return (
    <section className="flex w-full flex-col justify-center items-center p-4 mt-6">
      <Tabs
        fullWidth
        size="lg"
        aria-label="Options"
        color="primary"
        radius="full"
        variant="underlined"
        selectedKey={selected}
        // @ts-ignore
        onSelectionChange={setSelected}
      >
        <Tab
          className="w-full h-12"
          key="management"
          title={<p className="p-4">Hostel Management</p>}
        >
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
                  <Button
                    variant="solid"
                    size="sm"
                    className="focus:outline-none rounded-full bg-primary w-6 h-12 flex items-center justify-center"
                  >
                    <PlusIcon className="text-white" />
                  </Button>
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
                  {/* Backup */}
                  {/* <Checkbox
                      value={'available'}
                      icon={<CheckIcon size={24} strokeWidth={5} />}
                      color="primary"
                    >
                      Availability
                    </Checkbox>
                    <Checkbox
                      value={'Staying'}
                      icon={<CheckIcon size={24} strokeWidth={5} />}
                      color="primary"
                    >
                      Staying rooms
                    </Checkbox>
                    <Checkbox
                      value={'repair'}
                      icon={<CheckIcon size={24} strokeWidth={5} />}
                      color="primary"
                    >
                      Under repair room
                    </Checkbox>
                    <Checkbox
                      value={'forbidden'}
                      icon={<CheckIcon size={24} strokeWidth={5} />}
                      color="primary"
                    >
                      Forbidden room
                    </Checkbox>
                    <Checkbox
                      value={'waiting'}
                      icon={<CheckIcon size={24} strokeWidth={5} />}
                      color="primary"
                    >
                      Waiting room
                    </Checkbox> */}
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
              <RoomGrid gridRef={gridRef} />
            </div>
          </div>
        </Tab>
        <Tab
          className="w-full h-12"
          key="overview"
          title={<p className="p-4">Accommodation Overview</p>}
        >
          <i>Accommodation Overview</i>
        </Tab>
      </Tabs>
    </section>
  );
};

export default HomeManagement;
