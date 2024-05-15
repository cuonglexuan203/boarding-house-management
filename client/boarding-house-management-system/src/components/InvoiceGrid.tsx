'use client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { IRowDragItem, ModuleRegistry } from '@ag-grid-community/core';
import {
  CellClickedEvent,
  CellEditRequestEvent,
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  IRowNode,
  IsExternalFilterPresentParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {} from 'ag-grid-enterprise';
import '@/app/(management)/manage/(room)/style.css';
import { GetRowIdParams } from 'ag-grid-community';
import { useAppDispatch } from '@/libs/hooks';
import { setSelectedRowId } from '@/libs/features/gridSlice';
import CustomDropdown from './CustomDropdown';
import ImmutableColumn from './ImmutableColumn';

import { IService, IServiceDetail } from '@/utils/types';
import { useGetServicesQuery } from '@/libs/services/serviceApi';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const InvoiceGrid = ({
  gridRef,
  isExternalFilterPresent,
  doesExternalFilterPass,
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
  isExternalFilterPresent: (params: IsExternalFilterPresentParams) => boolean;
  doesExternalFilterPass: (node: IRowNode) => boolean;
}) => {
  const dispatch = useAppDispatch();

  const {
    data: services = [],
    isLoading: isServiceLoading,
    error: serviceError,
  } = useGetServicesQuery();

  //   const [updateTenantTrigger] = useUpdateTenantMutation();
  //   const [deleteTenantTrigger] = useDeleteTenantMutation();
  // @ts-ignore
  const getColumnDefs: (s: IService[]) => ColDef[] = (
    currentServices: IService[],
  ) => {
    if (currentServices.length > 0) {
      const leftColDefs: ColDef[] = [
        {
          headerName: '',
          colId: 'movableCol',
          valueGetter: (params) => {
            return null;
          },
          width: 100,
          resizable: false,
          //   rowDrag: true,
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
                iconSrc: '/image/tenant/tenant.png',
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
          headerName: 'Room Number',
          field: 'roomNumber',
          editable: false,
          width: 200,
          resizable: false,
          // rowGroup: false,
          lockPosition: 'left',
          // enableRowGroup: false,
          pinned: 'left',
          lockPinned: true,
          suppressMovable: true,
          suppressColumnsToolPanel: true,
          suppressFiltersToolPanel: true,
          suppressHeaderMenuButton: true,
          suppressHeaderFilterButton: true,
        },
      ];
      const rightColDefs: ColDef[] = [
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
                    value: 'View sample temporary residence text',
                  },
                  {
                    value: 'print a temporary residence document form',
                    color: 'success',
                    className: 'text-success',
                  },
                  {
                    value: 'Tenants self-enter',
                  },
                  {
                    value: 'Remove a tenant',
                    color: 'danger',
                    className: 'text-danger',
                    // onPress: async (e: any, selectedRowId: number) => {
                    //   await handleDeleteRoom(selectedRowId);
                    // },
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
      ];
      //   Fees
      let serviceColDefs: ColDef[] | ColGroupDef[] = [
        {
          headerName: 'Room rate',
          //   @ts-ignore
          children: [
            {
              headerName: 'Number of months',
              field: 'numberOfMonth',
              width: 200,
            },
            {
              headerName: 'Rent rate',
              field: 'rentAmount',
              width: 150,
            },
          ],
        },
      ];
      currentServices.forEach((s) => {
        const serviceGroupColDef: ColDef | ColGroupDef = {
          headerName: `${s.name.toUpperCase()} (VND ${s.price})`,
          marryChildren: true,
          children: s.isMeteredService
            ? [
                {
                  headerName: 'Old number',
                  valueGetter: (params: any) => {
                    if (
                      params.data.serviceDetails &&
                      params.data.serviceDetails.length > 0
                    ) {
                      let serviceDetail: IServiceDetail;
                      params.data.serviceDetails.forEach(
                        (sd: IServiceDetail) => {
                          if (s.id === sd.serviceId) {
                            serviceDetail = sd;
                          }
                        },
                      );
                      // @ts-ignore
                      if (!serviceDetail) {
                        return undefined;
                      }
                      return serviceDetail.oldNumber;
                    }
                  },
                  width: 150,
                },
                {
                  headerName: 'New number',
                  valueGetter: (params: any) => {
                    if (
                      params.data.serviceDetails &&
                      params.data.serviceDetails.length > 0
                    ) {
                      let serviceDetail: IServiceDetail;
                      params.data.serviceDetails.forEach(
                        (sd: IServiceDetail) => {
                          if (s.id === sd.serviceId) {
                            serviceDetail = sd;
                          }
                        },
                      );
                      // @ts-ignore
                      if (!serviceDetail) {
                        return undefined;
                      }
                      return serviceDetail.newNumber;
                    }
                  },
                  width: 150,
                },
                {
                  headerName: 'Into money',
                  valueGetter: (params: any) => {
                    if (
                      params.data.serviceDetails &&
                      params.data.serviceDetails.length > 0
                    ) {
                      let serviceDetail: IServiceDetail;
                      params.data.serviceDetails.forEach(
                        (sd: IServiceDetail) => {
                          if (s.id === sd.serviceId) {
                            serviceDetail = sd;
                          }
                        },
                      );
                      // @ts-ignore
                      if (!serviceDetail) {
                        return undefined;
                      }
                      return serviceDetail.money;
                    }
                  },
                  width: 150,
                },
              ]
            : [
                {
                  headerName: 'Use',
                  valueGetter: (params: any) => {
                    if (
                      params.data.serviceDetails &&
                      params.data.serviceDetails.length > 0
                    ) {
                      let serviceDetail: IServiceDetail;
                      params.data.serviceDetails.forEach(
                        (sd: IServiceDetail) => {
                          if (s.id === sd.serviceId) {
                            serviceDetail = sd;
                          }
                        },
                      );
                      // @ts-ignore
                      if (!serviceDetail) {
                        return undefined;
                      }
                      return serviceDetail.use;
                    }
                  },
                  width: 150,
                },
                {
                  headerName: 'Into money',
                  valueGetter: (params: any) => {
                    if (
                      params.data.serviceDetails &&
                      params.data.serviceDetails.length > 0
                    ) {
                      let serviceDetail: IServiceDetail;
                      params.data.serviceDetails.forEach(
                        (sd: IServiceDetail) => {
                          if (s.id === sd.serviceId) {
                            serviceDetail = sd;
                          }
                        },
                      );
                      // @ts-ignore
                      if (!serviceDetail) {
                        return undefined;
                      }
                      return serviceDetail.money;
                    }
                  },
                  width: 150,
                },
              ],
        };
        serviceColDefs.push(serviceGroupColDef);
      });
      return [...leftColDefs, ...serviceColDefs, ...rightColDefs];
    }
  };
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

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
        ? dragedCount + ' users'
        : 'User: ' + params.rowNode!.data.fullName + [],
    [],
  );

  //   const handleUpdateTenant = async (tenant: any) => {
  //     try {
  //       const updatedTenant = await updateTenantTrigger(tenant).unwrap();
  //       console.log('Tenant updated: ' + JSON.stringify(updatedTenant));
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   const handleDeleteRoom = useCallback(async (tenantId: number) => {
  //     try {
  //       await deleteTenantTrigger(tenantId).unwrap();
  //       console.log('Tenant deleted: ' + tenantId);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, []);

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
      //   await handleUpdateTenant(updateData);
    } catch (err) {
      console.error(err);
      return;
    }
    event.api.applyTransaction(tx);
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);
  //
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      setGridOptions(services);
    },
    [services],
  );
  //
  const setGridOptions = (services: IService[]) => {
    if (services.length > 0 && gridRef.current) {
      const columnDefs = getColumnDefs(services);
      gridRef.current!.api.setGridOption('columnDefs', columnDefs);
    }
  };

  // useEffect(() => {
  //   setGridOptions(services);
  // }, [services]);
  //
  if (isServiceLoading) {
    return <div>Loading...</div>;
  }
  if (serviceError) {
    return <div>Error</div>;
  }
  //

  //
  return (
    <div className="ag-theme-quartz w-full" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        // Option: Definition
        rowData={[]}
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
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
        onCellClicked={onCellClicked}
        suppressAnimationFrame={true}
        //
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default InvoiceGrid;
