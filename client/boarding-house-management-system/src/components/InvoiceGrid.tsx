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
  ColGroupDef,
  EditableCallbackParams,
  GridReadyEvent,
  IRowNode,
  IsExternalFilterPresentParams,
  ValueFormatterParams,
  ValueGetterParams,
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
import {
  useDeleteInvoiceMutation,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from '@/libs/services/invoiceApi';
import { getReadableNumber } from '@/utils/converterUtil';
import RoomInvoice from './RoomInvoice';
import { RowClassParams } from 'ag-grid-community';
import SurchargeEditorModal from './SurchargeEditorModal';
import CircularProgressLoading from './CircularProgressLoading';
import { toast } from 'react-toastify';
import FailedIcon from './icon/FailedIcon';
import SuccessfulIcon from './icon/SuccessfulIcon';

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
  const {
    data: invoices = [],
    isLoading: isInvoiceLoading,
    error: invoiceError,
  } = useGetInvoicesQuery();

  const [updateInvoiceTrigger] = useUpdateInvoiceMutation();
  const [deleteInvoiceTrigger] = useDeleteInvoiceMutation();
  //   const [deleteTenantTrigger] = useDeleteTenantMutation();
  // @ts-ignore
  const getColumnDefs: (s: IService[]) => ColDef[] = useCallback(
    (currentServices: IService[]) => {
      if (currentServices.length > 0) {
        const leftColDefs: ColDef[] = [
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
                  iconSrc: '/image/bill/bill.png',
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
            valueGetter: (params) => {
              if (!params.data) {
                return undefined;
              }
              return params.data.floor + '/' + params.data.roomNumber;
            },
            cellRendererSelector: (params) => {
              return {
                component: RoomInvoice,
                params: {
                  roomNumber: params.data.roomNumber,
                  type: params.data.type,
                  startDate: params.data.invoiceDate,
                  endDate: params.data.paymentDeadline,
                  status: params.data.status === 'PAID',
                  serviceCount: params.data.serviceDetails?.length || 0,
                  className: 'flex justify-center items-center w-full',
                },
              };
            },
            editable: false,
            width: 190,
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
            headerName: 'Total',
            editable: false,
            lockPosition: 'right',
            lockPinned: true,
            pinned: 'right',
            valueGetter: (params) => {
              return params.data.total;
            },
            valueFormatter: (params) => {
              return getReadableNumber(params.value) + ' VND';
            },
            cellStyle: {
              fontWeight: 'bold',
            },
          },
          {
            headerName: 'Status',
            editable: false,
            valueGetter: (params) => {
              return params.data.status;
            },
            lockPosition: 'right',
            lockPinned: true,
            pinned: 'right',
            width: 100,
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
                      value: 'View invoice details',
                    },

                    {
                      value: 'Print invoice',
                    },
                    {
                      value: 'Send invoice via Zalo',
                    },
                    {
                      value: 'Delete invoice',
                      color: 'danger',
                      className: 'text-danger',
                      onPress: async (e: any, selectedRowId: number) => {
                        await handleDeleteInvoice(selectedRowId);
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
        ];
        //   Fees
        let serviceColDefs: ColDef[] | ColGroupDef[] = [
          {
            headerName: 'Room rate',
            groupId: '0',
            //   @ts-ignore
            children: [
              {
                colId: '0_numberOfMonth',
                headerName: 'Number of months',
                field: 'numberOfMonth',
                width: 200,
              },
              {
                colId: '0_rentAmount_immutability',
                headerName: 'Rent rate',
                field: 'rentAmount',
                width: 150,
                cellStyle: {
                  fontWeight: 'bold',
                },
                valueFormatter: (params) => {
                  return getReadableNumber(params.value).toString();
                },
              },
            ],
          },
        ];
        currentServices.forEach((s) => {
          const serviceGroupColDef: ColDef | ColGroupDef = {
            headerName: `${s.name.toUpperCase()} (VND ${getReadableNumber(s.price)})`,
            groupId: s.id.toString(),
            // @ts-ignore
            children: s.isMeteredService
              ? [
                  {
                    colId: `${s.id}_oldNumber`,
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
                        return getReadableNumber(serviceDetail.oldNumber);
                      }
                    },
                    valueFormatter: (params) => {
                      return getReadableNumber(params.value) || undefined;
                    },
                    width: 150,
                    columnGroupShow: 'open',
                  },
                  {
                    colId: `${s.id}_newNumber`,
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
                        return getReadableNumber(serviceDetail.newNumber);
                      }
                    },
                    valueFormatter: (params) => {
                      return getReadableNumber(params.value) || undefined;
                    },
                    width: 150,
                    columnGroupShow: 'open',
                  },
                  {
                    colId: `${s.id}_money_immutability`,
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
                        return getReadableNumber(serviceDetail.money);
                      }
                    },
                    valueFormatter: (params) => {
                      return getReadableNumber(params.value) || undefined;
                    },
                    width: 150,
                    cellStyle: {
                      fontWeight: 'bold',
                    },
                  },
                ]
              : [
                  {
                    colId: `${s.id}_use`,
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
                        return getReadableNumber(serviceDetail.use);
                      }
                    },
                    valueFormatter: (params) => {
                      return getReadableNumber(params.value) || undefined;
                    },
                    width: 150,
                    columnGroupShow: 'open',
                  },
                  {
                    colId: `${s.id}_money_immutability`,
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
                        return getReadableNumber(serviceDetail.money);
                      }
                    },
                    valueFormatter: (params) => {
                      return getReadableNumber(params.value) || undefined;
                    },
                    width: 150,
                    cellStyle: {
                      fontWeight: 'bold',
                    },
                  },
                ],
          };
          // @ts-ignore
          serviceColDefs.push(serviceGroupColDef);
        });
        const surchargeColDef: ColDef = {
          headerName: 'Plus/Deduct',
          field: 'surcharge',
          valueGetter: (params: ValueGetterParams) => {
            return params.data.surcharge;
          },
          valueFormatter: (params: ValueFormatterParams) => {
            return getReadableNumber(params.value) + ' VND';
          },
          cellEditorSelector: (params) => {
            return {
              component: SurchargeEditorModal,
              params: {
                label: 'Set Surcharge for Bill',
                currentValue: params.value,
                currentReason: params.data.surchargeReason,
                className: '',
              },
            };
          },
          cellStyle: (params) => {
            return {
              color: params.value >= 0 ? 'blue' : 'red',
              fontWeight: 'bold',
            };
          },
          editable: true,
        };

        return [
          ...leftColDefs,
          ...serviceColDefs,
          surchargeColDef,
          ...rightColDefs,
        ];
      }
    },
    [],
  );
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: (params: EditableCallbackParams) => {
        const colIdArr = params.colDef.colId?.split('_');
        const serviceId = Number(colIdArr?.at(0));
        if (
          serviceId !== 0 &&
          params.data.serviceDetails.filter(
            (sd: IServiceDetail) => sd.serviceId === serviceId,
          ).length <= 0
        ) {
          return false;
        }
        return !colIdArr?.includes('immutability');
      },
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      enableRowGroup: true,
      cellDataType: false,
      width: 200,
      autoHeight: true,
    };
  }, []);
  const defaultColGroupDef = useMemo<Partial<ColGroupDef>>(() => {
    return {
      marryChildren: true,
    };
  }, []);
  const rowDragText = useCallback(
    (params: IRowDragItem, dragedCount: number) =>
      dragedCount > 1
        ? dragedCount + ' bills'
        : 'Bill: ' +
          params.rowNode!.data.floor +
          '/' +
          params.rowNode!.data.roomNumber,
    [],
  );

  //
  const handleUpdateInvoice = async (invoice: any) => {
    try {
      const updatedInvoice = await updateInvoiceTrigger(invoice).unwrap();
      toast.success(
        <p>
          Update invoice <span>(ID: {updatedInvoice.id})</span> successfully
        </p>,
        {
          icon: <SuccessfulIcon />,
        },
      );
    } catch (err) {
      console.error(err);
      toast.error('Update invoice failed', {
        icon: <FailedIcon />,
      });
    }
  };
  const handleDeleteInvoice = useCallback(async (invoiceId: number) => {
    try {
      await deleteInvoiceTrigger(invoiceId).unwrap();
      toast.success(<p>Delete bill successfully</p>, {
        icon: <SuccessfulIcon />,
      });
    } catch (err: any) {
      toast.error('Delete failed', {
        icon: <FailedIcon />,
      });
    }
  }, []);
  //

  const onCellClicked = (event: CellClickedEvent) => {
    if (event.colDef.colId === 'menuCol') {
      const rowId = event.data.id as number;
      dispatch(setSelectedRowId(rowId));
    }
  };

  const onCellEditRequest = useCallback(async (event: CellEditRequestEvent) => {
    const oldData = event.data;
    const newData = JSON.parse(JSON.stringify(oldData));
    const field = event.colDef.field;
    let updateData;
    if (field === undefined) {
      const colIdArr = event.colDef.colId?.split('_');
      if (colIdArr!.length >= 2) {
        // @ts-ignore
        const serviceId = parseInt(colIdArr!.at(0), 10);
        const serviceDetails = oldData.serviceDetails as IServiceDetail[];
        const serviceDetailId = serviceDetails
          .filter((sd) => sd.serviceId === serviceId)
          .at(0)?.id;

        const serviceDetailField = colIdArr?.at(1) as string;
        if (newData.serviceDetails) {
          const serviceDetail: IServiceDetail = newData.serviceDetails.find(
            (i: IServiceDetail) => i.id === serviceDetailId,
          );
          if (serviceDetail) {
            // @ts-ignore
            serviceDetail[serviceDetailField] = event.newValue;
          }
        }
        updateData = {
          id: oldData.id,
          serviceDetails: [
            {
              id: serviceDetailId,
              [serviceDetailField]: event.newValue,
            },
          ],
        };
      }
    } else {
      if (field === 'surcharge') {
        newData[field!] = event.newValue.surcharge;
        updateData = {
          id: oldData.id,
          [field!]: event.newValue.surcharge,
          ['surchargeReason']: event.newValue.surchargeReason,
        };
      } else {
        newData[field!] = event.newValue;
        updateData = {
          id: oldData.id,
          [field!]: event.newValue,
        };
      }
    }
    const tx = {
      update: [newData],
    };
    try {
      console.log(updateData);
      console.log(tx);
      await handleUpdateInvoice(updateData);
    } catch (err) {
      console.error(err);
      return;
    }
    event.api.applyTransaction(tx);
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);
  const getRowStyle = (params: RowClassParams) => {
    if (params.data.status === 'PAID') {
      return {
        background: '#cfead0',
      };
    }
    return {
      background: '#fff5f2',
    };
  };
  //
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      setGridOptions(services);
    },
    [services],
  );
  //
  const setGridOptions = useCallback((services: IService[]) => {
    if (services.length > 0 && gridRef.current) {
      const columnDefs = getColumnDefs(services);
      gridRef.current!.api.setGridOption('columnDefs', columnDefs);
    }
  }, []);

  // useEffect(() => {
  //   setGridOptions(services);
  // }, [services]);
  //
  if (isServiceLoading || isInvoiceLoading) {
    return <CircularProgressLoading />;
  }
  if (serviceError || invoiceError) {
    return <div>Error</div>;
  }
  //

  //
  return (
    <div className="ag-theme-quartz w-full min-h-[500px] h-[820px] max-h-fit">
      <AgGridReact
        ref={gridRef}
        // Option: Definition
        rowData={invoices}
        // @ts-ignore
        columnDefs={columnDefs}
        // @ts-ignore
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
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
        onGridReady={onGridReady}
        getRowStyle={getRowStyle}
      />
    </div>
  );
};

export default InvoiceGrid;
