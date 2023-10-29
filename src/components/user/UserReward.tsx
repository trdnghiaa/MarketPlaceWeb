import { FC, Fragment } from "react";
import { Card, CardActions, CardContent, Paper, Typography, } from "@mui/material";
import { useStore } from "src/stores";


export const UserReward: FC<{reward: number}> = ({ reward }) => {
    const { sProfile } = useStore();
    return (
        <Paper elevation={8} style={{ marginTop: "2rem" }}>
            <Card variant="outlined">
                <Fragment>
                    <CardContent>
                        <h2>Điểm thưởng hiện có</h2>
                        <Typography variant="h2" component="div">
                            {reward}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Trị giá {reward} VND
                        </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Fragment>
            </Card>
        </Paper>
    );
};
