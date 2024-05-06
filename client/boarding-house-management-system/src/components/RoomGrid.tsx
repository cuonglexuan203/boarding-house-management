'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useState } from 'react';
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
import { GetRowIdParams } from 'ag-grid-community';
import { roomColumnDefs } from '@/utils/gridColumnDef';

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

  const [columnDefs, setColumnDefs] = useState<ColDef[]>(roomColumnDefs);

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
        // Option: Definition
        rowData={rooms}
        // @ts-ignore
        columnDefs={columnDefs}
        // @ts-ignore
        defaultColDef={defaultColDef}
        // Feat: Pagination
        // pagination={true}
        // paginationPageSize={10}
        // paginationPageSizeSelector={[10, 25, 50]}

        // Feat: Drag
        rowDragMultiRow={true}
        rowDragManaged={true}
        rowSelection={'multiple'}
        // @ts-ignore
        rowDragText={rowDragText}
        // Feat: Panel
        enableFillHandle={true}
        enableRangeSelection={true}
        rowGroupPanelShow="always"
        // sideBar={['columns']}
        // Option: Grid properties
        rowHeight={60}
        // Feat: Editing
        readOnlyEdit={true}
        reactiveCustomComponents={true}
        onCellEditRequest={onCellEditRequest}
        getRowId={getRowId}
      />
    </div>
  );
};

export default RoomGrid;
