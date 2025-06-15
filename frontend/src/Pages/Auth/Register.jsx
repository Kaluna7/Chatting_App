import ceoImg from '../../assets/images/ceo.png'
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    }



  return (
    <div className="flex flex-row h-screen justify-center items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#525252] via-[#a3a3a3] to-[#e5e5e5]">
      <div className="shadow-2xl shadow-neutral-300/100 w-[90%] h-[90%] relative overflow-hidden rounded-2xl bg-gradient-to-r from-transparent via-transparent to-blue-200">
        <img 
          src={ceoImg} 
          className="absolute left-0 top-0 h-full w-1/2 object-cover" 
          alt="CEO"
        />
        <div className="absolute right-0 top-0 w-1/2 h-full flex flex-row p-10">
          <div className='flex flex-col w-full rounded-2xl items-center justify-center gap-6 bg-white shadow-2xl shadow-blue-400/100'>
            <h1 className='font-bold text-[40px]'>Register</h1>
            <section className='flex flex-col gap-6 font-bold'>
                 <label>
                    Name <br/>
                    <input className='border-1 rounded-lg h-[35px] w-[300px] border-slate-400/100' />
                </label>
                <label>
                    Email <br/>
                    <input className='border-1 rounded-lg h-[35px] w-[300px] border-slate-400/100' />
                </label>
                 <label>
                    Password <br/>
                    <input className='border-1 rounded-lg h-[35px] w-[300px] border-slate-400/100' />
                </label>
            </section>
            <a href='' className='bg-purple-400 rounded-2xl p-2 px-5 font-bold text-white'>Register</a>
            <div className="flex flex-col text-center gap-5">
                <p>Already have an account ?</p>
                <a onClick={handleLogin} className='hover:text-blue-500 cursor-pointer'>Login</a>    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

