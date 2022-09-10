import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function CalenderDialog({ openDialog, setOpenDialog, start, end, events, setEvents }) {
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
                {/* <DialogTitle id="alert-dialog-title">{'Task'}</DialogTitle> */}
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label="Task Name"
                        variant="outlined"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            setTitle('Eyad');
                            setEvents([...events, { start, end, title }]);
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
