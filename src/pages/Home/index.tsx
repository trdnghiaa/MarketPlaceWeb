import { AdsSlider, Search } from "../../components/user";
import { BasicLayout } from "../../layouts/common";
import { useStore } from "../../stores";
import { UserRole } from "../../models/types";
import { observer } from "mobx-react-lite";
import { Post } from "../../components/Posts/posts";

export const Home = observer(() => {
    const { role } = useStore();
    return (
        <BasicLayout>
            {role == UserRole.USER ? <></> : <></>}
            <Post/>
        </BasicLayout>
    );
});
