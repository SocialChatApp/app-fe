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
          minHeight: '100vh',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            width: '100%',
          }}
        >
          <RouterConfig />
          {/* Your main content goes here */}
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default App
