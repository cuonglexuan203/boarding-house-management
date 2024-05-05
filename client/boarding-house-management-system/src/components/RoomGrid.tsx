'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useGetRoomsQuery } from '@/libs/services/roomApi';
import { IRowDragItem, ModuleRegistry } from '@ag-grid-community/core';
import {
  CellEditRequestEvent,
  ClientSideRowModelModule,
  ColDef,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {} from 'ag-grid-enterprise';
import '@/app/(management)/manage/(room)/style.css';
import { AgGridReact } from 'ag-grid-react';
import ImmutableColumn from './ImmutableColumn';
import AutocompleteEditor from './grid/AutocompleteEditor';
import { getFormattedNumber, isNumeric } from '@/utils/converterUtil';
import { GetRowIdParams } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const RoomGrid = ({
  gridRef,
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
}) => {
  const { data: rooms = [], isLoading, error } = useGetRoomsQuery(null);
  // const [rooms, setRooms] = useState([
  //   {
  //     id: 1,
  //     roomNumber: '102',
  //     floor: 'ONE',
  //     rentAmount: 12345,
  //     area: 102,
  //     type: 'SINGLE',
  //     status: 'available',
  //   },
  // ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: '',
      valueGetter: (params) => {
        return null;
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
        iconSize: 32,
        iconSrc: '/image/room/beds.png',
      },
      pinned: 'left',
      lockPinned: true,
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true,
      suppressHeaderMenuButton: true,
      suppressHeaderFilterButton: true,
    },
    {
      headerName: 'ID',
      field: 'id',
      suppressMovable: true,
      editable: false,
      width: 100,
    },

    {
      headerName: 'Room number',
      field: 'roomNumber',
      cellDataType: 'string',
      // valueSetter: (params) => {
      //   params.data.roomNumber = 1;
      //   return true;
      // },
      // cellStyle: (params) => {
      //   if (params.value === '102') {
      //     //mark police cells as red
      //     return { color: 'red', backgroundColor: 'green' };
      //   }
      //   return null;
      // },
    },
    {
      headerName: 'Floor',
      field: 'floor',
      cellDataType: 'string',
      cellEditor: AutocompleteEditor,
      cellEditorParams: {
        items: [
          { value: 'GROUND' },
          { value: 'ONE' },
          { value: 'TWO' },
          { value: 'THREE' },
          { value: 'FOUR' },
          { value: 'FIVE' },
        ],
        label: 'Select floor',
      },
    },
    {
      headerName: 'Rent amount',
      field: 'rentAmount',
      cellDataType: 'number',
      valueGetter: (params) => {
        return getFormattedNumber(params.data.rentAmount);
      },
      valueFormatter: (params) => {
        if (!isNumeric(params.value)) {
          return NaN.toString();
        }
        return params.value + ' VND';
      },
    },
    {
      headerName: 'Area',
      field: 'area',
      cellDataType: 'number',
      valueGetter: (params) => {
        return getFormattedNumber(params.data.area);
      },
      valueFormatter: (params) => {
        if (!isNumeric(params.value)) {
          return NaN.toString();
        }
        return params.value + ' m2';
      },
    },
    {
      headerName: 'Type',
      field: 'type',
      cellEditor: AutocompleteEditor,
      cellEditorParams: {
        items: [
          {
            value: 'SINGLE',
          },
          {
            value: 'DOUBLE',
          },
          {
            value: 'TRIPLE',
          },
          {
            value: 'UNKNOWN',
          },
        ],
        label: 'Select type',
      },
    },
    {
      headerName: 'Status',
      field: 'status',
      cellEditor: AutocompleteEditor,
      cellEditorParams: {
        items: [
          {
            value: 'AVAILABLE',
          },
          {
            value: 'OCCUPIED',
          },
        ],
        label: 'Select status',
      },
    },
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

  const onCellEditRequest = useCallback((event: CellEditRequestEvent) => {
    console.log('Editing cell');
    const oldData = event.data;
    const newData = { ...oldData };
    const field = event.colDef.field;
    newData[field!] = event.newValue;
    const tx = {
      update: [newData],
    };
    event.api.applyTransaction(tx);
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);

  //
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  //
  return (
    <div className="ag-theme-quartz w-full" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
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
        // sideBar={['columns']}
        // @ts-ignore
        rowDragText={rowDragText}
        readOnlyEdit={true}
        reactiveCustomComponents={true}
        rowHeight={60}
        onCellEditRequest={onCellEditRequest}
        getRowId={getRowId}
      />
    </div>
  );
};

export default RoomGrid;
