export function cleanInput(input: string): string[] {
    const removedDoubleSpaces = input.replace(/\s\s+/g, " ");
    const trimmed = removedDoubleSpaces.trim();
    const lower = trimmed.toLowerCase();
    const inputArray = lower.split(" ");
    return inputArray;
}