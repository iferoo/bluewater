import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

export default function CalenderDialog({
    id,
    taskTitle,
    openDialog,
    setOpenDialog,
    start,
    setStart,
    end,
    setEnd,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    status
}) {
    const theme = useTheme();

    // handle title
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(taskTitle);
    }, [taskTitle]);

    // handle close dialog
    const handleClose = () => {
        setOpenDialog(false);
        setTitle('');
    };

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
                    {status === 'SELECT_SLOT' ? (
                        <>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleAddEvent(title, start, end);
                                    handleClose();
                                }}
                            >
                                Add
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    handleDeleteEvent(id, title, start, end);
                                    handleClose();
                                    setTitle('');
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleUpdateEvent(id, title, start, end);
                                    handleClose();
                                }}
                            >
                                Update
                            </Button>
                        </>
                    )}
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
    setStart: PropTypes.func,
    setEnd: PropTypes.func,
    handleAddEvent: PropTypes.func,
    handleUpdateEvent: PropTypes.func,
    handleDeleteEvent: PropTypes.func
};
