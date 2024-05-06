import ImmutableColumn from '@/components/ImmutableColumn';
import AutocompleteEditor from '@/components/grid/AutocompleteEditor';
import { ColDef } from 'ag-grid-community';
import { getFormattedNumber, isNumeric } from './converterUtil';
import OnlyIconButton from '@/components/OnlyIconButton';
import CustomDropdown, {
  ICustomDropdownItemData,
} from '@/components/CustomDropdown';

export const roomColumnDefs: ColDef[] = [
  {
    headerName: '',
    colId: 'movableCol',
    valueGetter: (params) => {
      return null;
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
          iconSrc: '/image/room/beds.png',
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
    headerName: 'ID',
    field: 'id',
    suppressMovable: true,
    editable: false,
    width: 100,
  },

  {
    headerName: 'Room number',
    field: 'roomNumber',
    cellDataType: 'string',
    // valueSetter: (params) => {
    //   params.data.roomNumber = 1;
    //   return true;
    // },
    // cellStyle: (params) => {
    //   if (params.value === '102') {
    //     //mark police cells as red
    //     return { color: 'red', backgroundColor: 'green' };
    //   }
    //   return null;
    // },
  },
  {
    headerName: 'Floor',
    field: 'floor',
    cellDataType: 'string',
    cellEditor: AutocompleteEditor,
    cellEditorParams: {
      items: [
        { value: 'GROUND' },
        { value: 'ONE' },
        { value: 'TWO' },
        { value: 'THREE' },
        { value: 'FOUR' },
        { value: 'FIVE' },
      ],
      label: 'Select floor',
    },
  },
  {
    headerName: 'Rent amount',
    field: 'rentAmount',
    cellDataType: 'number',
    valueGetter: (params) => {
      if (!params.data) {
        return null;
      }
      if (params.data.rentAmount !== undefined) {
        return getFormattedNumber(params.data.rentAmount);
      }
    },
    valueFormatter: (params) => {
      if (!params.data) {
        return '';
      }
      if (!isNumeric(params.value)) {
        return NaN.toString();
      }
      return params.value + ' VND';
    },
  },
  {
    headerName: 'Area',
    field: 'area',
    cellDataType: 'number',
    valueGetter: (params) => {
      if (!params.data) {
        return null;
      }
      if (params.data.area !== undefined) {
        return getFormattedNumber(params.data.area);
      }
    },
    valueFormatter: (params) => {
      if (!params.data) {
        return '';
      }
      if (!isNumeric(params.value)) {
        return NaN.toString();
      }
      return params.value + ' m2';
    },
  },
  {
    headerName: 'Type',
    field: 'type',
    cellEditor: AutocompleteEditor,
    cellEditorParams: {
      items: [
        {
          value: 'SINGLE',
        },
        {
          value: 'DOUBLE',
        },
        {
          value: 'TRIPLE',
        },
        {
          value: 'UNKNOWN',
        },
      ],
      label: 'Select type',
    },
  },
  {
    headerName: 'Status',
    field: 'status',
    cellEditor: AutocompleteEditor,
    cellEditorParams: {
      items: [
        {
          value: 'AVAILABLE',
        },
        {
          value: 'OCCUPIED',
        },
      ],
      label: 'Select status',
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
              value: 'Room detail',
            },
            {
              value: 'New contract',
              color: 'success',
              className: 'text-success',
            },
            {
              value: 'Service setting',
            },
            {
              value: 'Delete room',
              color: 'danger',
              className: 'text-danger',
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
