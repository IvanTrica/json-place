export class Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    userName: string;


    constructor( post: any = {}) {
        if (post) {
            Object.assign(this, {
                userId: post.userId || null,
                id: post.id || null,
                userName: post.userName || null,
                title: post.title || null,
                body: post.body || null
            });
        }
    }
}
