export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;


    constructor(user: any = {}) {
        if (user) {
            Object.assign(this, {
                id: user.id || null,
                name: user.name || null,
                username: user.username || null,
                email: user.email || null,
                phone: user.phone || null,
                website: user.website || null
            });
        }
    }
}
