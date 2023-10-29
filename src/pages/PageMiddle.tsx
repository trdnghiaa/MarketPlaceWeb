import { FC, ReactElement, useEffect } from "react";
import { APP_NAME, setTitle } from "src/utils";
import { useParams } from "react-router-dom";

const paramsText = {
    mode: {
        view: "Xem",
        edit: "Chỉnh sửa",
    },
    get: function (key: string, value: string) {
        if (this[key] && this[key][value]) {
            return this[key][value];
        }
        return (value ? value : "");
    }
}
/**
 * PageMiddle is a page when handle set title display on browser for React page
 * @param child - React Component page
 * @param name - title display on browser
 */
export const PageMiddle: FC<{child: ReactElement, name: string}> = ({ child, name }) => {
    const params = useParams();

    useEffect(() => {
        let text = name;

        const paramMapped = name.match(/(?<=:)([a-z])\w+/g) as Array<string> || [];

        for (let value of paramMapped) {
            // @ts-ignore
            text = text.replace(`:${value}`, paramsText.get(value, params[value]));
        }


        setTitle(`${text} - ${APP_NAME}`);
    }, [params])

    return child;
}