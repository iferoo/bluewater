import { useState } from 'react';

// material-ui
// import { Typography } from '@mui/material';
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
    const [columns, setColumns] = useState([
        { title: 'Statement', field: 'statement' },
        { title: 'Total', field: 'total', type: 'numeric' },
        { title: 'Date', field: 'date' },
        { title: 'Payment', field: 'payment' },
        { title: 'Payment Date', field: 'paymentDate' },
        { title: 'The Rest', field: 'theRest' },
        {
            title: 'State',
            field: 'state',
            lookup: { deferred: 'Deferred', paid: 'Paid' },
            render: (rowData) => (
                <div
                    style={{
                        background: rowData.state == 'paid' ? '#008000aa' : '#f90000aa',
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: '#ffffff'
                    }}
                >
                    {rowData.state}
                </div>
            )
        },
        {
            title: 'Reciever',
            field: 'reciever',
            lookup: { abdelsalam: 'Abd El Salam', ahmed: 'Ahmed', eyad: 'Eyad', alla: 'Alla', annika: 'Annika' }
        },
        { title: 'Notes', field: 'notes' }
    ]);

    const [data, setData] = useState([
        {
            statement: 'Marina ind 2',
            total: 1000,
            date: '10/9/2022',
            payment: 1987,
            paymentDate: '11/8/2022',
            theRest: 500,
            state: 'deferred',
            reciever: 'abdelsalam',
            notes: ''
        },
        {
            statement: 'Oxegen Tank',
            total: 500,
            date: '5/9/2022',
            payment: 1987,
            paymentDate: '5/9/2022',
            theRest: 200,
            state: 'paid',
            reciever: 'eyad',
            notes: ''
        }
    ]);
    return (
        <MainCard>
            <MaterialTable
                title="Payments"
                icons={tableIcons}
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                resolve();
                            }, 1000);
                        })
                }}
                options={{
                    sorting: true,
                    search: true,
                    searchFieldAlignment: 'left',
                    searchAutoFocus: true,
                    searchFieldVariant: 'standard',
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                    pageSize: 5,
                    paginationType: 'stepped',
                    showFirstLastPageButtons: true,
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: 'blue water aza2',
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    columnsButton: true
                }}
            />
        </MainCard>
    );
}
