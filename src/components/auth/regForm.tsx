import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { fetchCreateUser } from "../../service/authService";
import styles from "./authStyle.module.scss";
import { useMutation } from "@tanstack/react-query";

const regSchema = z.object({
  username: z.string().min(3).max(15),
  email: z.string().min(3).max(25),
  password: z.string().min(3).max(30),
});

type TregForm = z.infer<typeof regSchema>;

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

  return (
    <section className="container flex flex-col items-center">
      <h1 className="font-medium mb-5">Registraion</h1>
      <form
        action=""
        method="POST"
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("username")}
          placeholder="Enter username"
          className={styles.field}
        />
        <input
          {...register("email")}
          placeholder="Enter email"
          className={styles.field}
        />
        <input
          {...register("password")}
          placeholder="Enter password"
          className={styles.field}
        />
        <button className="inline-block mt-5">Sumbit</button>
      </form>
      <button className="inline-block mt-5 border-gray-700">
        <Link to="../login">In account</Link>
      </button>
    </section>
  );
}
export default RegForm;
