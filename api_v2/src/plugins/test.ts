export default function (f: any, opts: any, next: any) {
  f.get('/test', async function (req: any, res: any){
    // @ts-ignore
    console.log({ this: f.mongo })
    res.send('test')
  })
  next()
}
