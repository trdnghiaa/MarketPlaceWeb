import { FC, ReactElement, useEffect } from "react";
import { setTitle } from "../utils";

export const PageMiddle: FC<{child: ReactElement, name: string}> = ({ child, name }) => {
    useEffect(() => {
        setTitle(name);
    },[])

    return child;
}