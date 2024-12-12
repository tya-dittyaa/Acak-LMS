export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar: string;
}

export interface UserTeam {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    role: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        teams: UserTeam[];
    };
};
