import { useState } from 'react'
import { resiko } from './fuzzy/tsukamoto'
import { Container } from '@mui/system'
import { TextField, Grid, Button, Typography, Autocomplete } from '@mui/material';

const options = ['Tidak', 'Ada'];


function App() {
  const [tekananDarah, setTekananDarah] = useState(0);
  const [gulaDarah, setGulaDarah] = useState(0);
  const [kolesterol, setKolesterol] = useState(0);
  const [beratBadan, setBeratBadan] = useState(0);
  const [tinggiBadan, setTinggBadan] = useState(0);
  const [bmi, setBMI] = useState(0);
  const [riwayat, setRiwayat] = useState(options[0]);
  const [inputRiwayat, setInputRiwayat] = useState(0);
  const [hasil, setHasil] = useState(0);
  const [tingkatResiko, setTingkatResiko] = useState('');


  const tingkatResikoHandler = () => {
    if (hasil < 0.4) {
      setTingkatResiko('Kecil')
    } else if (hasil > 0.4 && hasil < 0.9) {
      setTingkatResiko('Sedang')
    } else if (hasil > 0.9) {
      setTingkatResiko('Besar')
    }
  }

  const bmiHandler = () => setBMI(beratBadan / ((tinggiBadan / 100) ** 2))

  const onClickHandler = () => {
    bmiHandler();
    setHasil(resiko(tekananDarah, gulaDarah, kolesterol, bmi, inputRiwayat).toFixed(2));
    tingkatResikoHandler();

  }


  return (
    <Container>
      <Grid marginTop={8} marginBottom={4} container direction='column'
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <Grid item>
          <Typography variant="h4" align='center' component="h2">
            Sistem Diagnosa Penyakit Jantung
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align='center' component="body">
            Ismail - 191011400124
          </Typography>
        </Grid>
      </Grid>
      <Grid marginTop={4} marginBottom={4} container direction='row'
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}>
        <Grid item>
          <Grid container direction='row' justifyContent="center"
            alignItems="flex-start" spacing={2}>
            <Grid item sx={{ width: 150 }}>
              <TextField id="tekanan-darah" label="Tekanan Darah (mmhg)" type="number" InputLabelProps={{ shrink: true }} variant="outlined" size='small' onChange={(event) => {
                setTekananDarah(event.target.value)
              }} />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField id="gula-darah" label="Gula Darah (mmhg)" type="number" InputLabelProps={{ shrink: true }} variant="outlined" size='small' onChange={(event) => {
                setGulaDarah(event.target.value)
              }} />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField id="kolesterol" label="Kolesterol (mg/dl)" type="number" InputLabelProps={{ shrink: true }} variant="outlined" size='small' onChange={(event) => {
                setKolesterol(event.target.value)
              }} />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField id="tinggi-badan" label="Tinggi Badan (cm)" type="number" InputLabelProps={{ shrink: true }} variant="outlined" size='small' onChange={(event) => {
                setTinggBadan(event.target.value)
              }} />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField id="berat-badan" label="Berat Badan (kg)" type="number" InputLabelProps={{ shrink: true }} variant="outlined" size='small' onChange={(event) => {
                setBeratBadan(event.target.value)
              }} />
            </Grid>

            <Grid item sx={{ width: 150 }}>
              <Autocomplete
                value={riwayat}
                onChange={(event, newValue) => { if (newValue === 'Ada') setInputRiwayat(1) }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 135 }}
                renderInput={(params) => <TextField {...params} label="Riwayat" size='small' InputLabelProps={{ shrink: true }} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center" direction='column'>
        <Grid item sx={{ width: 120 }}>
          <Button variant='contained' onClick={onClickHandler}>Hitung</Button>
        </Grid>
        <Grid item >
          <Typography variant="body1" align='center' component="body">
            Tingkat Resiko : {tingkatResiko}
          </Typography>
          <Typography variant="body1" align='center' component="body">
            Dengan Nilai : {hasil}
          </Typography>
        </Grid>
      </Grid>

    </Container>

  )
}

export default App
