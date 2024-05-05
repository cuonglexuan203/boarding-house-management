'use client';

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
const Report = () => {
  const [data, setData] = useState([
    {
      id: 1,
      money: 17264312,
    },
    {
      id: 2,
      money: 7182974304.123,
    },
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'id',
    },
    {
      field: 'money',
      editable: true,
      valueFormatter: (params) => {
        return (params.value as Number).toLocaleString('vi-VN') + ' VND';
      },
      valueSetter: (params) => {
        params.data!.money = params.newValue;
        return true;
      },
      valueParser: (params) => {
        const newValue = params.newValue.toLowerCase();
        if (newValue.includes('vnd')) {
          return newValue.substring(0, -3);
        }
        return newValue;
      },
    },
  ]);

  return (
    <div className="ag-theme-quartz " style={{ height: 500 }}>
      <AgGridReact rowData={data} columnDefs={columnDefs} />
    </div>
  );
};

export default Report;
