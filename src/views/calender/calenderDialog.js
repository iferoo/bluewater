import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CalenderDialog({ id, taskTitle, openDialog, setOpenDialog, start, setStart, end, setEnd, status, handleSubmite }) {
    const theme = useTheme();

    const [title, setTitle] = useState(taskTitle);

    const handleClose = () => {
        setOpenDialog(false);
    };

    // const date = new Date();
    // console.log(new Date(start.toISOString().slice(0, 16)), start.toISOString());
    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ ...theme.typography.h3, color: theme.palette.primary.dark }}>
                    {'Task'}
                </DialogTitle>
                <DialogContent>
                    <Stack>
                        <TextField
                            id="outlined-basic"
                            label="Task Name"
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={taskTitle}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Start Date"
                            variant="outlined"
                            type="datetime-local"
                            defaultValue={start.toISOString().slice(0, 16)}
                            sx={{ mt: 2 }}
                            onChange={(event) => setStart(new Date(event.target.value))}
                        />
                        <TextField
                            id="outlined-basic"
                            label="End Date"
                            variant="outlined"
                            type="datetime-local"
                            defaultValue={end.toISOString().slice(0, 16)}
                            sx={{ mt: 2 }}
                            onChange={(event) => setEnd(new Date(event.target.value))}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            const newStatus = status === 'ADD' ? 'CANCEL' : 'DELETE';
                            handleSubmite(newStatus, title, start, end, id);
                            handleClose();
                            setTitle('');
                        }}
                    >
                        {status === 'ADD' ? 'Cancel' : 'Delete'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleSubmite(status, title, start, end, id);
                            handleClose();
                            setTitle('');
                        }}
                    >
                        {status === 'ADD' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
CalenderDialog.propTypes = {
    id: PropTypes.number,
    taskTitle: PropTypes.string,
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    status: PropTypes.string,
    handleSubmite: PropTypes.func,
    setStart: PropTypes.func,
    setEnd: PropTypes.func
};
