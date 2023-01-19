import { Response, Router } from "express";

import prisma from "../db/script";
import Pontos from "../model/Pontos";
const router = Router();

router.get("/", async (req, res): Promise<Response> => {
  const buscar = await prisma.empresas.findMany({
    select: {
      id: true,
      nome: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  res.render("index", { buscar });
});

router.post("/cadastro", async (req, res): any => {
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);
  const indicado = parseInt(req.body.indicacao);
  await prisma.empresas
    .create({
      data: {
        nome: req.body.nome,
        cnpj: req.body.cnpj,
        latitude,
        longitude,
      },
    })
    .then(async (empresa) => {
      await prisma.empresas.update({
        where: {
          id: indicado,
        },
        data: {
          pontos: {
            increment: 10,
          },
        },
      });
    });
  return res.status(200).redirect("/");
});

router.get("/coord", async (req: Request, res: Response): any => {
  const coord = await prisma.empresas.findMany({
    select: {
      latitude: true,
      longitude: true,
      nome: true,
      pontos: true,
    },
  });
  res.status(200).send(coord);
});

export default router;
