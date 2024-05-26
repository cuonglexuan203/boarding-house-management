'use client';
import { CheckIcon } from '@/components/icon/CheckIcon';
import { useGetRoomDetailsQuery } from '@/libs/services/roomDetailsApi';
import { getReadableNumber } from '@/utils/converterUtil';
import { IInvoice, IRoomDetails } from '@/utils/types';
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  getKeyValue,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

interface ITablePagination {
  rowsPerPage: number;
  pages: number;
  items: any[];
}

const RoomDetails = ({ params }: { params: { roomId: string } }) => {
  const {
    data,
    isLoading: isRoomDetailsLoading,
    error: roomDetailsError,
  } = useGetRoomDetailsQuery(Number(params.roomId));
  const [servicePage, setServicePage] = useState(1);
  const [invoicePage, setInvoicePage] = useState(1);
  const [contractPage, setContractPage] = useState(1);
  const serviceColumns = useMemo(
    () => [
      {
        key: 'name',
        label: 'Service name',
      },
      {
        key: 'isMeteredService',
        label: 'Type',
      },
      {
        key: 'unitPrice',
        label: 'Unit price',
      },
    ],
    [],
  );
  const invoiceColumns = useMemo(
    () => [
      {
        key: 'pollingMonth',
        label: 'Polling month',
      },
      {
        key: 'rentAmount',
        label: 'Room rate',
      },
      {
        key: 'serviceFee',
        label: 'Service fee',
      },
      {
        key: 'surcharge',
        label: 'Surcharge',
      },
      {
        key: 'total',
        label: 'Total',
      },
      {
        key: 'invoiceTime',
        label: 'Creation date & Payment deadline',
      },
      {
        key: 'status',
        label: 'Status',
      },
    ],
    [],
  );
  const contractColumns = useMemo(
    () => [
      {
        key: 'contractRepresentation',
        label: 'Contract representation',
      },
      {
        key: 'phoneNumber',
        label: 'Phone number',
      },
      {
        key: 'depositAmount',
        label: 'Deposit price',
      },
      {
        key: 'numberOfMember',
        label: 'Number of member',
      },
      {
        key: 'startDate',
        label: 'Contract start date',
      },
      {
        key: 'endDate',
        label: 'Contract end date',
      },
      {
        key: 'status',
        label: 'Contract status',
      },
    ],
    [],
  );
  const serviceRows = useMemo(() => {
    const rows = data?.services.map((s) => ({
      ...s,
      isMeteredService: s.isMeteredService ? 'Metered Service' : 'Fixed',
      unitPrice: getReadableNumber(s.price) + ' VND' + ' / ' + s.unit,
    }));
    return rows;
  }, [data]);

  const invoiceRows = useMemo(() => {
    const rows = data?.invoices.map((i) => ({
      ...i,
      total: getReadableNumber(i.total),
      rentAmount: getReadableNumber(i.rentAmount),
      serviceFee:
        i.serviceDetails && i.serviceDetails.length > 0
          ? getReadableNumber(
              i.serviceDetails.reduce(
                (acc, currentValue) => acc + currentValue.money,
                0,
              ),
            )
          : 0,
      invoiceTime:
        i.invoiceDate.toString() + ' - ' + i.paymentDeadline.toString(),
    }));
    return rows;
  }, [data]);

  const contractRows = useMemo(() => {
    const rows = data?.contracts.map((c) => ({
      ...c,
      contractRepresentation: c.contractRepresentation.fullName,
      phoneNumber: c.contractRepresentation.phoneNumber,
    }));
    return rows;
  }, [data]);

  const serviceInfo: ITablePagination = useMemo(() => {
    const rowsPerPage = 5;
    const start = (servicePage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return {
      rowsPerPage,
      pages: serviceRows ? Math.ceil(serviceRows.length / rowsPerPage) : 0,
      items: serviceRows ? serviceRows.slice(start, end) : [],
    };
  }, [servicePage, data]);

  const invoiceInfo: ITablePagination = useMemo(() => {
    const rowsPerPage = 5;
    const start = (servicePage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return {
      rowsPerPage,
      pages: invoiceRows ? Math.ceil(invoiceRows.length / rowsPerPage) : 0,
      items: invoiceRows ? invoiceRows.slice(start, end) : [],
    };
  }, [invoicePage, data]);

  const contractInfo: ITablePagination = useMemo(() => {
    const rowsPerPage = 5;
    const start = (servicePage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return {
      rowsPerPage,
      pages: contractRows ? Math.ceil(contractRows.length / rowsPerPage) : 0,
      items: contractRows ? contractRows.slice(start, end) : [],
    };
  }, [contractPage, data]);

  if (isRoomDetailsLoading) {
    return <div>Loading...</div>;
  }
  if (roomDetailsError) {
    return <div>Error</div>;
  }
  const {
    room,
    roomBookings,
    currentRoomBooking,
    services,
    tenants,
    invoices,
    contracts,
  } = data as IRoomDetails;

  return (
    <section className="relative mt-8 mx-6 grid grid-cols-3 gap-4 mb-8">
      {/* Room infor */}
      <div className="sticky top-4 left-4 h-fit">
        {/* Header */}
        <div className="border-s-4 border-[#4b4ce4] ps-2">
          <h2 className="text-2xl font-semibold">Room Information</h2>
          <p className="italic text-sm text-gray-500">Room details</p>
        </div>
        {/* Room infor */}
        <div className="mt-6">
          <Card>
            <CardHeader className="flex justify-center items-center">
              <p>Room number:&nbsp;</p>
              <div className="flex justify-center items-center">
                <p className="font-bold text-xl mr-4">{room.roomNumber}</p>
                <div>
                  <Image
                    alt=""
                    sizes="100%"
                    width={0}
                    height={0}
                    className="w-12 h-auto"
                    src={'/image/room_details/room.png'}
                  />
                </div>
              </div>
            </CardHeader>
            <Divider orientation="horizontal" />
            <CardBody className="gap-3 flex flex-col">
              <div className="flex justify-between">
                <span>Floor</span>
                <span className="font-semibold">{room.floor}</span>
              </div>
              <Divider orientation="horizontal" />
              <div className="flex justify-between">
                <span>Room type</span>
                <span className="font-semibold">{room.type}</span>
              </div>
              <Divider orientation="horizontal" />
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="font-semibold">
                  {getReadableNumber(room.rentAmount)}&nbsp;VND
                </span>
              </div>
              <Divider orientation="horizontal" />
              <div className="flex justify-between">
                <span>Area</span>
                <span className="font-semibold">{room.area}&nbsp;m2</span>
              </div>
              <Divider orientation="horizontal" />
              <div className="flex justify-between">
                <span>Status</span>
                {room.status.toLowerCase() === 'available' ? (
                  <Chip color="primary">
                    <span className="font-semibold">{room.status}</span>
                  </Chip>
                ) : (
                  <Chip color="default">
                    <span className="font-semibold">{room.status}</span>
                  </Chip>
                )}
              </div>
              {room.status.toLowerCase() === 'occupied' && (
                <>
                  <Divider orientation="horizontal" />
                  <div className="flex justify-between">
                    <span>Check in date</span>
                    <span className="font-semibold text-primary">
                      {currentRoomBooking.checkInDate?.toString()}
                    </span>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      {/* Related room infor */}
      <div className="col-span-2 space-y-8">
        {/* Service */}
        <div>
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">Service Used</h2>
            <p className="italic text-sm text-gray-500">
              List of services used
            </p>
          </div>
          {services && services.length > 0 ? (
            <Table
              className="mt-6"
              classNames={{
                wrapper: 'min-h-[222px]',
              }}
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={servicePage}
                    total={serviceInfo.pages}
                    onChange={(page) => setServicePage(page)}
                  />
                </div>
              }
            >
              <TableHeader columns={serviceColumns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={serviceInfo.items}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center text-center">
              <p>No service to show</p>
            </div>
          )}
        </div>
        {/* Tenants */}
        <div>
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">List of tenants</h2>
            <p className="italic text-sm text-gray-500">
              Tenant information of the room
            </p>
          </div>
          {/* Tenant details */}
          <div className="mt-6 p-4">
            {tenants && tenants.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 justify-items-start">
                {tenants.map((t) => (
                  <User
                    key={t.id}
                    name={t.fullName}
                    description={t.phoneNumber}
                    avatarProps={{
                      src: `/image/room_details/${t.gender.toLowerCase() === 'male' ? 'male' : 'female'}.png`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p>No tenants to show</p>
              </div>
            )}
          </div>
        </div>
        {/* Invoices */}
        <div>
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">Invoice history</h2>
            <p className="italic text-sm text-gray-500">
              Collection history of the room
            </p>
          </div>
          {invoices && invoices.length > 0 ? (
            <Table
              className="mt-6"
              classNames={{
                wrapper: 'min-h-[222px]',
              }}
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={invoicePage}
                    total={invoiceInfo.pages}
                    onChange={(page) => setInvoicePage(page)}
                  />
                </div>
              }
            >
              <TableHeader columns={invoiceColumns}>
                {(column) => (
                  <TableColumn className="text-center" key={column.key}>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={invoiceInfo.items}>
                {(item: IInvoice) => (
                  <TableRow key={item.id} className="text-center">
                    {(columnKey) => {
                      switch (columnKey) {
                        case 'pollingMonth': {
                          return (
                            <TableCell>
                              <p className="font-semibold">
                                {getKeyValue(item, columnKey)}
                              </p>
                              <p>{item.type}</p>
                            </TableCell>
                          );
                        }
                        case 'invoiceTime': {
                          return (
                            <TableCell>
                              <p className="text-primary">
                                {item.invoiceDate.toString()}
                              </p>
                              <div className="flex items-center justify-center w-full">
                                <Image
                                  className="w-8 h-auto"
                                  alt=""
                                  sizes="100%"
                                  width={0}
                                  height={0}
                                  src={'/image/room_details/arrow-down.png'}
                                />
                              </div>
                              <p className="text-danger">
                                {item.paymentDeadline.toString()}
                              </p>
                            </TableCell>
                          );
                        }
                        case 'status': {
                          return (
                            <TableCell>
                              {item.status.toLowerCase() === 'paid' ? (
                                <Chip color="success">{item.status}</Chip>
                              ) : (
                                <Chip color="danger">{item.status}</Chip>
                              )}
                            </TableCell>
                          );
                        }
                        default: {
                          return (
                            <TableCell>
                              {getKeyValue(item, columnKey)}
                            </TableCell>
                          );
                        }
                      }
                    }}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center text-center">
              <p>No service to show</p>
            </div>
          )}
        </div>
        {/* Room history */}
        <div>
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">
              Rental history of the room
            </h2>
            <p className="italic text-sm text-gray-500">
              Record guest stays over the period of the room
            </p>
          </div>
          {/* Room history details */}
          {contracts && contracts.length > 0 ? (
            <Table
              className="mt-6 text-center"
              classNames={{
                wrapper: 'min-h-[222px]',
              }}
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={contractPage}
                    total={contractInfo.pages}
                    onChange={(page) => setContractPage(page)}
                  />
                </div>
              }
            >
              <TableHeader columns={contractColumns}>
                {(column) => (
                  <TableColumn className="text-center" key={column.key}>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={contractInfo.items}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => {
                      const cellValue = getKeyValue(item, columnKey);
                      switch (columnKey) {
                        case 'contractRepresentation': {
                          return (
                            <TableCell>
                              <p className="font-semibold">{cellValue}</p>
                            </TableCell>
                          );
                        }
                        case 'status': {
                          return (
                            <TableCell>
                              {cellValue.toLowerCase() === 'paid' ? (
                                <Chip
                                  startContent={<CheckIcon size={28} />}
                                  variant="flat"
                                  color="success"
                                >
                                  <span className="font-semibold">
                                    {cellValue}&nbsp;
                                  </span>
                                </Chip>
                              ) : (
                                <Chip
                                  startContent={<CheckIcon size={28} />}
                                  variant="flat"
                                  color="warning"
                                >
                                  <span className="font-semibold">
                                    {cellValue}&nbsp;
                                  </span>
                                </Chip>
                              )}
                            </TableCell>
                          );
                        }
                        case 'startDate': {
                          return (
                            <TableCell>
                              <p className="text-primary">{cellValue}</p>
                            </TableCell>
                          );
                        }
                        case 'endDate': {
                          return (
                            <TableCell>
                              <p className="text-danger">{cellValue}</p>
                            </TableCell>
                          );
                        }
                        default: {
                          return (
                            <TableCell>
                              {getKeyValue(item, columnKey)}
                            </TableCell>
                          );
                        }
                      }
                    }}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center text-center">
              <p>No contract to show</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
