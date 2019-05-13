export declare class DockerMachine {
    private options;
    constructor(options?: Options);
    command(command: string, callback?: (err: any, data: any) => void): Promise<any>;
}
export declare class Options {
    private keyValueObject;
    currentWorkingDirectory: string;
    constructor(keyValueObject?: {}, currentWorkingDirectory?: string);
    toParams(): string;
}
