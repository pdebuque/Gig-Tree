import { Box} from '@mui/material'

export default function TabPanel({ children, value, index }) {
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
