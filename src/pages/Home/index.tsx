import { BasicLayout } from "src/layouts/common";
import { useStore } from "src/stores";
import { UserRole } from "src/models/types";
import { observer } from "mobx-react-lite";
import { UserHome } from "src/pages/Home/UserHome";


export const Home = observer(() => {
    const { role } = useStore();
    return (
        <BasicLayout>
            {role == UserRole.USER ? <UserHome /> : <></>}

        </BasicLayout>
    );
});
