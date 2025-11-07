// This file is explicitly for declaring the shape of the command objects

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}