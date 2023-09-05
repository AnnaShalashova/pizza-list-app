import { Box, Typography } from '@mui/material';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
  mt: -5,
};

export const NotFoundPage = () => {
  return (
    <Box sx={styles}>
      <Typography sx={{ fontSize: '56px' }}>404</Typography>
      <Typography sx={{ fontSize: '36px' }}>Страница не найдена.</Typography>
    </Box>
  );
};
