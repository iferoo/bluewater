import { useState } from 'react';

// material-ui
import { Typography } from '@mui/material';
import MaterialTable from 'material-table';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const [tableData, setTableData] = useState([
        { name: 'Raj', email: 'Raj@gmail.com', phone: 7894561230, age: null, gender: 'M', city: 'Chennai', fee: 78456 },
        { name: 'Mohan', email: 'mohan@gmail.com', phone: 7845621590, age: 35, gender: 'M', city: 'Delhi', fee: 456125 },
        { name: 'Sweety', email: 'sweety@gmail.com', phone: 741852912, age: 17, gender: 'F', city: 'Noida', fee: 458796 },
        { name: 'Vikas', email: 'vikas@gmail.com', phone: 9876543210, age: 20, gender: 'M', city: 'Mumbai', fee: 874569 },
        { name: 'Neha', email: 'neha@gmail.com', phone: 7845621301, age: 25, gender: 'F', city: 'Patna', fee: 748521 },
        { name: 'Mohan', email: 'mohan@gmail.com', phone: 7845621590, age: 35, gender: 'M', city: 'Delhi', fee: 456125 },
        { name: 'Sweety', email: 'sweety@gmail.com', phone: 741852912, age: 17, gender: 'F', city: 'Noida', fee: 458796 },
        { name: 'Vikas', email: 'vikas@gmail.com', phone: 9876543210, age: 20, gender: 'M', city: 'Mumbai', fee: 874569 },
        { name: 'Raj', email: 'Raj@gmail.com', phone: 7894561230, age: null, gender: 'M', city: 'Chennai', fee: 78456 },
        { name: 'Mohan', email: 'mohan@gmail.com', phone: 7845621590, age: 35, gender: 'M', city: 'Delhi', fee: 456125 },
        { name: 'Sweety', email: 'sweety@gmail.com', phone: 741852912, age: 17, gender: 'F', city: 'Noida', fee: 458796 },
        { name: 'Vikas', email: 'vikas@gmail.com', phone: 9876543210, age: 20, gender: 'M', city: 'Mumbai', fee: 874569 }
    ]);
    const columns = [
        {
            title: 'Name',
            field: 'name',
            sorting: false,
            filtering: false,
            cellStyle: { background: '#009688' },
            headerStyle: { color: '#fff' }
        },
        { title: 'Email', field: 'email', filterPlaceholder: 'filter' },
        { title: 'Phone Number', field: 'phone', align: 'center', grouping: false },
        {
            title: 'Age',
            field: 'age',
            emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div style={{ background: rowData.age >= 18 ? '#008000aa' : '#f90000aa', borderRadius: '4px', paddingLeft: 5 }}>
                    {rowData.age}
                </div>
            ),
            searchable: false,
            export: false
        },
        { title: 'Gender', field: 'gender', lookup: { M: 'Male', F: 'Female' } },
        { title: 'City', field: 'city', filterPlaceholder: 'filter' },
        {
            title: 'School Fee',
            field: 'fee',
            type: 'currency',
            currencySetting: { currencyCode: 'INR', minimumFractionDigits: 1 },
            cellStyle: { background: '#009688' },
            headerStyle: { color: '#fff' }
        }
    ];

    return (
        <MainCard>
            <MaterialTable
                columns={columns}
                data={tableData}
                editable={{
                    onRowAdd: (newRow) =>
                        new Promise((resolve, reject) => {
                            setTableData([...tableData, newRow]);

                            setTimeout(() => resolve(), 500);
                        }),
                    onRowUpdate: (newRow, oldRow) =>
                        new Promise((resolve, reject) => {
                            const updatedData = [...tableData];
                            updatedData[oldRow.tableData.id] = newRow;
                            setTableData(updatedData);
                            setTimeout(() => resolve(), 500);
                        }),
                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            const updatedData = [...tableData];
                            updatedData.splice(selectedRow.tableData.id, 1);
                            setTableData(updatedData);
                            setTimeout(() => resolve(), 1000);
                        })
                }}
                actions={[
                    {
                        // icon: () => <GetAppIcon />,
                        tooltip: 'Click me',
                        onClick: (e, data) => console.log(data)
                        // isFreeAction:true
                    }
                ]}
                onSelectionChange={(selectedRows) => console.log(selectedRows)}
                options={{
                    sorting: true,
                    search: true,
                    searchFieldAlignment: 'right',
                    searchAutoFocus: true,
                    searchFieldVariant: 'standard',
                    filtering: true,
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                    pageSize: 5,
                    paginationType: 'stepped',
                    showFirstLastPageButtons: false,
                    paginationPosition: 'both',
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: 'TableData',
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    selection: true,
                    showSelectAllCheckbox: false,
                    showTextRowsSelected: false,
                    selectionProps: (rowData) => ({
                        disabled: rowData.age == null
                        // color:"primary"
                    }),
                    grouping: true,
                    columnsButton: true,
                    rowStyle: (data, index) => (index % 2 === 0 ? { background: '#f5f5f5' } : null),
                    headerStyle: { background: '#f44336', color: '#fff' }
                }}
                title="Student Information"
                icons={tableIcons}
            />
            {/* <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography> */}
        </MainCard>
    );
}
