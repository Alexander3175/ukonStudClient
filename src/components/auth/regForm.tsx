import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCreateUser } from "../../service/authService";
import styles from "./authStyle.module.scss";
import { regSchema, TregForm } from "../../validation/authSchemas";

function RegForm() {
  const { mutate } = useMutation({
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => fetchCreateUser(username, email, password),
    onSuccess: () => toast.success("Успішно створенно акаунт!"),
    onError: () => toast.error("Помилка під час реєстрації"),
  });

  const { register, handleSubmit } = useForm<TregForm>({
    resolver: zodResolver(regSchema),
  });
  const onSubmit: SubmitHandler<TregForm> = (data) => {
    mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };
  const onError = (errors: FieldErrors<TregForm>) => {
    Object.values(errors).forEach((error) => {
      toast.error(error?.message || "Помилка валідації");
    });
  };
  return (
    <section className="flex flex-col items-center">
      <h1 className="font-medium mb-5">Registration</h1>
      <form
        action=""
        method="POST"
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          {...register("username")}
          type="text"
          autoComplete="username"
          placeholder="Введіть ім’я"
          className={styles.field}
          required
        />
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Введіть email"
          className={styles.field}
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Введіть пароль"
          className={styles.field}
          required
        />
        <button className="inline-block mt-5">Submit</button>
      </form>

      <button className="inline-block mt-5 border-gray-700">
        <Link to="../login">In account</Link>
      </button>
    </section>
  );
}
export default RegForm;
