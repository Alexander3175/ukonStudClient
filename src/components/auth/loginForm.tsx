import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './authStyle.module.scss';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type TLoginForm = z.infer<typeof loginSchema>

function LoginForm() {
  const { register, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema)
  });
  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(JSON.stringify(data))
        resolve("success")
        reject("Error login")
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
      <h1 className='font-medium mb-5'>Login</h1>
      <form action="" method="POST" className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
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
        <button className="inline-block mt-5">Submit</button>
      </form>
      <button className="inline-block mt-5 border-gray-700">
        <Link to="/reg">not account</Link>
      </button>
    </section>
  );
}
export default LoginForm;
