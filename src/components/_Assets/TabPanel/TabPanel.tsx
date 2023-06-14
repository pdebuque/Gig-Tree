import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode,
  value: number,
  index: number
}

const TabPanel = ({ children, value, index }:Props) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, ml: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default TabPanel;