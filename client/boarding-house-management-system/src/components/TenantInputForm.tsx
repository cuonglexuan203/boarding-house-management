'use client';
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/libs/services/locationApi';
import { parseDate } from '@internationalized/date';
import React, { useMemo, useState } from 'react';
import CircularProgressLoading from './CircularProgressLoading';
import Error from './Error';
import CustomSelect, { ISelectItem } from './CustomSelect';
import { DatePicker, Input } from '@nextui-org/react';
import PasswordInput from './PasswordInput';
import { ITenant, IUser } from '@/utils/types';

export const TenantInputForm = ({ data }: { data: { tenant: IUser } }) => {
  const [fullName, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [gender, setGender] = useState(new Set([]));
  const [birthday, setBirthday] = useState(parseDate('1970-01-01'));
  const [career, setCareer] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Address
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

  // @ts-ignore
  const provinces: ISelectItem[] = useMemo(() => {
    return provincesData?.results.map((i: any) => ({
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

  const GENDER = useMemo(() => ['MALE', 'FEMALE', 'UNKNOWN'], []);
  if (isProvincesLoading || districtsLoading || wardsLoading) {
    return <CircularProgressLoading />;
  }
  if (provincesError || districtsError || wardsError) {
    return <Error />;
  }
  const newTennt = {
    fullName,
    email,
    phoneNumber,
    idCardNumber,
    // @ts-ignore
    gender: Array.from(gender).at(0),
    address: {
      // @ts-ignore
      city: Array.from(province).at(0),
      // @ts-ignore
      district: Array.from(district).at(0),
      // @ts-ignore
      ward: Array.from(ward).at(0),
      // @ts-ignore
      street: Array.from(addressDetails).at(0),
    },
    birthday: birthday.toString(),
    career,
    username,
    password,
    // rooms: selectedRooms.map((i) => ({ id: i })), //
  };
  //   @ts-ignore
  data.tenant = newTennt;
  return (
    <div className="space-y-4 col-span-2">
      {/* Header */}
      <div className="border-s-4 border-[#4b4ce4] ps-2">
        <h2 className="text-xl font-semibold">
          Personal information of tenants:
        </h2>
        <p className="italic text-xs text-gray-500">
          Tenant and deposit information
        </p>
      </div>
      {/* Required infor */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          size="sm"
          isRequired
          isClearable
          label="Tenant name"
          value={fullName}
          onValueChange={setFullname}
        />
        <Input
          size="sm"
          isRequired
          isClearable
          label="Phone number"
          value={phoneNumber}
          onValueChange={setPhoneNumber}
        />
        <Input
          size="sm"
          className="col-span-2"
          isRequired
          isClearable
          label="Email"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          size="sm"
          className="col-span-2"
          isRequired
          isClearable
          label="ID card number"
          value={idCardNumber}
          onValueChange={setIdCardNumber}
        />
        <CustomSelect
          size="sm"
          isRequired={true}
          label="Select gender"
          items={GENDER}
          selectedKey={gender}
          onSelectionChange={setGender}
        />
        <DatePicker
          size="sm"
          label={'Birthday'}
          value={birthday}
          onChange={setBirthday}
          showMonthAndYearPickers
        />
        {/* Address */}
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
      <Input
        size="sm"
        className="col-span-2"
        isRequired
        isClearable
        label="Career"
        value={career}
        onValueChange={setCareer}
      />
      <Input
        size="sm"
        className="col-span-2"
        isRequired
        isClearable
        label="Username"
        value={username}
        onValueChange={setUsername}
      />
      <PasswordInput value={password} onValueChange={setPassword} size="sm" />
    </div>
  );
};
