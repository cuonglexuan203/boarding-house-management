import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { CheckIcon } from './icon/CheckIcon';

export interface IRoomInvoice {
  roomNumber: string;
  type: string;
  startDate: string;
  endDate: string;
  status: boolean;
  serviceCount?: number;
  className?: string;
}
const RoomInvoice = ({
  roomNumber,
  type,
  startDate,
  endDate,
  status,
  serviceCount,
  className,
}: IRoomInvoice) => {
  return (
    <div className={className}>
      <Badge
        content={status && <CheckIcon />}
        color="success"
        placement="bottom-right"
      >
        <Card className="w-full min-w-36" shadow="sm" radius="lg">
          <CardHeader className="flex justify-center items-center">
            <div className="text-center">
              <Badge content={serviceCount} color="primary">
                <p className="text-lg font-bold text-center mt-[2px] mr-1">
                  {roomNumber}
                </p>
              </Badge>
              <p className="text-small text-default-500">{startDate}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{type}</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center items-center">
            <p className="text-danger text-center font-semibold">{endDate}</p>
          </CardFooter>
        </Card>
      </Badge>
    </div>
  );
};

export default RoomInvoice;
