import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchLoginUser } from "../../service/authService";
import { useUserStore } from "../../stores/userStore";
import styles from "./authStyle.module.scss";
import { loginSchema, TloginForm } from "../../validation/authSchemas";

const LoginForm = () => {
  const navigate = useNavigate();
  const { checkAuthentication } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      fetchLoginUser(email, password),
    onSuccess: () => {
      checkAuthentication();
      toast.success("Successfully logged in");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: () => {
      toast.error("Неправильні дані входу");
    },
  });

  const { register, handleSubmit } = useForm<TloginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TloginForm> = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  const onError = (errors: FieldErrors<TloginForm>) => {
    Object.values(errors).forEach((error) =>
      toast.error(error?.message ?? "Помилка валідації")
    );
  };

  return (
    <section className="flex flex-col items-center w-full">
      <h1 className="font-medium mb-5">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-5"
      >
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Enter email"
          className={styles.field}
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Enter password"
          className={styles.field}
          required
        />
        <button type="submit" className="inline-block mt-5">
          Login
        </button>
      </form>

      <button className="inline-block mt-5 border-gray-700">
        <Link to="../reg">Not have an account?</Link>
      </button>

      <button className="inline-block mt-5 border-gray-700">
        <Link to="http://localhost:8080/steam/steam">In Steam?</Link>
      </button>
    </section>
  );
};

export default LoginForm;
