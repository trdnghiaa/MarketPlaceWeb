import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TRANSLATE_TERMS } from "../../utils";
import { CardMedia, IconButton } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { useEffect } from "react"
import { useStore } from "../../stores";
import PlaceIcon from '@mui/icons-material/Place';

export const Post = () => {

    const {sHome } = useStore();
    useEffect (()=>{
        sHome.init();
    })
    return (
        <Container>
            <h1> {TRANSLATE_TERMS.NEW_POST} </h1>
                <Box sx={{ width: '100%' }} >
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {sHome.post.map(({title,description,images,createdBy,created_at}) => (
                                <Card sx={{ maxWidth: 345 }}>
                                    <Link 
                                    to='/detail' 
                                    onClick={() => {
                                        console.info("I'm a button.");
                                    }}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: blue[300] }}>
                                                N
                                            </Avatar>}
                                            title="Trần Đại Nghĩa"
                                            subheader={created_at.toDateString()}
                                        />
                                        <CardMedia
                                            component="img"
                                            image="./images/vespasprint.jpg"
                                        />
                                    </Link>
                                    <CardContent>
                                        <Typography variant="h5"> {title} </Typography>
                                        <Typography variant="body2" color="text.secondary">{description}</Typography>
                                        <CardActions disableSpacing>
                                            <PlaceIcon/>
                                            <Typography variant='caption' color="text.secondary">TP.Hồ Chí Minh</Typography>
                                            <IconButton color='primary' aria-label="add to favorites"> <FavoriteIcon /> </IconButton> 
                                        </CardActions>
                                    </CardContent>
                                </Card>
                        ))}
                    </Grid>
                </Box>
        </Container>
    )
    
}