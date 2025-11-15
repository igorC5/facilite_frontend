import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  precoVenda: z.number().min(0, "Preço não pode ser negativo"),
});

export type ProdutoFormData = z.infer<typeof produtoSchema>;
