import * as React from 'react';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { observer } from "mobx-react-lite";
import { theme, TRANSLATE_TERMS } from "src/utils";
import { Close } from "@mui/icons-material";
import { useStore } from "src/stores";
import { useDebounce } from "src/utils/useBounce";
import { Backdrop, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Suggestion } from "src/stores/SearchStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { NestedMenu } from "src/components/Navbar/NestedMenu";
import { Category } from "src/models";


const CustomPaper = styled(Paper)(({}) => ({
    "&": {
        position: "absolute",
        zIndex: theme.zIndex.modal,
        maxHeight: "50vh",
        overflowX: "hidden",
    }
}))

const LinkItem: FC<{item: Suggestion}> = observer(({ item }) => {
    const { sSearch } = useStore();
    return <Link to={item.url} onClick={() => {
        sSearch.set_suggestion([]);
        sSearch.set_query("");
    }}>
        <Typography sx={{ p: 2 }} color={grey[800]} dangerouslySetInnerHTML={{ __html: item.title }} />
    </Link>
})

export const SearchInput: FC<{}> = observer(({}) => {
    const { sSearch, sCategories } = useStore();
    const [domRect, setDomRect] = useState<DOMRect | null>(null);
    const ref = useRef<HTMLFormElement>(null);
    const navigation = useNavigate();
    let location = useLocation();

    const debounceValue = useDebounce(sSearch.query, 500);

    useEffect(() => {
        if (ref.current) {
            setDomRect(ref.current.getBoundingClientRect());
        }
        window.onblur = () => {
            // sSearch.set_suggestion([]);
        }
    }, []);

    useEffect(() => {
        sSearch.getSuggestion();
    }, [debounceValue]);

    useEffect(() => {
        sSearch.set_openSuggestion(false);
    }, [location])

    const clearHandle = () => {
        sSearch.set_query("");
        sSearch.set_suggestion([]);
        sSearch.set_openSuggestion(false);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        sSearch.set_query(value);
    }

    const backdropClose = () => {
        sSearch.set_suggestion([]);
        sSearch.set_openSuggestion(false);
    };

    return <><Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar + 1 }}
        open={sSearch.openSuggestion}
        onClick={backdropClose}
    >
    </Backdrop>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', position: "relative", zIndex: theme.zIndex.appBar + 2 }}
            ref={ref}
            action={"/search?query=" + sSearch.query}
            onSubmit={(e) => {
                navigation("/search?query=" + sSearch.query);
                e.preventDefault();
                return false;
            }}
        >
            <NestedMenu data={sCategories.treeViewData} height={sCategories.maxHeightTree} clickHandle={(data) => {
                navigation(`/search?category=${data._id}`);
            }} category={new Category()} />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                onChange={onChange}
                onFocus={() => {
                    sSearch.set_openSuggestion(true);
                }}
                value={sSearch.query}
                placeholder={TRANSLATE_TERMS.SEARCH_POST_PLACEHOLDER}
                inputProps={{ 'aria-label': TRANSLATE_TERMS.SEARCH_POST_PLACEHOLDER }}
            />
            {sSearch.query && <IconButton sx={{ p: '10px' }} onClick={clearHandle}>
                <Close />
            </IconButton>}
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <CustomPaper
                elevation={6}
                sx={{ display: sSearch.openSuggestion ? "block" : "none", top: (domRect?.bottom || 0) - 20, left: 0, right: 0 }}
            >
                {sSearch.suggestion.map(e => <LinkItem item={e} key={e.title} />)}
                {sSearch.suggestion.length == 0 &&
                    <Typography textAlign={"center"}>{TRANSLATE_TERMS.NO_SUGGESTION_RESULT}</Typography>}
            </CustomPaper>
        </Paper>
    </>
});