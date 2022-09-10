import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';

export default function CalenderDialog({ taskTitle, openDialog, setOpenDialog, start, end, status, handleSubmite }) {
    const theme = useTheme();
    const handleClose = () => {
        setOpenDialog(false);
    };
    const [title, setTitle] = useState('');

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
                    <TextField
                        id="outlined-basic"
                        label="Task Name"
                        variant="outlined"
                        sx={{ mt: 2 }}
                        defaultValue={taskTitle}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="error">
                        {status === 'ADD' ? 'Cancel' : 'Delete'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleSubmite(status, title, start, end);
                            handleClose();
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
    taskTitle: PropTypes.string,
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    status: PropTypes.string,
    handleSubmite: PropTypes.func
};
