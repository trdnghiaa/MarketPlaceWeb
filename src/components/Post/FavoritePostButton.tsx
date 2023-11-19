import { FC } from "react";
import { Post } from "src/models";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export const FavoritePostButton: FC<{onClick: () => void, post: Post}> = observer(({ post, onClick }) => {
    return <IconButton onClick={onClick}
                       color={"error"}
                       component={Tooltip}
                       title={post.favorite ? TRANSLATE_TERMS.UN_FAVORITE_TEXT : TRANSLATE_TERMS.FAVORITE_TEXT}>
        {post.favorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
});