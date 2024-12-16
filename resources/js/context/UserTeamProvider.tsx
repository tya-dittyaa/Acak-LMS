import React, { createContext, useContext, useEffect, useState } from "react";

// Types
import { UserTeam } from "@/types";

// Context
interface UserTeamContextType {
    selectedTeam: UserTeam | null;
    setSelectedTeam: (team: UserTeam) => void;
}

const UserTeamContext = createContext<UserTeamContextType | undefined>(
    undefined
);

// Helper function to manage local storage
const LOCAL_STORAGE_KEY = "selected_team";

function getSavedTeam(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
}

function saveTeam(teamId: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, teamId);
}

function clearSavedTeam(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// Provider Component
interface UserTeamProviderProps {
    teams: UserTeam[];
    children: React.ReactNode;
}

export const UserTeamProvider: React.FC<UserTeamProviderProps> = ({
    teams,
    children,
}) => {
    const [selectedTeam, setSelectedTeamState] = useState<UserTeam | null>(
        null
    );

    useEffect(() => {
        if (teams.length === 0) {
            setSelectedTeamState(null);
            clearSavedTeam();
            return;
        }

        const savedTeamId = getSavedTeam();
        const foundTeam = teams.find((team) => team.id === savedTeamId);

        if (foundTeam) {
            setSelectedTeamState(foundTeam);
        } else {
            const defaultTeam = teams[0];
            setSelectedTeamState(defaultTeam);
            saveTeam(defaultTeam.id);
        }
    }, [teams]);

    const setSelectedTeam = (team: UserTeam) => {
        setSelectedTeamState(team);
        saveTeam(team.id);
    };

    return (
        <UserTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
            {children}
        </UserTeamContext.Provider>
    );
};

// Hook for consuming the context
export function useUserTeam(): UserTeamContextType {
    const context = useContext(UserTeamContext);
    if (context === undefined) {
        throw new Error("useUserTeam must be used within a UserTeamProvider");
    }
    return context;
}
