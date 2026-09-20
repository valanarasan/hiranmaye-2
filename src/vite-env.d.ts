/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * The /exec URL of the deployed Apps Script web app that records leads.
   * Absent in development, where the form logs to the console instead.
   */
  readonly VITE_LEAD_ENDPOINT?: string;
  /** Optional shared secret the script checks before writing anything. */
  readonly VITE_LEAD_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
