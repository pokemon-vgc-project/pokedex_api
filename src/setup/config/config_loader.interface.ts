export interface HttpSetup {
  host: string;
  port: number;
}

export interface ConfigLoaderAdapter {
  http: HttpSetup;
}
