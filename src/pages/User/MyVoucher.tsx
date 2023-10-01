import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useStore } from '../../stores';
import { useEffect, useState, FC } from 'react';
import { Voucher } from '../../models/Voucher';
import { Grid, Paper } from '@mui/material';
import { AvailableVoucher } from '../../components/voucher/AvailableVoucher';
import { UsedVoucher } from '../../components/voucher/UsedVoucher';
import { ExpiredVoucher } from '../../components/voucher/ExpiredVoucher';

export const MyVoucher: FC<{usedVoucher: {
                                            title: string; description: string; voucherCode: string}[];
                                            availVouchers: {title: string; description: string; voucherCode: string}[];
                                            expiredVouchers: {title: string; description: string; voucherCode: string}[]}> = ({usedVoucher, availVouchers, expiredVouchers}) => {

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
      }
      
    function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
    }
    
    function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    
    return (
        <Paper elevation={8} sx={{mt: 2, mb: 5}}>
            <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Voucher khả dụng" {...a11yProps(0)} />
                <Tab label="Voucher đã sử dụng" {...a11yProps(1)} />
                <Tab label="Voucher hết hạn" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UsedVoucher vouchers={usedVoucher}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AvailableVoucher vouchers={availVouchers}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ExpiredVoucher vouchers={expiredVouchers}/>
            </TabPanel>
            </Box>
        </Paper>
    );
}

