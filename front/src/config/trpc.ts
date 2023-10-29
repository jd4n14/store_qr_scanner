import { AppRouter } from '../../../api/src/router/index.ts';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>()