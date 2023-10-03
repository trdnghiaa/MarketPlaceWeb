export const MESSAGE_TERMS = {
    // TERM
    NOT_ALLOW_ACCESS_PAGE: "User Role Not Allowed Access Page!",
    DELETED_USER_SUCCESS: "Xóa người dùng thành công",
    // VALIDATE
    LOGIN_INVALID: "Please Enter Info!",
    USER_PASS_NOT_CORRECT: "Tài khoản, mật khẩu không đúng!",
    UPDATE_USER_SUCCESS: "Cập nhật tài khoản thành công",
    PERMISSION_DENIED: "Bạn không có quyền truy cập!",
    NO_DIALOG_EXISTED: "Xảy ra vấn đề về hiển thị Dialog!",

    //
    DELETE_USER_QUESTION: "Bạn có chắc muốn xóa tài khoản {user}?",
    DELETE_USER_DESCRIPTION: "Hãy cân nhắc trước khi muốn xóa tài khoản để tránh nhầm lẫn. Xin cảm ơn",
    get: function (err: string) {
        return this[err] ? this[err] : err;
    }
};
