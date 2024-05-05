'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useState } from 'react';
import { useGetRoomsQuery } from '@/libs/services/roomApi';
import { IRowDragItem, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule, ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';
import {} from 'ag-grid-enterprise';
import '@/app/(management)/manage/(room)/style.css';
import { AgGridReact } from 'ag-grid-react';
import ImmutableColumn from './ImmutableColumn';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const RoomGrid = () => {
  const { data: rooms = [], isLoading, error } = useGetRoomsQuery(null);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: '',
      valueGetter: (params) => {
        return '';
      },
      width: 100,
      rowDrag: true,
      sortable: false,
      lockPosition: 'left',
      enableRowGroup: false,
      floatingFilter: false,
      filter: false,
      editable: false,
      cellRenderer: ImmutableColumn,
      cellRendererParams: {
        iconSize: 28,
        iconSrc: '/image/room/beds.png',
      },
    },
    {
      headerName: 'ID',
      field: 'id',
      suppressMovable: true,
      editable: false,
      width: 100,
    },
    {
      headerName: 'Rent amount',
      field: 'rentAmount',
    },
    {
      headerName: 'Room number',
      field: 'roomNumber',
      valueSetter: (params) => {
        params.data.roomNumber = 1;
        return true;
      },
      // cellStyle: (params) => {
      //   if (params.value === '102') {
      //     //mark police cells as red
      //     return { color: 'red', backgroundColor: 'green' };
      //   }
      //   return null;
      // },
    },
    { headerName: 'Floor', field: 'floor' },
    {
      headerName: 'Area',
      field: 'area',
    },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Status', field: 'status' },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      enableRowGroup: true,
      cellDataType: false,
      width: 200,
    };
  }, []);
  const rowDragText = useCallback(
    (params: IRowDragItem, dragedCount: number) =>
      dragedCount > 1
        ? dragedCount + ' rooms'
        : 'Room: ' +
          params.rowNode!.data.floor +
          '/' +
          params.rowNode!.data.roomNumber,
    [],
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="ag-theme-quartz w-full" style={{ height: 500 }}>
      <AgGridReact
        rowData={rooms}
        // @ts-ignore
        columnDefs={columnDefs}
        // @ts-ignore
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        // pagination={true}
        // paginationPageSize={10}
        // paginationPageSizeSelector={[10, 25, 50]}
        rowDragMultiRow={true}
        rowSelection={'multiple'}
        enableFillHandle={true}
        enableRangeSelection={true}
        rowGroupPanelShow="always"
        sideBar={['columns']}
        pivotPanelShow={'always'}
        // @ts-ignore
        rowDragText={rowDragText}
        // suppressDragLeaveHidesColumns={true}
        // suppressColumnMoveAnimation={true}
        // suppressMovableColumns={true}
        // columnHoverHighlight={true}

        // suppressRowClickSelection={true}
        readOnlyEdit={false}
      />
    </div>
  );
};

export default RoomGrid;
