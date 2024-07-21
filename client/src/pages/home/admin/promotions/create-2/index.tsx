import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { theme } from '../create/theme';
import { pt } from 'date-fns/locale';

const CreatePromotion: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    if (!startDate) {
      setStartError(true);
    }
    if (!endDate) {
      setEndError(true);
    }
    if (startDate && endDate) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    router.push('/admin/promotions');
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <h1>ADMIN</h1>
        <div style={{
          backgroundColor: '#ffffff',
          height: '70vh',
          width: '100%',
          borderRadius: '1rem',
          gap: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <ThemeProvider theme={theme}>
            <h2 style={{ color: '#121212', margin: '1.5rem' }}>CADASTRO DE PROMOÇÕES</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                <DatePicker
                  
                  label="Data de início"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <DatePicker
                  label="Data de término"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </LocalizationProvider>
            </div>
            <Button
              style={{
                backgroundColor: "#121212",
                color: "#FFFFFF",
                fontWeight: 600,
                marginTop: '2rem'
              }}
              variant="contained"
              onClick={handleNext}
            >
              Cadastrar
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza de que deseja cadastrar essa promoção?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePromotion;
function setStartError(arg0: boolean) {
    throw new Error('Function not implemented.');
}

function setEndError(arg0: boolean) {
    throw new Error('Function not implemented.');
}

