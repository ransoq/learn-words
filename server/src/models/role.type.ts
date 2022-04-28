export interface IRole {
  name: string;
  estimatedDocumentCount(param: (err: never, count: number) => void): void;
}
