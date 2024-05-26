'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useUpdateRoomMutation,
} from '@/libs/services/roomApi';
import { IRowDragItem, ModuleRegistry } from '@ag-grid-community/core';
import {
  CellClickedEvent,
  CellEditRequestEvent,
  ClientSideRowModelModule,
  ColDef,
  IRowNode,
  IsExternalFilterPresentParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {} from 'ag-grid-enterprise';
import '@/app/(management)/manage/(room)/style.css';
import { AgGridReact } from 'ag-grid-react';
import { GetRowIdParams } from 'ag-grid-community';
import { setSelectedRowId } from '@/libs/features/gridSlice';
import CustomDropdown from './CustomDropdown';
import AutocompleteEditor from './grid/AutocompleteEditor';
import { getReadableNumber, isNumeric } from '@/utils/converterUtil';
import ImmutableColumn from './ImmutableColumn';
import { useRouter } from 'next/navigation';
import CircularProgressLoading from './CircularProgressLoading';
import { useAppDispatch } from '@/libs/hooks';
import { toast } from 'react-toastify';
import SuccessfulIcon from './icon/SuccessfulIcon';
import FailedIcon from './icon/FailedIcon';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const RoomGrid = ({
  gridRef,
  isExternalFilterPresent,
  doesExternalFilterPass,
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
  isExternalFilterPresent: (params: IsExternalFilterPresentParams) => boolean;
  doesExternalFilterPass: (node: IRowNode) => boolean;
}) => {
  const dispatch = useAppDispatch();
  const { data: rooms = [], isLoading, error } = useGetRoomsQuery();
  const [updateRoomTrigger] = useUpdateRoomMutation();
  const [deleteRoomTrigger] = useDeleteRoomMutation();
  const router = useRouter();

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
      colId: 'movableCol',
      valueGetter: (params) => {
        return null;
      },
      width: 100,
      resizable: false,
      rowDrag: true,
      sortable: false,
      lockPosition: 'left',
      enableRowGroup: false,
      floatingFilter: false,
      filter: false,
      editable: false,
      cellRendererSelector: (params) => {
        if (!params.data) {
          return undefined;
        }
        return {
          component: ImmutableColumn,
          params: {
            iconSize: 32,
            iconSrc: '/image/room/beds.png',
          },
        };
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
        if (!params.data) {
          return null;
        }
        let value = params.data.rentAmount;

        if (value !== undefined) {
          return value;
        }
      },
      valueFormatter: (params) => {
        if (!params.data) {
          return params.value;
        }
        if (!isNumeric(params.value)) {
          return params.value;
        }
        return getReadableNumber(params.value) + ' VND';
      },
      valueParser: (params) => {
        if (!isNumeric(params.newValue)) {
          return params.oldValue;
        }
        return params.newValue;
      },
    },
    {
      headerName: 'Area',
      field: 'area',
      cellDataType: 'number',
      valueGetter: (params) => {
        if (!params.data) {
          return null;
        }
        let value = params.data.area;

        if (value !== undefined) {
          return value;
        }
      },
      valueFormatter: (params) => {
        if (!params.data) {
          return params.value;
        }
        if (!isNumeric(params.value)) {
          return params.value;
        }
        return getReadableNumber(params.value) + ' m2';
      },
      valueParser: (params) => {
        if (!isNumeric(params.newValue)) {
          return params.oldValue;
        }
        return params.newValue;
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
      colId: 'status',
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
    {
      headerName: '',
      colId: 'menuCol',
      valueGetter: (params) => {
        return null;
      },
      width: 50,
      resizable: false,
      sortable: false,
      lockPosition: 'right',
      enableRowGroup: false,
      floatingFilter: false,
      filter: false,
      editable: false,
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cellRendererSelector: (params) => {
        if (!params.data) {
          return undefined;
        }
        return {
          component: CustomDropdown,
          params: {
            items: [
              {
                value: 'Room detail',
                onPress: (e: any, selectedRowId: number) => {
                  router.push(`/manage/roomdetails/${selectedRowId}`);
                },
              },
              {
                value: 'New contract',
                color: 'success',
                className: 'text-success',
              },
              {
                value: 'Service setting',
              },
              {
                value: 'Delete room',
                color: 'danger',
                className: 'text-danger',
                onPress: async (e: any, selectedRowId: number) => {
                  await handleDeleteRoom(selectedRowId);
                },
              },
            ],
          },
        };
      },
      pinned: 'right',
      lockPinned: true,
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true,
      suppressHeaderMenuButton: true,
      suppressHeaderFilterButton: true,
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

  const handleUpdateRoom = async (room: any) => {
    try {
      const updatedRoom = await updateRoomTrigger(room).unwrap();
      toast.success(
        <p>
          Update room <span>(ID: {updatedRoom.id})</span> successfully
        </p>,
        {
          icon: <SuccessfulIcon />,
        },
      );
    } catch (err: any) {
      toast.error(
        <p>
          Update failed: <span>{err.message}</span>
        </p>,
        {
          icon: <FailedIcon />,
        },
      );
    }
  };
  const handleDeleteRoom = useCallback(async (roomId: number) => {
    try {
      await deleteRoomTrigger(roomId).unwrap();
      toast.success(<p>Delete room successfully</p>, {
        icon: <SuccessfulIcon />,
      });
    } catch (err) {
      console.error(err);
      toast.error('Delete failed', {
        icon: <FailedIcon />,
      });
    }
  }, []);

  const onCellClicked = (event: CellClickedEvent) => {
    if (event.colDef.colId === 'menuCol') {
      const rowId = event.data.id as number;
      dispatch(setSelectedRowId(rowId));
    }
  };

  const onCellEditRequest = useCallback(async (event: CellEditRequestEvent) => {
    const oldData = event.data;
    const newData = { ...oldData };
    const field = event.colDef.field;
    newData[field!] = event.newValue;
    const tx = {
      update: [newData],
    };
    const updateData = {
      id: oldData.id,
      [field!]: event.newValue,
    };
    try {
      await handleUpdateRoom(updateData);
    } catch (err) {
      console.error(err);
      return;
    }
    event.api.applyTransaction(tx);
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);

  //
  if (isLoading) {
    return <CircularProgressLoading />;
  }

  //

  //
  return (
    <>
      <div className="ag-theme-quartz w-full min-h-[500px] h-[800px] max-h-fit">
        <AgGridReact
          ref={gridRef}
          // Option: Definition
          rowData={rooms}
          // @ts-ignore
          columnDefs={columnDefs}
          // @ts-ignore
          defaultColDef={defaultColDef}
          // Feat: Pagination
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
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
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
          onCellClicked={onCellClicked}
        />
      </div>
      {error && <div>Error</div>}
    </>
  );
};

export default RoomGrid;
