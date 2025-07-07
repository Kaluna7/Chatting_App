import { useState } from 'react'
import ceoImg from '../../assets/images/ceo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:9000'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegisterNav = () => navigate('/register')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login/`, {
        username,
        password
      })

      // simpan token ke localStorage kalau backend pakai JWT
      if (res.data.access) {
        localStorage.setItem('accessToken', res.data.access)
      }

      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || 'Login gagal. Cek username & password.'
      setError(msg)
    } finally {
      setLoading(false)
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
              Username
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
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
            <p className="text-sm text-red-500 text-center whitespace-pre-wrap">{error}</p>
          )}

          <div className="flex w-full justify-between mt-4">
            <button
              type="button"
              onClick={handleRegisterNav}
              className="rounded-2xl bg-purple-400 px-5 py-2 font-bold text-white hover:bg-purple-500"
              disabled={loading}
            >
              Register
            </button>
            <button
              type="submit"
              className={`rounded-2xl px-5 py-2 font-bold text-white ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-400 hover:bg-blue-500'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
