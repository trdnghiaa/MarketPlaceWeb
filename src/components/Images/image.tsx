import { FC } from "react";
import { observer } from "mobx-react-lite";

export const Image: FC = observer(() => {
    return <img src={"/logo192.png"}/>
});