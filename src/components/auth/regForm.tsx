import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import styles from "./authStyle.module.scss";

const regSchema = z.object({
  name: z.string().min(3).max(10),
  email: z.string().min(3).max(10),
  password: z.string().min(3).max(10)

})

type TregForm = z.infer<typeof regSchema>;

function RegForm() {
  const { register, handleSubmit } = useForm<TregForm>({
    resolver: zodResolver(regSchema)
  })
  const onSubmit: SubmitHandler<TregForm> = (data) => {
      const response = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("account created")
          console.log(JSON.stringify(data))
          reject("Error registration")
        }, 1000)
      })
    toast.promise(response, {
          pending: "waiting",
          success: "successfully",
          error: "failed"
        })
  }

  return (
    <section className="container flex flex-col items-center">
      <h1 className="font-medium mb-5">Registraion</h1>
      <form action="" method="POST" className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          placeholder="Enter name"
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
          <Link to="/login">In account</Link>
        </button>
    </section>
  );
}

export default RegForm;
