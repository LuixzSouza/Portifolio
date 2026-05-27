import { describe, it, expect } from "vitest";
import { pickText, pickList } from "./i18n";

describe("pickText", () => {
  it("retorna a própria string quando o valor já é string (fallback)", () => {
    expect(pickText("oi", "pt")).toBe("oi");
    expect(pickText("oi", "en")).toBe("oi");
  });

  it("escolhe o idioma do objeto bilíngue", () => {
    expect(pickText({ pt: "oi", en: "hi" }, "pt")).toBe("oi");
    expect(pickText({ pt: "oi", en: "hi" }, "en")).toBe("hi");
  });
});

describe("pickList", () => {
  it("retorna o próprio array quando já é array (fallback)", () => {
    expect(pickList(["a", "b"], "pt")).toEqual(["a", "b"]);
  });

  it("escolhe a lista do idioma", () => {
    expect(pickList({ pt: ["a"], en: ["b"] }, "en")).toEqual(["b"]);
  });
});
