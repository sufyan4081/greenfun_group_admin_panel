import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';
import GeographyChart from '../../components/GeographyChart';

const Map = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
     <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> 
    </>
  )
}

export default Map
