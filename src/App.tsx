import { Box, Container } from '@mui/material'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RouterConfig from './config/RouterConfig'

function App() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // Ensure the container takes at least the full viewport height
        }}
      >
        <Header />
        <Container component="main" sx={{ flex: 1 }}>
          <RouterConfig />
          {/* Your main content goes here */}
        </Container>
        <Footer />
      </Box>
    </>
  )
}

export default App
