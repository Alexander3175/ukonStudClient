import { z } from "zod";

export const regSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Ім'я повинно містити мінімум 3 символи")
    .max(15, "Ім'я занадто довге"),
  email: z
    .string()
    .trim()
    .email("Невірний формат email")
    .max(40, "Email занадто довгий"),
  password: z
    .string()
    .trim()
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .max(30, "Пароль занадто довгий"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Невірний формат email")
    .max(40, "Email занадто довгий"),
  password: z
    .string()
    .trim()
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .max(30, "Пароль занадто довгий"),
});

export type TregForm = z.infer<typeof regSchema>;
export type TloginForm = z.infer<typeof loginSchema>;
