import { SignUpStore } from "./SignUpStore";
import { SignInStore } from "./SignInStore";
import { AuthorizedStore } from "./AuthorizedStore";
import { observable } from "mobx";
import { ProfileStore } from "./ProfileStore";
import { AccountStore } from "./AccountStore";
import { OrderStore } from "./OrderStore";
import { OrderDetailStore } from "./OrderDetailStore";
import { NewAccountStore } from "./NewAccountStore";
import { DialogStore } from "./DialogStore";
import { NotificationWebStore } from "./NotificationWebStore";
import { NewPostStore } from "./NewPostStore";
import { CategoryStore } from "./CategoryStore";
import { iconList } from "src/components/IconPopoverSelect/icon_db";
import { CategoryEditorStore } from "./CategoryEditorStore";
import { PostStore } from "src/stores/PostStore";
import { CountriesStore } from "src/stores/CountriesStore";
import { HomeStore } from "src/stores/HomeStore";
import { PostManagerStore } from "src/stores/PostManagerStore";
import { MyPostStore } from "src/stores/MyPostStore";
import { SavedPostStore } from "src/stores/SavedPostStore";
import { SearchStore } from "src/stores/SearchStore";

export class Store extends AuthorizedStore {
    @observable
    sSignIn = new SignInStore();
    @observable
    sSignUp = new SignUpStore();
    @observable
    sProfile = new ProfileStore();
    @observable
    sAccount = new AccountStore();
    @observable
    sOrder = new OrderStore();
    @observable
    sOrderDetail = new OrderDetailStore();
    @observable
    sNewAccount = new NewAccountStore(this);
    @observable
    sDialog = new DialogStore();
    @observable
    sNotificationWeb = new NotificationWebStore();
    @observable
    sNewPost = new NewPostStore();
    @observable
    sCategories = new CategoryStore();
    @observable
    sHome = new HomeStore();

    @observable
    sPost = new PostStore(this);

    @observable
    sPostManager = new PostManagerStore(this);

    @observable
    sMyPost = new MyPostStore();

    @observable
    sSavedPost = new SavedPostStore();

    @observable
    sSearch = new SearchStore(this);

    @observable
    sCountries = new CountriesStore();

    @observable
    sCategoryEditor = new CategoryEditorStore(this);

    @observable iconDB = iconList;
}
