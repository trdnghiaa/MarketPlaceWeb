import { BasicLayout } from "../../layouts/common";
import { useStore } from "@stores";
import { UserRole } from "@models";
import { observer } from "mobx-react-lite";

export const Home = observer(() => {
    const { role } = useStore();
    return (
        <BasicLayout>
            {role == UserRole.USER ? <></> : <></>}
        </BasicLayout>
    );
});
