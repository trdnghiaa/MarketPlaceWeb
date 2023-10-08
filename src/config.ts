export const PAGE_SIZE_DEFAULT: number = 10;

export const PAGINATION_SIZE_LIST: number[] = [5, 10, 20, 30, 50];

export const EDITOR_CONFIG = {
    modules: {
        // imageResize: {
        //     displaySize: true,
        // },
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "code-block"],
            ["clean"],
        ],
    },
    formats: [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "code-block",
    ],
};
