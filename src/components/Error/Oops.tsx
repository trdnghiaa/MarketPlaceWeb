import { FC, ReactElement } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import { Backdrop, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { theme, TRANSLATE_TERMS } from "src/utils";

export const Oops: FC<{children: ReactElement}> = ({ children }) => {

    return <Backdrop sx={{ color: '#fff', zIndex: 1 }} open={true}>
        <Grid container direction={"column"} justifyContent={"center"} minHeight={"500px"} alignItems={"center"}
              height={500}>

            <ErrorIcon fontSize={"large"} style={{ margin: theme.spacing(1) }} />
            {children}
            <Link to={"/"} style={{ margin: theme.spacing(1) }}>
                <Button variant="contained">{TRANSLATE_TERMS.BACK_BUTTON}</Button>
            </Link>
        </Grid>
    </Backdrop>
}