// https://stackoverflow.com/questions/2970525/converting-a-string-with-spaces-into-camel-case
export const convertToCamelCase = (a: string): string => {
    return a
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};
