declare export const any: Symbol;

declare export class MatchContext<T> {
    constructor(target: <T>): this;
    case(value: Partial<T>, callback: (value: T) => void): this;
    case(checker: (value: T) => (T extends object ? (Partial<T> | boolean) : boolean), callback: (value: T) => void): this;
    default(callback: (value: T) => void): void;
    test(value: Partial<T>): boolean;
    test(checker: (value: T) => (T extends object ? (Partial<T> | boolean) : boolean)): boolean;
}

declare export function match<T>(target: T): MatchContext<T>;
export default match;