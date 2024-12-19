interface ICreateTeam {
    name: string;
    description: string | null;
    icon: File | null;
}

interface ITeam {
    id: string;
    name: string;
    code: string;
    description?: string;
    icon?: string;
}

interface IUserTeam {
    id: string;
    name: string;
    avatar?: string;
    email: string;
    role: string;
}

interface IUserRole {
    id: string;
    name: string;
}

interface ITeamList extends ITeam {
    members: IUserTeam[];
}
