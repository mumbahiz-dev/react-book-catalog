import React from 'react';
import './App.css'
import { SignInReqDto } from './dtos/SignInReqDto';
import { AuthService } from './service/AuthService';
import { SignInResDto } from './dtos/SignInResDto';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const doSignin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto: SignInReqDto = {
      username: event.target.username.value,
      password: event.target.password.value
    };

    const response: SignInResDto = await AuthService.signin(dto);
    console.log(response);

  
    navigate('/books');
  }

  return (
    <main className='container h-100'>
      <div className='row h-100 align-items-center justify-content-center'>
        <div className='col-6'>
          <form onSubmit={doSignin}>
          <div className='card'>
            <div className='card-body'>
                <h1 className='card-title'>Sign in to your account</h1>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>Username</label>
                  <input id='username' name='username' className='form-control' placeholder='input username' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input id='password' name='password' className='form-control' type='password' placeholder='input password' />
                </div>
                <div className='mb-3'>
                  <button type="submit" className='btn btn-primary'>Sign in</button>
                </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App
