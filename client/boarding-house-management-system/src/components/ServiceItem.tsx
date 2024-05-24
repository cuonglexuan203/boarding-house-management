import { IService } from '@/utils/types';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import EditServiceModal from './EditServiceModal';
import DeleteServiceModal from './DeleteServiceModal';

const ServiceItem = ({ service }: { service: IService }) => {
  return (
    <Card shadow="sm" className="p-2 grid grid-cols-8 gap-1 min-h-24">
      <CardHeader className="">
        <div className="flex justify-center items-center">
          <Image
            alt=""
            src={'/image/service/service.png'}
            width={0}
            height={0}
            sizes="100%"
            className="h-8 w-auto"
          />
        </div>
      </CardHeader>
      <CardBody className="col-span-5">
        <p className="font-semibold text-md">{service.name}</p>
        <p className="text-sm">
          {service.price}&nbsp;đ&nbsp;/&nbsp;{service.unit}
        </p>
      </CardBody>
      <CardFooter className="col-span-2">
        <div className="flex justify-between items-center w-full p-2 me-2">
          <EditServiceModal service={service} />
          <DeleteServiceModal serviceId={service.id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceItem;
