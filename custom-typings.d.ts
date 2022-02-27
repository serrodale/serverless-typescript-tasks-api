declare namespace Express {
  export interface Application {
    namespace: (namespace: string, definitions: () => void) => void;
  }
}