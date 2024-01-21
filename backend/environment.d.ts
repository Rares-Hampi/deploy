declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
      NODE_ENV: "dev" | "prod";
      SMTP_PORT: number;
    }
  }
}

export { };
