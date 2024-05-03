'use client';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import React, { useMemo, useState } from 'react';
import { useGetRoomsQuery } from '@/libs/services/roomApi';
import { IRoom } from '@/utils/types';

const HostelManagement = () => {
  const { data: rooms = [], isLoading, error } = useGetRoomsQuery(null);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Rent amount',
      field: 'rentAmount',
    },
    {
      headerName: 'Room number',
      field: 'roomNumber',
    },
    { headerName: 'Floor', field: 'floor' },
    {
      headerName: 'Area',
      field: 'area',
    },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Status', field: 'status' },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rooms}
        // @ts-ignore
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        rowDragManaged={true}
        rowDragEntireRow={true}
        rowDragMultiRow={true}
      />
    </div>
  );
};

export default HostelManagement;
