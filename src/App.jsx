import { createTheme, ThemeProvider } from '@mui/material/styles';
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
