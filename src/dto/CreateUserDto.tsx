export interface CreateUserDto {
    id?: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    role: string,
    searchType: string,
    accessToken?: string;
}

