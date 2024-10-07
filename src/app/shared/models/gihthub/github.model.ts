export interface UserModel {
    name: string;
    login: string;
    bio: string;
    followers: number;
    following: number;
    location: string;
    avatar_url: string;
}

export interface RepositoryModel {
    name: string;
    stargazers_count: number;
    description: string;
}