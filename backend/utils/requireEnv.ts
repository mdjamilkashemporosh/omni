import type { RequireEnvFn } from "../types/requireEnv";


export const requireEnv: RequireEnvFn = (name) => {
    const value = process.env[name];
    if (!value) {
        console.error(
            `\n🚨 Missing environment variable: "${name}"\n\n` +
            `This variable is required for the application to run.\n` +
            `Please add it to your ".env" file at the project root.\n\n` +
            `Example:\n${name}=your_value_here\n`
        );
        process.exit(1);
    }
    return value;
};