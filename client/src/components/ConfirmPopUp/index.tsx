import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, title, description }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                style: {
                    borderRadius: '0.8rem',
                }
            }}
        >
            <Box sx={{ paddingX: 4, paddingY: 2 }}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancelar</Button>
                    <Button onClick={onConfirm} color="primary" autoFocus>Confirmar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default ConfirmationModal;
