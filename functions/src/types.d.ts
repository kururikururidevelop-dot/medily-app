declare module 'firebase-frameworks/next' {
  export function getApp(): Promise<(req: any, res: any) => any>;
}
