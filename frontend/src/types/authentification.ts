export type AuthState = {
    user: User | null;
    token: string | null;

    setUser: (user: User) => void;
    setToken: (token: string, role: UserRole) => void;
    logout: () => void;
};

export type User = {
    idUser: number;
    name: string;
    email: string;
    role: UserRole;
};

export type UserRole = "admin" | "organisateur" | "participant" | "intervenant";
