import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import styles from "./authStyle.module.scss";
import { fetchLoginUser } from "../../service/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUserStore } from "../../stores/userStore";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type TLoginForm = z.infer<typeof loginSchema>;

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
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Login failed");
    },
  });

  const { register, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <section className="container flex flex-col items-center">
      <h1 className="font-medium mb-5">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          {...register("email", { required: true })}
          placeholder="Enter email"
          className={styles.field}
        />
        <input
          {...register("password", { required: true })}
          placeholder="Enter password"
          className={styles.field}
        />
        <button type="submit" className="inline-block mt-5">
          Login
        </button>
      </form>

      <button className="inline-block mt-5 border-gray-700">
        <Link to="../reg">Not have an account?</Link>
      </button>
    </section>
  );
};

export default LoginForm;
