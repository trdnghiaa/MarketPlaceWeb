import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useStore } from '../../stores';
import { Grid } from '@mui/material';
import { FC } from 'react';

export const UsedVoucher: FC<{vouchers: {title: string; description: string; voucherCode: string}[]}> = ({vouchers}) => {
    
    const {sProfile} = useStore();
  return (
    <Grid container spacing={2}>
        {vouchers.map(({title, description, voucherCode}) => (
            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://ik.imagekit.io/tvlk/image/imageResource/2022/05/10/1652165175734-37b207f07a721566c25d6bec4fa27649.png?tr=dpr-3,h-230,q-75,w-472"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {description}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                    Code: {voucherCode}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
  )
}
