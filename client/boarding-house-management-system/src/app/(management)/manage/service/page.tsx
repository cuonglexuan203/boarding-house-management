'use client';
import ServiceGrid from '@/components/ServiceGrid';
import { Tooltip } from '@nextui-org/react';
import React, { useCallback, useRef, useState } from 'react';

import ExportButton from '@/components/ExportButton';
import { AgGridReact } from 'ag-grid-react';
import { IRowNode } from 'ag-grid-community';
import AddServiceModal from '@/components/AddServiceModal';
import { IsExternalFilterPresentParams } from 'ag-grid-community';
import { useGetServicesQuery } from '@/libs/services/serviceApi';
import ServiceItem from '@/components/ServiceItem';

interface IFilterOption {
  key: string;
  value: string;
}

const ServiceMangement = () => {
  const { data: services = [], isLoading, error } = useGetServicesQuery();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <section className="flex w-full flex-col justify-center items-center p-4 mt-6">
      <div className="mt-4 w-full flex justify-center items-center">
        {/* Services */}
        <div className="w-full max-w-[600px]">
          {/* Service items */}
          <div>
            {/* Information */}
            <div className="flex justify-between">
              {/* Page infor */}
              <div className="border-s-4 border-[#4b4ce4] ps-2">
                <h2 className="text-2xl font-semibold">All Services</h2>
                <p className="italic text-sm text-gray-500">Tenant services</p>
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
            {/* Items */}
            <div className="mt-4 flex flex-col gap-4">
              {services.map((s) => (
                <ServiceItem service={s} key={s.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMangement;
