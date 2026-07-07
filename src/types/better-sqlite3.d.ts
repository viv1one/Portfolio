declare module 'better-sqlite3' {
  class Database {
    constructor(filename: string, options?: unknown);
    exec(sql: string): void;
    prepare(sql: string): any;
    close(): void;
  }

  export default Database;
}
