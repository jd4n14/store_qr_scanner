import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../../prisma";

export const unidadRouter = router({
  lista: protectedProcedure.query(async ({ ctx }) => {
    const unidades = await prisma.unidad.findMany({
      where: {
        eliminada: null
      }
    });
    return unidades;
  }),
  crear: protectedProcedure
    .input(
      z.object({
        nombre: z.string(),
        codigo: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const unidad = await prisma.unidad.create({
        data: {
          nombre: input.nombre,
          codigo: input.codigo,
        },
      });
      return unidad;
    }),
  eliminar: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    const unidad = await prisma.unidad.update({
      where: {
        id: input,
      },
      data: {
        eliminada: new Date(),
      }
    });
    return unidad;
  }),
});
