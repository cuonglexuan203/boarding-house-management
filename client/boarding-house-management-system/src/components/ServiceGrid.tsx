'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from '@/libs/services/serviceApi';

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
import '@/app/(management)/manage/layout';
import { AgGridReact } from 'ag-grid-react';
import { GetRowIdParams } from 'ag-grid-community';
import { useAppDispatch } from '@/libs/hooks';
import { setSelectedRowId } from '@/libs/features/gridSlice';
import CustomDropdown from './CustomDropdown';
import AutocompleteEditor from './grid/AutocompleteEditor';
import { getReadableNumber, isNumeric } from '@/utils/converterUtil';
import CircularProgressLoading from './CircularProgressLoading';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ServiceGrid = ({
  gridRef,
  // isExternalFilterPresent,
  // doesExternalFilterPass,
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
  isExternalFilterPresent?: (params: IsExternalFilterPresentParams) => boolean;
  doesExternalFilterPass?: (node: IRowNode) => boolean;
}) => {
  const dispatch = useAppDispatch();
  const { data: services = [], isLoading, error } = useGetServicesQuery();
  const [updateServiceTrigger] = useUpdateServiceMutation();
  const [deleteServiceTrigger] = useDeleteServiceMutation();

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'ID',
      field: 'id',
      suppressMovable: true,
      editable: false,
      width: 100,
    },

    {
      headerName: 'Service Name',
      field: 'name',
      cellDataType: 'string',
      valueSetter: (params) => {
        params.data.name = 1;
        return true;
      },
      cellStyle: (params) => {
        if (params.value === '102') {
          //mark police cells as red
          return { color: 'red', backgroundColor: 'green' };
        }
        return null;
      },
    },
    {
      headerName: 'Price',
      field: 'price',
      cellDataType: 'string',
      valueGetter: (params) => {
        if (!params.data) {
          return null;
        }
        let value = params.data.price;

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
      headerName: 'Unit',
      field: 'unit',
      cellDataType: 'string',
      cellEditor: AutocompleteEditor,
      cellEditorParams: {
        items: [
          { value: 'kWh' },
          { value: 'Cubic Meter' },
          { value: 'Month' },
          { value: 'Person' },
          { value: 'Item' },
          { value: 'Time' },
          { value: 'Thing' },
          { value: 'Kg' },
        ],
        label: 'Select unit',
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
                value: 'Delete Service',
                color: 'danger',
                className: 'text-danger',
                onPress: async (e: any, selectedRowId: number) => {
                  await handleDeleteService(selectedRowId);
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
        ? dragedCount + ' Services'
        : 'Service: ' +
          params.rowNode!.data.floor +
          '/' +
          params.rowNode!.data.ServiceNumber,
    [],
  );

  const handleUpdateService = async (Service: any) => {
    try {
      const updatedService = await updateServiceTrigger(Service).unwrap();
      console.log('Service updated: ' + JSON.stringify(updatedService));
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteService = useCallback(async (ServiceId: number) => {
    try {
      await deleteServiceTrigger(ServiceId).unwrap();
      console.log('Service deleted: ' + ServiceId);
    } catch (err) {
      console.error(err);
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
      console.log(updateData);
      await handleUpdateService(updateData);
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
  if (error) {
    return <div>Error</div>;
  }
  //

  //
  return (
    <div className="ag-theme-quartz w-full" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        // Option: Definition
        rowData={services}
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
        onCellClicked={onCellClicked}
      />
    </div>
  );
};

export default ServiceGrid;
