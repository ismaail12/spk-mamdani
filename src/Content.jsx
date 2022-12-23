import { Button, Stack, TextField, Container, Typography, Grid, Alert } from '@mui/material';
import { defuzifikasi } from './fuzzy/mamdani';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Ada', 'Tidak'];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  
};


const Content = () => {
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [hasil, setHasil] = useState(0);
  const [tingkatResiko, setTingkatResiko] = useState('');

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);


  const onSubmit = data => {
    const riwayatFinal = riwayat === "Ada" ? 1 : 0;
    const bmi = data.beratBadan / ((data.tinggiBadan / 100) ** 2);
    const defuz = defuzifikasi(data.tekananDarah, data.gulaDarah, data.kolesterol, bmi, riwayatFinal);
    setHasil(defuz.value.toFixed(2));
    setTingkatResiko(defuz.name);
    handleOpen();
  };
  const [riwayat, setRiwayat] = React.useState(options[0]);
  const [inputRiwayat, setNewRiwayat] = React.useState('');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container sx={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid container
            alignItems="center"
            justifyContent="center" spacing={3}>
            <Grid item xs={12}><Typography variant="h4" color="initial" textAlign='center'>Sistem Diagnosa Penyakit Jantung</Typography></Grid>
            <Grid item xs={12}><Typography variant="h4" color="initial" textAlign='center'>Menggunakan Metode Mamdani Largest of Maximum</Typography></Grid>
            <Grid item xs={10}><Typography variant="body2" color="initial" textAlign='center'>Ismail - 191011400124</Typography></Grid>
            <Grid item xs={10} md={4}>
              <Stack direction='column' gap={2} alignContent="center">
                <TextField label='Tekanan Darah (mmhg)' type={'number'} size='small' {...register("tekananDarah", {
                  required: true
                })} />
                { }
                <TextField label='Gula Darah (mmhg)' type={'number'} size='small' {...register("gulaDarah", { required: true })} />
                <TextField label='Kolesterol (mg/dl)' type={'number'} size='small' {...register("kolesterol", { required: true })} />
                <TextField label='Tinggi Badan (cm)' type={'number'} size='small' {...register("tinggiBadan", { required: true })} />
                <TextField label='Berat Badan (kg)' type={'number'} size='small' {...register("beratBadan", { required: true })} />
                <Autocomplete
                  value={riwayat}
                  onChange={(event, newValue) => {
                    setRiwayat(newValue);
                  }}
                  inputValue={inputRiwayat}
                  onInputChange={(event, newinputRiwayat) => {
                    setNewRiwayat(newinputRiwayat);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  size='small'
                  renderInput={(params) => <TextField {...params} label="Riwayat Keluarga" />}
                />
                <Button type='submit' variant='contained'>
                  Diagnosa
                </Button>
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography textAlign={'center'} id="modal-modal-title" variant="h6" component="h2">
                      Hasil Diagnosa
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Tingkat resiko {tingkatResiko} dengan nilai {hasil}
                    </Typography>
                  </Box>
                </Modal>
              </Stack>

            </Grid>
          </Grid>
        </Container>

      </form>
    </div>
  )
}

export default Content