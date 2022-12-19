import { useState, useEffect } from 'react'
import { resiko } from './fuzzy/tsukamoto'
import { Container } from '@mui/system'
import { TextField, Grid, Button, Typography, Autocomplete } from '@mui/material';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Content from './Content';

const theme = createTheme({

});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  )
}

export default App
