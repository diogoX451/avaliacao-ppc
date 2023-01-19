import Pontos from "./Pontos";

export default class Empresa {
  constructor(
    public nome: string,
    public cnpj: string,
    public latitude: number,
    public longitude: number,
    public pontos: number
  ) {}

  indicacao(): void {
    this.pontos += 10;
  }
}
