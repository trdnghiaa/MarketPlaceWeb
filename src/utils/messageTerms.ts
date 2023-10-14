export const MESSAGE_TERMS = {
    // TERM
    NOT_ALLOW_ACCESS_PAGE: "User Role Not Allowed Access Page!",
    DELETED_USER_SUCCESS: "Xóa người dùng thành công",
    FILE_TEMP_DELETED: "Xóa tập tin thành công",

    // VALIDATE
    LOGIN_INVALID: "Please Enter Info!",
    USER_PASS_NOT_CORRECT: "Tài khoản, mật khẩu không đúng!",
    UPDATE_USER_SUCCESS: "Cập nhật tài khoản thành công",
    PERMISSION_DENIED: "Bạn không có quyền truy cập!",
    NO_DIALOG_EXISTED: "Xảy ra vấn đề về hiển thị Dialog!",
    ROLE_NOT_VALID: "Quyền hạn này không tồn tại trên website!",
    EMAIL_REGISTED: "Địa chỉ email đã được đăng ký trước đó!",
    PHONE_REGISTED: "Số điện thoại đã được đăng ký trước đó!",
    USER_REGISTED: "Tên đăng nhập đã được đăng ký trước đó!",

    //
    FILE_EMPTY: "Không thể tải lên tệp rỗng",
    FILE_NAME_INVALID: (invalidCharacter: String[]) => `Không thể tải tệp do chứa kí tự: "${invalidCharacter.join('", "')}"`,

    //
    WRONG_CONFIRM_PASS: "Mật khẩu không khớp",
    WRONG_PASS_LENGTH: "Mật khẩu phải tối thiểu 8 ký tự",
    MISS_USER_N_PASS: "Vui lòng nhập đủ tên đăng nhập và mật khẩu",
    WRONG_EMAIL: "Email của bạn không đúng. Vui lòng thử lại",
    WRONG_PHONE: "Số Điện thoại của bạn không đúng. Vui lòng thử lại",
    MISS_PHONE: "Vui lòng điền số điện thoại của bạn",
    MISS_EMAIL: "Vui lòng điền số email của bạn",
    MISS_ADDRESS: "Vui lòng điền địa chỉ của bạn",
    WRONG_BIRTHDAY: "Bạn phải lớn hơn 16 tuổi",
    MISS_FIRST_NAME: "Vui lòng điền tên",
    MISS_LAST_NAME: "Vui lòng điền họ và tên đệm",


    //
    DELETE_USER_QUESTION: "Bạn có chắc muốn xóa tài khoản {user}?",
    DELETE_USER_DESCRIPTION: "Hãy cân nhắc trước khi muốn xóa tài khoản để tránh nhầm lẫn. Xin cảm ơn",
    USER_CREATED_SUCCESSFUL: "Tạo người dùng thành công",

    //
    CATEGORY_INVALID: "Vui lòng nhập đầy đủ thông tin!",
    CREATED_CATEGORY_SUCCESSFUL: "Tạo danh mục thành công",
    DELETED_CATEGORY_SUCCESSFUL: "Xóa danh mục thành công",
    CATEGORY_ID_INVALID: "Danh mục không khả dụng!",

    get: function (err: string) {
        return this[err] ? this[err] : err;
    }
};


export const TRANSLATE_TERMS = {
    OPEN_NOTIFICATION: "Mở thông báo",
    OPEN_SETTINGS: "Mở cài đặt",
    NOTIFICATION: "Thông báo",
    NOTIFICATION_PAGE: "Đi tới trang thông báo",
    SEEN_ALL_NOTIFICATION: "Đánh dấu đã đọc tất cả",

    CREATE_POST: "Tạo Tin",
    DESCRIPTION_PLACEHOLDER: "Viết mô tả bài đăng tại đây...",
    DROPZONE_PLACEHOLDER: "Đẩy hoặc kéo thả file vào đây",

    LOGIN_TEXT: "Đăng Nhập",
    SIGNUP_TEXT: "Đăng Ký",
    TITLE_POST_TEXT: "Tiêu đề bài đăng",
    DESCRIPTION_POST_TEXT: "Mô tả bài đăng",
    POST_TEXT: "ĐĂNG TIN",
    EDIT_PROFILE: "Chỉnh sử hồ sơ",
    LOG_OUT: "Đăng xuất",
    BACK_BUTTON: "Quay lại",
    CHANGE_PASSWORD_TEXT: "Đổi mật khẩu",
    OLD_PASSWORD_TEXT: "Mật khẩu cũ",
    NEW_PASSWORD_TEXT: "Mật khẩu mới",
    CONFIRM_PASSWORD_TEXT: "Xác nhận lại mật khẩu",
    PERSONAL_INFORMATION: "Thông tin cá nhân",
    FRIST_NAME: "Họ và tên đệm",
    LAST_NAME: "Tên",
    GENDER: "Giới Tính",
    FEMALE: "Nữ",
    MALE: "Nam",
    ROLE: "Quyền",
    DATETIME: "Ngày Sinh",
    ADDRESS: "Địa chỉ",
    PHONE_TEXT: "Số điện thoại",
    SAVE_BUTTON: "Lưu",
    CANCEL: "Hủy",
    CREATE_NEW_ACCOUNT: "Tạo tài khoản mới",
    USERNAME_TEXT: "Tên đăng nhập",
    PASSWORD_TEXT: "Mật khẩu",
    NOT_FOUND_PAGE: "Trang này không tồn tại!",
    OOPS_SOMETHING_WRONG: "Oops Xảy Ra Lỗi Rồi",

    ADD_CATEGORY_PREFIX: (name: string) => `Thêm vào "${name}"`,
    ADD: "Thêm",
    ENTER_CATEGORY_NAME: "Tên Danh Mục...",
    FILTER_ICON: "Lọc Biểu Tượng...",
    CATEGORY_MANAGEMENT_TEXT: "Quản Lý Danh Mục",
    DELETE: "Xóa",
    EDIT: "Sửa",
}