const { APP_NAME } = process.env;

function mappedMessage(message: string, mapped?: object) {
    if (!mapped) return message;

    // @ts-ignore
    let matches = [...message.matchAll(/(?<={)(.*?)(?=})/g)];

    for (let i of matches) {
        const value = mapped[i[0]];
        message = message.replace(`{${i[0]}}`, value != undefined || value != null ? value : "");
    }
    return message;
}

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
    UPDATED_CATEGORY_SUCCESSFUL: "Chỉnh sửa danh mục thành công",
    DELETED_CATEGORY_SUCCESSFUL: "Xóa danh mục thành công",
    CATEGORY_ID_INVALID: "Danh mục không khả dụng!",
    MISS_CATEGORY_NAME: "Vui lòng nhập tên danh mục!",
    MISS_ADVANCE_OPTION_TITLE: "Vui lòng nhập tên tùy chọn \"{index}\"!",
    MISS_FIELDS_ADVANCE_OPTION: "Các Tùy chọn bổ sung phải có ít nhất 1 thuộc tính!",
    MISS_FIELD_NAME: "Vui lòng nhập tên thuộc tính {path}!",
    MISS_ENUM_OPTION_FIELD: "{path} phải có ít nhất 2 tùy chọn!",
    MISS_CATEGORY_ICON: "Vui lòng chọn icon cho danh mục!",
    CATEGORY_PARENT_IS_THIS: "Bạn không thể chọn danh mục cha bằng chính nó!",
    DUPLICATE_OPTION_REMOVED: "Tùy chọn bị trùng lặp đã được gỡ bỏ!",
    //
    SEEN_NOTIFICATION_SUCCESS: "Đánh dấu đã đọc thành công",
    //
    ENTER_POST_TITLE: "Vui lòng nhập tiêu đề tin đăng!",
    ENTER_POST_DESCRIPTION: "Vui lòng nhập mô tả tin đăng!",
    REQUIRED_FIELD_IS_EMPTY: "Vui lòng {label_type} giá trị cho {path}!",
    REQUIRED_FIELD_WITH_FIELD: "{requiredFieldValue} Bắt buộc {label_type} giá trị cho {path}!",
    LABEL_VALUE_TEXT: "{label} {value}",
    REQUIRED_IMAGE_FOR_POST: "Tin đăng bắt buộc phải có hình ảnh!",

    MIN_PRICE_GREATER_THAN_MAX_PRICE: "Giá thấp nhất lớn hơn giá cao nhất",
    MIN_IMAGE_GREATER_THAN_MAX_IMAGE: "Số lượng hình ảnh chênh lệch",
    IMAGE_LESS: "Cần phải ít nhất <b>{min}</b> hình cho tin đăng thuộc doanh mục <b>{categoryName}</b>!",
    SHOW_PHONE_REQUIRE_LOGGED: "Bạn cần phải đăng nhập để xem số điện thoại người bán!",

    get: function (err: string | unknown, arg?: object) {
        let message: string = "";
        if (err instanceof Error) {
            message = err.message
        } else if (typeof err == "string") {
            message = err
        } else {
            console.warn(err);
        }
        return this[message] ? mappedMessage(this[message], arg) : message;
    }
};


export const TRANSLATE_TERMS = {
    OPEN_NOTIFICATION: "Mở thông báo",
    OPEN_SETTINGS: "Mở cài đặt",
    NOTIFICATION: "Thông báo",
    GO_TO_NOTIFICATION_PAGE: "Đi tới trang thông báo",
    SEEN_ALL_NOTIFICATION: "Đánh dấu đã đọc tất cả",

    CREATE_POST: "Tạo Tin",
    DESCRIPTION_PLACEHOLDER: "Viết mô tả bài đăng tại đây...",
    DROPZONE_PLACEHOLDER: "Đăng từ {min} đến {max} tấm hình",

    LOGIN_TEXT: "Đăng Nhập",
    SIGNUP_TEXT: "Đăng Ký",
    TITLE_POST_TEXT: "Tiêu đề bài đăng",
    TITLE_DESCRIPTION_POST_TEXT: "Tiêu đề và mô tả bài đăng",
    DESCRIPTION_POST_TEXT: "Mô tả chi tiết",
    POST_TEXT: "ĐĂNG TIN",
    EDIT_PROFILE: "Chỉnh sử hồ sơ",
    LOG_OUT: "Đăng xuất",
    BACK_BUTTON: "Quay lại",
    CHANGE_PASSWORD_TEXT: "Đổi mật khẩu",
    OLD_PASSWORD_TEXT: "Mật khẩu cũ",
    NEW_PASSWORD_TEXT: "Mật khẩu mới",
    CONFIRM_PASSWORD_TEXT: "Xác nhận lại mật khẩu",
    PERSONAL_INFORMATION: "Thông tin cá nhân",
    FIRST_NAME: "Họ và tên đệm",
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
    ADD: "Thêm",
    ENTER_CATEGORY_NAME: "Tên Danh Mục",
    FILTER_ICON: "Lọc Biểu Tượng...",
    CATEGORY_MANAGEMENT_TEXT: "Quản Lý Danh Mục",
    DELETE: "Xóa",
    EDIT: "Sửa",
    ACCOUNT: "Tài Khoản",
    CHAT: "Trò Chuyện",
    POST: "Tin Đăng",
    ALL: "Tất cả",
    CREATE_CATEGORY: "Tạo Danh Mục",
    CHOOSE_CATEGORY_PLACEHOLDER: "Chọn Danh mục",
    CATEGORY_CATEGORY_BASIC_INFO: "Thông tin cơ bản",
    CATEGORY_ADVANCE_INFO: "Bổ sung",
    ADD_FIELD_BUTTON_TEXT: "Thêm Trường dữ liệu",
    ADD_FIELD_TEXT: "Thuộc tính",
    FIELD_NAME_LABEL: "Tên thuộc tính (không được viết khoảng trắng và ký tự đặc biệt)",
    FIELD_TYPE_LABEL: "Kiểu thuộc tính",
    ADD_SELECT_OPTION_FIELD_LABEL: "Thêm tùy chọn",
    TEXT: "Văn bản",
    OPTION: "Lựa chọn",
    CURRENCY: "Tiền tệ",
    CHECKBOX: "Hộp kiểm tra",
    YEAR: "Năm",
    DROPDOWN: "Thả xuống",
    FIELD_NAME_DESCRIPTION: "Đây là nội dung được hiển thị trên trang web",
    FIELD_TYPE_DESCRIPTION: "Quyết định kiểu nhập liệu cho thuộc tính này lúc tạo tin đăng",
    CHOOSE_CATEGORY_CREATE_PLACEHOLDER: "Chọn danh mục cha (mặc định chọn ROOT)",
    TITLE_OPTION_TEXT: "Tên danh mục",
    ADD_ADVANCE_OPTION_TEXT: "Thêm tùy chọn bổ sung",
    ADD_OPTION_TEXT: "Bổ sung",
    CREATE_CATEGORY_DESCRIPTION_DETAIL_MESSAGE: "*Mặc định đã có trường giá bán cho người dùng nhập",
    TEXT_TYPE_LABEL: "Kiểu của bộ nhập",
    LABEL_NAME_LABEL: "Nhãn hiển thị (tên hiển thị thuộc tính)",
    FIELDS_OF_OPTION: "Các trường dữ liệu",
    REFERENCE_SWITCH_TEXT: "Ràng buộc tới trường dữ liệu (tên thuộc tính)",
    REFERENCE_LABEL_TEXT: "Chọn ràng buộc tới thuộc tính",
    REFERENCE_NONE_TEXT: "Không có",
    DELETE_CATEGORY_DESCRIPTION: "Bạn có chắc rằng muốn xóa danh mục <b>{name}</b>",
    DELETE_CATEGORY_DESCRIPTION_WITH_CHILDREN: "Bạn có chắc rằng muốn xóa danh mục <b>{name}</b>, danh mục con {child}",
    DELETE_CATEGORY_QUESTION_TEXT: "Xóa Danh Mục",
    REQUIRED_TEXT_LABEL: "Bắt buộc",
    REQUIRED_WITH_OPTION_FIELD_TEXT_LABEL: "Bắt buộc với lựa chọn của trường dữ liệu khác",
    ADVANCE_FIELD_OPTION_TEXT: "Tùy Chọn Nâng Cao",
    DEPENDS_SWITCH_TEXT: "Phụ thuộc (Trường dữ liệu này sẽ hiển thị nếu giá trị của cài đặt được chọn)",
    REQUIRED_ALERT_TEXT: "* Thuộc tính này bắt buộc phải có!",
    REQUIRED_FIELD_ALERT_TEXT: "*Thuộc tính này sẽ trở nên bắt buộc nếu chọn vào thuộc tính và giá trị đã được cài đặt ở trên.",
    ONE_QUARTER: "4 Cột",
    ONE_THIRD: "3 Cột",
    HALF: "6 Cột",
    FULL: "Toàn Dòng",
    COLUMN_LABEL_TEXT: "Số Cột",
    STRING: "Chữ",
    NUMBER: "Kiểu Số",
    NO_OPTION_TEXT: "Không có lựa chọn nào",
    TITLE_LENGTH: "{length}/{max_length} ký tự",
    MIN_PRICE_TEXT: "Giá thấp nhất của doanh mục",
    MAX_PRICE_TEXT: "Giá cao nhất của doanh mục",
    MIN_IMAGE_TEXT: "ít nhất (Hình ảnh)",
    MAX_IMAGE_TEXT: "nhiều nhất (Hình ảnh)",
    PRODUCT_PRICE: "Giá bán",
    NOT_FOUND_POST: "Oops! Tin đăng không tồn tại",
    ADDRESS_DETAIL_TEXT: "Số nhà, tên đường",
    CITY_ADDRESS_TEXT: "Tỉnh, Thành Phố",
    ADDRESS_DESTRICT_TEXT: "Quận, Huyện",
    ADDRESS_WARDS_TEXT: "Phường, Xã",
    JUST_VISITED: "🟢 Vừa mới truy cập",
    HOURS_VISITED: "Truy cập {hours} giờ trước",
    MINUTES_VISITED: "Truy cập {munites} phút trước",
    DISPLAY_PHONE_BUTTON: "Bấm để hiện số điện thoại",
    JUST_POSTED: "Vừa xong",
    HOURS_POSTED: "{hours} giờ trước",
    DAYS_POSTED: "{days} ngày trước",
    MINUTES_POSTED: "{minutes} phút trước",
    VERIFIED_TEXT: "Tin đăng đã được kiểm duyệt.",
    SPECIFICATION_TEXT: "Thông số kỹ thuật",
    UNKNOWN_VALUE_FIELD: "Không rõ",
    FAVORITE_TEXT: "Lưu tin",
    UN_FAVORITE_TEXT: "Bỏ lưu tin", SHARE_POST: "Chia sẽ tin đăng", COPY_SUCCESS: "Sao chép thành công đường dẫn tới tin", REASON_RADIO_LABEL: "Lý do từ chối",
    DENY: "Từ Chối",
    APPROVED: "Đã Duyệt",
    PENDING: "Chờ Xét Duyệt",
    SEND: "Gửi",
    DENY_REASON_TEXT: "Lý do từ chối",
    REASON_SUGGESTION: "Gợi ý",
    VERIFY_POST_CONTENT: "Kiểm duyệt nội dung", EXPLORE_CATEGORY: "Khám Phá Danh Mục", POST_FOR_YOU: "Tin Đăng Gần Đây", LOAD_MORE: "Xem thêm",
    DENIED: "Đã bị từ chối",
    APPROVE: "Duyệt",
    SEARCH_POST: "Tìm kiếm bài đăng",
    SEARCH_RESULT_POST_TEXT: "Tìm thấy <b>{count}</b> tin đăng.",
    NO_POSTS: "Không có tin đăng nào!",
    POST_MANAGER_TEXT: "Quản Lý Tin",
    SEARCH_POST_PLACEHOLDER: `Tìm kiếm sản phẩm trên Amazin Place`,
    SIMILAR_TEXT: "Tin đăng tương tự",
    NO_SUGGESTION_RESULT: "không có kết quả nào!",
    AWAIT_APPROVED: "Chờ Xét Duyệt",
    AWAIT_APPROVED_CONTENT: "* Tin đăng trong quá trình xét duyêt trước khi xuất hiện trên <b>Amazin Place</b>. <br> * Quá trình này có thể mất đến 24h",
    CALL_NOW: "Gọi Ngay {phone}", EDIT_POST: "Chỉnh sửa ngay",


    ADD_CATEGORY_PREFIX: (name: string) => `Thêm vào "${name}"`,
    get: function (message: string, arg?: object) {
        return this[message] ? mappedMessage(this[message], arg) : message;
    }
}