import { Routes, Route } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage/EmployeesPage';
import EmployerDetailsPage from './pages/EmployerDetailPage/EmployerDetailsPage';
import Header from './containers/Header';
import NewEmployerPage from './pages/NewEmployerPage';
import NotFoundPage from './pages/NotFoundPage';
import { Box } from '@mui/material';

function App() {

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Header />
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/:employerId" element={<EmployerDetailsPage />} />
        <Route path="/employees/new" element={<NewEmployerPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Box>
  )
}

export default App
