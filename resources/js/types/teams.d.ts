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

interface ITeamList extends ITeam {
    members: IUserTeam[];
}
