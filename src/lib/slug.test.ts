import { describe, it, expect } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("troca espaços por hífens e deixa minúsculo", () => {
    expect(slugify("Formula Idiomas")).toBe("formula-idiomas");
  });

  it("remove acentos", () => {
    expect(slugify("Educação Física")).toBe("educacao-fisica");
  });

  it("colapsa não-alfanuméricos e apara hífens nas pontas", () => {
    expect(slugify("  API-CEP!!  ")).toBe("api-cep");
  });

  it("lida com pontuação e símbolos", () => {
    expect(slugify("Olá, Mundo!")).toBe("ola-mundo");
  });
});
