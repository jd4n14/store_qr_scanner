export default function (f: any, opts: any, next: any) {
  f.get('/test', async function (req: any, res: any){
    // @ts-ignore
    res.send('test')
  })
  next()
}
