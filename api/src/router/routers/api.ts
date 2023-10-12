import { publicProcedure, router } from '../trpc';

export const apiRouter = router({
  version: publicProcedure.query(() => {
    return { version: '0.42.0' };
  }),
});
