import { FC } from "react";
import { observer } from "mobx-react-lite";
import { stringAvatar, theme } from "src/utils";
import { Avatar, AvatarProps, Box } from "@mui/material";
import { User } from "src/models";

type UserAvatarProps = AvatarProps & {
    user?: User
}

export const UserAvatar: FC<UserAvatarProps> = observer(({ user, ...props }) => {
    return <Box sx={{ margin: theme.spacing(1) }}>
        <Avatar {...(user?.avatar ? { src: user?.avatar } : stringAvatar(user?.fullName || "1"))} {...props} />
    </Box>
});