import React, { createContext, useContext, useEffect, useState } from "react";

// Types
import { UserTeam } from "@/types";

// Context
interface UserTeamContextType {
    selectedTeam: UserTeam | null;
    setSelectedTeam: (team: UserTeam | null) => void;
    removeTeam: (teamId: string) => void;
    updateTeam: (newTeam: UserTeam) => void;
}

const UserTeamContext = createContext<UserTeamContextType | undefined>(
    undefined
);

// Helper functions for managing local storage
const LOCAL_STORAGE_TEAMS_KEY = "teams";
const LOCAL_STORAGE_SELECTED_TEAM_KEY = "selected_team";

function getSavedTeams(): UserTeam[] {
    const savedTeams = localStorage.getItem(LOCAL_STORAGE_TEAMS_KEY);
    return savedTeams ? JSON.parse(savedTeams) : [];
}

function saveTeams(teams: UserTeam[]): void {
    localStorage.setItem(LOCAL_STORAGE_TEAMS_KEY, JSON.stringify(teams));
}

function getSavedTeam(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_SELECTED_TEAM_KEY);
}

function saveTeam(teamId: string): void {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_TEAM_KEY, teamId);
}

function clearSavedTeam(): void {
    localStorage.removeItem(LOCAL_STORAGE_SELECTED_TEAM_KEY);
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
    const [currentTeams, setCurrentTeams] = useState<UserTeam[]>([]);

    // Initialize state from props or local storage
    useEffect(() => {
        const savedTeams = getSavedTeams();
        const savedTeamId = getSavedTeam();

        if (teams.length > 0) {
            setCurrentTeams(teams);
            saveTeams(teams);
        } else if (savedTeams.length > 0) {
            setCurrentTeams(savedTeams);
        }

        const foundTeam =
            (teams.length > 0 ? teams : savedTeams).find(
                (team) => team.id === savedTeamId
            ) || null;

        if (foundTeam) {
            setSelectedTeamState(foundTeam);
        } else if (teams.length > 0 || savedTeams.length > 0) {
            const defaultTeam = teams.length > 0 ? teams[0] : savedTeams[0];
            setSelectedTeamState(defaultTeam);
            saveTeam(defaultTeam.id);
        } else {
            setSelectedTeamState(null);
            clearSavedTeam();
        }
    }, [teams]);

    // Update selected team and save in local storage
    const setSelectedTeam = (team: UserTeam | null) => {
        setSelectedTeamState(team);
        if (team) {
            saveTeam(team.id);
        } else {
            clearSavedTeam();
        }
    };

    // Remove a team and update local storage
    const removeTeam = (teamId: string) => {
        const updatedTeams = currentTeams.filter((team) => team.id !== teamId);
        setCurrentTeams(updatedTeams);
        saveTeams(updatedTeams);

        // Update selected team
        if (selectedTeam?.id === teamId) {
            const nextTeam = updatedTeams[0] || null;
            setSelectedTeam(nextTeam);
        }
    };

    // Add a new team and update local storage
    const updateTeam = (newTeam: UserTeam) => {
        const updatedTeams = [...currentTeams, newTeam];
        setCurrentTeams(updatedTeams);
        saveTeams(updatedTeams);
    };

    return (
        <UserTeamContext.Provider
            value={{
                selectedTeam,
                setSelectedTeam,
                removeTeam,
                updateTeam,
            }}
        >
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
