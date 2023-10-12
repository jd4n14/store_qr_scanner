import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../../prisma";

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        codigo: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.usuario.findFirst({
        where: {
          codigo: input.codigo,
        },
      });
      if (!user) {
        throw new Error("Código inválido");
      }
      return {
        token: user.codigo,
      };
    }),
});
