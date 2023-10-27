import { action, observable } from "mobx";
import { Post, EPostStatus} from "../models/Post";
import { makeObservable } from "mobx";
import { User } from "../models";


export class DetailStore{
    @observable post: Post[] = [];

    constructor() {
        makeObservable(this);
    }

    @action init(){
        this.post = [new Post({
            _id: '1',
            title: 'Cần bán VESPA đời mới',
            description: 'Vespa Sprint S 150 đã từng sản xuất nhưng không phải động cơ Iget, động cơ mới này đang được đáp ứng tốt về độ bền, giảm tiêu hao nhiên liệu rất đáng kể so với trước. Thiết kế của dòng Sprint S 150cc giống hoàn toàn với dòng Sprint 125cc, trang bị đầy đủ tất cả công nghệ mới nhất từ dòng Sprint S 125 hiện tại. Sự khác biệt chính là khối động cơ 150cc.',
            createdBy: new User(),
            created_at: new Date(),
            expires: new Date(),
            view: 9999999999999999999999999999999999999999999,
            status: EPostStatus.PENDING,
            images: [],
        })]
    }
}