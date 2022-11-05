import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {

  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(result => {
        const user = result.user;

        const currentUser = {
          email: user.email
        }
        console.log(currentUser);

        // get jwt token
        fetch('https://y-one-delta.vercel.app/jwt', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentUser)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            // local storage 
            localStorage.setItem('genius-token', data.token);
            navigate(from, { replace: true });
          })


      })
      .catch(error => console.error(error));

  }

  return (
    <div className="hero w-full py-16">
      <div className="hero-content grid gap-10 md:grid-cols-2  flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card  w-full  shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">Login!</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name='email' placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name='password' placeholder="password" className="input input-bordered" required />
              <label className="label">
                <Link to='/' className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6 mb-0">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>

          <div className='px-8 pb-8 mt-0'>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-black"></div>
              <p className="px-3 text-sm dark:bg-text-black">Login with social accounts</p>
              <div className="flex-1 h-px sm:w-16 dark:bg-black"></div>
            </div>
           <SocialLogin></SocialLogin>
            <p className="text-xs text-center sm:px-6 dark:text-black">Don't have an account?
              <Link rel="noopener noreferrer" to='/signup' className="underline dark:text-orange-600"> Sign up</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;