import { useState } from 'react'
import ceoImg from '../../assets/images/ceo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegisterNav = () => {
    navigate('/register')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://127.0.0.1:9000/api/auth/login/', {
        username: email,   // atau sesuaikan jika backend pakai field 'email'
        password
      })
      // simpan token
      localStorage.setItem('accessToken', res.data.access)
      // redirect ke dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Login gagal, periksa email & password.')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#525252] via-[#a3a3a3] to-[#e5e5e5]">
      <div className="relative flex w-[90%] h-[90%] overflow-hidden rounded-2xl bg-gradient-to-r from-transparent via-transparent to-blue-200 shadow-2xl shadow-neutral-300">
        <img
          src={ceoImg}
          alt="CEO"
          className="absolute left-0 top-0 h-full w-1/2 object-cover"
        />

        <form
          onSubmit={handleLogin}
          className="absolute right-0 top-0 flex h-full w-1/2 flex-col items-center justify-center gap-6 bg-white p-10 shadow-2xl shadow-blue-400"
        >
          <h1 className="text-[40px] font-bold">Login</h1>

          <div className="flex w-full flex-col gap-4 font-bold">
            <label className="flex flex-col">
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 h-[35px] w-full rounded-lg border border-slate-400 px-2"
                required
              />
            </label>

            <label className="flex flex-col">
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 h-[35px] w-full rounded-lg border border-slate-400 px-2"
                required
              />
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex w-full justify-between mt-4">
            <button
              type="button"
              onClick={handleRegisterNav}
              className="rounded-2xl bg-purple-400 px-5 py-2 font-bold text-white hover:bg-purple-500"
            >
              Register
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-blue-400 px-5 py-2 font-bold text-white hover:bg-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
