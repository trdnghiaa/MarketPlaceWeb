import { DetailPost } from "../../components/Detail";
import { Post } from "../../components/Posts/posts";
import { BasicLayout } from "../../layouts/common";
import { observer } from "mobx-react-lite";



export const Detail = observer(() => {
    return (
        <BasicLayout>
            <>
                <DetailPost/>
            </>
        </BasicLayout>
    );
});