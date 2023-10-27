import { FC, useEffect } from "react";
import { BasicLayout } from "../../layouts/common";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import { Post } from "../../components/Posts/posts";



export const Search= observer(() => {
    const { sSearch } = useStore();

    function load() {
        sSearch.init();
    }

    useEffect(() => {
        load();
    }, [sSearch.page, sSearch.size, sSearch.queryText]);
    return (
        <BasicLayout>
           <Post/>
        </BasicLayout>
    );
});