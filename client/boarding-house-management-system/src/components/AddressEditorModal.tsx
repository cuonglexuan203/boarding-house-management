import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import CustomSelect, { ISelectItem } from './CustomSelect';
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/libs/services/locationApi';
import { IAddress } from '@/utils/types';
import { CustomCellEditorProps } from 'ag-grid-react';

export interface IAddressEditorModalProps extends CustomCellEditorProps {
  label: string;
  tenantId?: string;
  className?: string;
  currentValue: IAddress;
}

const AddressEditorModal = ({
  label,
  className,
  onValueChange,
  stopEditing,
  currentValue,
}: IAddressEditorModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const {
    data: provincesData,
    isLoading: isProvincesLoading,
    error: provincesError,
  } = useGetProvincesQuery();
  const [province, setProvince] = useState(new Set([]));
  //
  const {
    data: districtsData,
    error: districtsError,
    isLoading: districtsLoading,
    // @ts-ignore
  } = useGetDistrictsQuery(Array.from(province).at(0));
  const [district, setDistrict] = useState(new Set([]));
  const {
    data: wardsData,
    error: wardsError,
    isLoading: wardsLoading,
    // @ts-ignore
  } = useGetWardsQuery(Array.from(district).at(0));
  const [ward, setWard] = useState(new Set([]));

  const [addressDetails, setAddressDetails] = useState('');
  //
  // @ts-ignore
  const provinces: ISelectItem[] = useMemo(() => {
    return provincesData?.results.map((i) => ({
      id: i.province_id,
      value: i.province_name.replace('Thành phố', '').replace('Tỉnh', ''),
    }));
  }, [provincesData]);

  // @ts-ignore
  const districts: ISelectItem[] = useMemo(() => {
    return districtsData?.results.map((i) => ({
      id: i.district_id,
      value: i.district_name.replace(i.district_type, ''),
    }));
  }, [districtsData]);

  // @ts-ignore
  const wards: ISelectItem[] = useMemo(() => {
    return wardsData?.results.map((i) => ({
      id: i.ward_id,
      value: i.ward_name.replace(i.ward_type, ''),
    }));
  }, [wardsData]);

  // useEffect(() => {
  //   const currentProvinceId = provinces.find((p) =>
  //     p.value.includes(currentValue?.city),
  //   )?.id;
  //   // @ts-ignore
  //   setProvince(new Set([currentProvinceId]));

  //   const currentDistrictId = districts.find((d) =>
  //     d.value.includes(currentValue?.district),
  //   )?.id;

  //   // @ts-ignore
  //   setDistrict(new Set([currentDistrictId]));

  //   const currentWardId = wards.find((w) =>
  //     w.value.includes(currentValue?.ward),
  //   )?.id;

  //   // @ts-ignore
  //   setWard(new Set([currentWardId]));
  // }, [provinces]);

  if (isProvincesLoading || districtsLoading || wardsLoading) {
    return <div>is loading...</div>;
  }
  if (provincesError || districtsError || wardsError) {
    return <div>error</div>;
  }

  //
  const handleEditAddress = async () => {
    const newAddress = {
      city: provinces.find((i) => i.id === Array.from(province).at(0))?.value,
      district: districts.find((i) => i.id === Array.from(district).at(0))
        ?.value,
      ward: wards.find((i) => i.id === Array.from(ward).at(0))?.value,
      street: addressDetails,
    };
    onValueChange(newAddress);
  };
  //
  return (
    <>
      <div className={className}>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          isDismissable={false}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: 'easeOut',
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: 'easeIn',
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <div className="flex justify-center items-center w-full">
                    <Image
                      alt=""
                      src={'/image/room/add.png'}
                      sizes="100"
                      width={40}
                      height={40}
                    />
                    <h2 className="text-2xl ml-2">{label}</h2>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-3">
                    {isProvincesLoading ? (
                      <p>Loading Provinces...</p>
                    ) : provincesError ? (
                      <p>Provinces error</p>
                    ) : (
                      <CustomSelect
                        size="md"
                        isRequired={true}
                        label="Select Province/City"
                        items={provinces}
                        selectedKey={province}
                        onSelectionChange={(e) => {
                          setProvince(e);
                          setDistrict(new Set([]));
                        }}
                      />
                    )}
                    {districtsLoading ? (
                      <p>Loading districts...</p>
                    ) : districtsError ? (
                      <p>Districts error</p>
                    ) : (
                      <CustomSelect
                        size="md"
                        isRequired={true}
                        label="Select District"
                        items={districts}
                        selectedKey={district}
                        onSelectionChange={setDistrict}
                      />
                    )}
                    {wardsLoading ? (
                      <p>Loading Wards...</p>
                    ) : wardsError ? (
                      <p>Wards error</p>
                    ) : (
                      <CustomSelect
                        className="col-span-2 focus:outline-none"
                        size="md"
                        isRequired={true}
                        label="Select Ward/Commune"
                        items={wards}
                        selectedKey={ward}
                        onSelectionChange={setWard}
                      />
                    )}
                    <Input
                      size="md"
                      className="col-span-2"
                      isRequired
                      isClearable
                      label="Address details. Ex: 122 - Nguyen Duy Trinh Street"
                      value={addressDetails}
                      onValueChange={setAddressDetails}
                    />
                  </div>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={(e) => {
                        onClose();
                        stopEditing();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        handleEditAddress();
                        onClose();
                        stopEditing();
                      }}
                    >
                      Update
                    </Button>
                  </ModalFooter>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default AddressEditorModal;
