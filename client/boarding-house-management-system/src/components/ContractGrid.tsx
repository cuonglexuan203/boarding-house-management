'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useState } from 'react';

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
import '@/app/(management)/manage/(room)/style.css';
import { GetRowIdParams } from 'ag-grid-community';
import { useAppDispatch } from '@/libs/hooks';
import { setSelectedRowId } from '@/libs/features/gridSlice';
import ImmutableColumn from './ImmutableColumn';

import { RowClassParams } from 'ag-grid-community';
import CustomDatePicker from './CustomDatePicker';
import {
  useDeleteContractMutation,
  useGetContractsQuery,
  useUpdateContractMutation,
} from '@/libs/services/contractApi';
import { AgGridReact } from 'ag-grid-react';
import '@/styles/contractGrid.css';
import CustomDropdown from './CustomDropdown';
import AutocompleteEditor from './grid/AutocompleteEditor';
import { toast } from 'react-toastify';
import SuccessfulIcon from './icon/SuccessfulIcon';
import FailedIcon from './icon/FailedIcon';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ContractGrid = ({
  gridRef,
  isExternalFilterPresent,
  doesExternalFilterPass,
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
  isExternalFilterPresent: (params: IsExternalFilterPresentParams) => boolean;
  doesExternalFilterPass: (node: IRowNode) => boolean;
}) => {
  const dispatch = useAppDispatch();
  const { data: contracts = [], isLoading, error } = useGetContractsQuery();
  const [updateContracTrigger] = useUpdateContractMutation();
  const [deleteContractTrigger] = useDeleteContractMutation();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: '',
      colId: 'movableCol',
      valueGetter: (params) => {
        return null;
      },
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            iconSrc: '/image/contract/contract.png',
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
      editable: false,
      width: 100,
      resizable: false,
      rowGroup: false,
      lockPosition: 'left',
      enableRowGroup: false,
      // pinned: 'left',
      lockPinned: true,
      suppressMovable: true,
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true,
      suppressHeaderMenuButton: true,
      suppressHeaderFilterButton: true,
    },
    {
      headerName: 'Room number',
      field: 'room.roomNumber',
      cellDataType: 'string',
      editable: false,
    },
    {
      headerName: 'Contract representation',
      field: 'contractRepresentation.fullName',
      cellDataType: 'string',
      editable: false,
    },
    {
      headerName: 'Phone number',
      field: 'contractRepresentation.phoneNumber',
      cellDataType: 'string',
      editable: false,
    },
    {
      headerName: 'Deposit price',
      field: 'depositAmount',
      cellDataType: 'number',
    },
    {
      headerName: 'Total members',
      field: 'numberOfMember',
      cellDataType: 'number',
    },
    {
      headerName: 'Start date',
      field: 'startDate',
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cellEditorSelector: (params) => {
        if (!params.data) {
          return undefined;
        }
        return {
          component: CustomDatePicker,
          params: {
            label: 'Start date',
          },
        };
      },
    },
    {
      headerName: 'End date',
      field: 'endDate',
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cellEditorSelector: (params) => {
        if (!params.data) {
          return undefined;
        }
        return {
          component: CustomDatePicker,
          params: {
            label: 'End date',
          },
        };
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
            value: 'PAID',
          },
          {
            value: 'UNPAID',
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
                value: 'View contract',
              },
              {
                value: 'Print contract',
              },
              {
                value: 'Share contract',
                color: 'success',
                className: 'text-success',
              },
              {
                value: 'Remove contract',
                color: 'danger',
                className: 'text-danger',
                onPress: async (e: any, selectedRowId: number) => {
                  await handleDeleteContract(selectedRowId);
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
      width: 180,
      autoHeight: true,
    };
  }, []);

  const rowDragText = useCallback(
    (params: IRowDragItem, dragedCount: number) =>
      dragedCount > 1
        ? dragedCount + ' contract'
        : 'Contract: ' + params.rowNode!.data.contractRepresentation.fullName,
    [],
  );

  //

  //

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
      await handleUpdateContract(updateData);
      event.api.applyTransaction(tx);
    } catch (err) {
      console.error(err);
      return;
    }
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);
  const getRowStyle = (params: RowClassParams) => {
    if (!params.data || !params.data.status) {
      return {};
    }
    if (params.data.status === 'PAID') {
      return {
        background: '#cfead0',
      };
    }
    return {
      background: '#fff5f2',
    };
  };

  const handleUpdateContract = async (data: any) => {
    try {
      const updatedTenant = await updateContracTrigger(data).unwrap();
      toast.success(
        <p>
          Update contract <span>(ID: {updatedTenant.id})</span> successfully
        </p>,
        {
          icon: <SuccessfulIcon />,
        },
      );
    } catch (err) {
      console.error(err);
      toast.error('Update failed', {
        icon: <FailedIcon />,
      });
    }
  };
  const handleDeleteContract = useCallback(async (contractId: number) => {
    // try {
    //   await deleteContractTrigger(contractId).unwrap();
    //   console.log('Tenant deleted: ' + contractId);
    // } catch (err) {
    //   console.error(err);
    // }
    toast.warning(<p>Can not delete old contract cause its relationships</p>);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  //
  return (
    <div className="ag-theme-quartz w-full h-[700px] overflow-hidden">
      {/* @ts-ignore */}
      <AgGridReact
        ref={gridRef}
        // Option: Definition
        rowData={contracts}
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
        suppressAnimationFrame={true}
        suppressRowHoverHighlight={true}
        //
        getRowStyle={getRowStyle}
      />
    </div>
  );
};

export default ContractGrid;
