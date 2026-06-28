export default async function handler(req: any, res: any) {
  const { app } = await import('../src/index.js');
  return app(req, res);
}
