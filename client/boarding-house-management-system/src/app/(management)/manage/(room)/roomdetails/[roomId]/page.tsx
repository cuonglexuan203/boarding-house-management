'use client';
import { CheckIcon } from '@/components/icon/CheckIcon';
import { useGetRoomDetailsQuery } from '@/libs/services/roomDetailsApi';
import { getReadableNumber } from '@/utils/converterUtil';
import { IRoomDetails } from '@/utils/types';
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
  getKeyValue,
} from '@nextui-org/react';
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
  const serviceRows = useMemo(() => {
    const rows = data?.services.map((s) => ({
      ...s,
      isMeteredService: s.isMeteredService ? 'Metered Service' : 'Fixed',
      unitPrice: getReadableNumber(s.price) + ' VND' + ' / ' + s.unit,
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
  console.log(serviceInfo);

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
    contract,
  } = data as IRoomDetails;

  return (
    <section className="mt-8 mx-6 grid grid-cols-3 gap-4">
      {/* Room infor */}
      <div>
        {/* Header */}
        <div className="border-s-4 border-[#4b4ce4] ps-2">
          <h2 className="text-2xl font-semibold">Room Information</h2>
          <p className="italic text-sm text-gray-500">Room details</p>
        </div>
        {/* Room infor */}
        <div className="mt-6">
          <Card>
            <CardHeader className="flex justify-center">
              <p>Room number:&nbsp;</p>
              <p className="font-semibold">{room.roomNumber}</p>
            </CardHeader>
            <Divider orientation="horizontal" />
            <CardBody className="gap-3 flex flex-col">
              <div className="flex justify-between">
                <span>Floor</span>
                <span className="font-semibold">{room.floor}</span>
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
                    <span className="font-semibold">
                      {currentRoomBooking.checkInDate.toString()}
                    </span>
                  </div>
                  <Divider orientation="horizontal" />
                  <div className="flex justify-between">
                    <span>Deposit amount</span>
                    <span className="font-semibold">
                      {getReadableNumber(contract.depositAmount)}&nbsp;VND
                    </span>
                  </div>
                  <Divider orientation="horizontal" />
                  <div className="flex justify-between">
                    <span>Financial status</span>
                    {contract.status.toLowerCase() === 'paid' ? (
                      <Chip
                        startContent={<CheckIcon size={28} />}
                        variant="flat"
                        color="success"
                      >
                        <span className="font-semibold">
                          {contract.status}&nbsp;
                        </span>
                      </Chip>
                    ) : (
                      <Chip
                        startContent={<CheckIcon size={28} />}
                        variant="flat"
                        color="warning"
                      >
                        <span className="font-semibold">
                          {contract.status}&nbsp;
                        </span>
                      </Chip>
                    )}
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
        </div>
        {/* Invoices */}
        <div>
          <div className="border-s-4 border-[#4b4ce4] ps-2">
            <h2 className="text-2xl font-semibold">Invoice history</h2>
            <p className="italic text-sm text-gray-500">
              Collection history of the room
            </p>
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
