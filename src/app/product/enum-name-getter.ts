export const getEnumName = <T extends { [key: string]: string }>(
    value: string,
    enumObj: T
): keyof T => {
    const key = (Object.keys(enumObj) as Array<keyof T>).find(
        (key) => enumObj[key] === value
    );

    if (!key) {
        throw new Error(`Value "${value}" does not match any key in the provided enum.`);
    }

    return key;
};