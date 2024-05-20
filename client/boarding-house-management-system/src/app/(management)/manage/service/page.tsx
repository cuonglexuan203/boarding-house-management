'use client';
import ServiceGrid from '@/components/ServiceGrid';
import { Tooltip } from '@nextui-org/react';
import React, { useCallback, useRef, useState } from 'react';

import ExportButton from '@/components/ExportButton';
import { AgGridReact } from 'ag-grid-react';
import { IRowNode } from 'ag-grid-community';
import AddServiceModal from '@/components/AddServiceModal';
import { IsExternalFilterPresentParams } from 'ag-grid-community';

interface IFilterOption {
  key: string;
  value: string;
}

const ServiceMangement = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [selected, setSelected] = useState('management');
  // const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>(
  //   [],
  // );
  const onBtnCsvExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);
  const onBtnExcelExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  //  Filter
  // const filterOptions = useMemo<IFilterOption[]>(() => {
  //   return [
  //     { key: 'available', value: 'Availability' },
  //     { key: 'occupied', value: 'Staying' },
  //     { key: 'reserved', value: 'Currently reserved' },
  //     // { key: 'repair', value: 'Under repair room' },
  //     { key: 'waiting', value: 'Waiting room' },
  //   ];
  // }, []);

  // const isExternalFilterPresent = useCallback((): boolean => {
  //   return selectedFilterOptions.length > 0;
  // }, [selectedFilterOptions]);

  // const doesExternalFilterPass = useCallback(
  //   (node: IRowNode<IRoom>): boolean => {
  //     let isMatched = true;
  //     if (node.data) {
  //       selectedFilterOptions.forEach((selectedOption) => {
  //         if (selectedOption === 'available') {
  //           isMatched =
  //             isMatched && node.data?.status.toLowerCase() === 'available';
  //         }
  //         if (selectedOption === 'occupied') {
  //           isMatched =
  //             isMatched && node.data?.status.toLowerCase() === 'occupied';
  //         }
  //       });
  //     }
  //     return isMatched;
  //   },
  //   [selectedFilterOptions],
  // );
  return (
    <section className="flex w-full flex-col justify-center items-center p-4 mt-6">
      <div className="mt-4 w-full">
        {/* Information */}
        <div className="flex justify-between">
          {/* Page infor */}
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">All Services</h2>
          </div>
          <div>
            <Tooltip
              content="Add new invoice"
              color="primary"
              placement="left-start"
              closeDelay={200}
              delay={500}
            >
              <AddServiceModal />
            </Tooltip>
          </div>
        </div>
        {/* Grid functionality */}
        <div className="flex justify-between">
          {/* Filter */}
          <div className="p-2 flex mt-4 rounded-md"></div>
          {/* Export */}
          <div className="flex justify-center items-end p-2">
            <ExportButton
              onPressCsvExport={onBtnCsvExport}
              onPressExcelExport={onBtnExcelExport}
            />
          </div>
        </div>
        {/* Grid */}
        <div className="w-full mt-12">
          <ServiceGrid
            // isExternalFilterPresent={isExternalFilterPresent}
            // doesExternalFilterPass={doesExternalFilterPass}
            gridRef={gridRef}
            isExternalFilterPresent={function (
              params: IsExternalFilterPresentParams<any, any>,
            ): boolean {
              throw new Error('Function not implemented.');
            }}
            doesExternalFilterPass={function (node: IRowNode<any>): boolean {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceMangement;
