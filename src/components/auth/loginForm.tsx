import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './authStyle.module.scss'

function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="container flex flex-col items-center">
        <h1 className='font-medium mb-5'>Login</h1>
      <form action="" method="POST" className='flex flex-col gap-5'>
        <input
          placeholder="Enter email"
          className={styles.field}
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
        />
         <input
          placeholder="Enter password"
          className={styles.field}
          onChange={(e)=> setPassword(e.target.value)}
          value={password}

        />
        <button className="inline-block mt-5">Sumbit</button>
      </form>
      <button className="inline-block mt-5 border-gray-700">
          <Link to="/reg">not account</Link>
        </button>
    </section>
  );
}

export default LoginForm;
