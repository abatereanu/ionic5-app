export class UserRequestModel {
    username: string;
    password: string;
    roles: Array<'ADMIN' | 'BUYER' | 'SELLER'>;
}
