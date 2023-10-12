import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from '../prisma';

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  console.log('createContext');
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await prisma.usuario.findFirst({
        where: {
          codigo: req.headers.authorization,
        },
        include: {
          rol: true
        }
      });
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
