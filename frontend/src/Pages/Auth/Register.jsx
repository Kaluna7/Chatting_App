import { useState } from 'react'
import ceoImg from '../../assets/images/ceo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await axios.post('http://127.0.0.1:9000/api/auth/register/', {
        username: form.username,
        email: form.email,
        password: form.password,
      })
      // setelah register sukses, arahkan ke login
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Register gagal. Pastikan semua field terisi dengan benar.')
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
          onSubmit={handleSubmit}
          className="absolute right-0 top-0 flex h-full w-1/2 flex-col items-center justify-center gap-6 bg-white p-10 shadow-2xl shadow-blue-400"
        >
          <h1 className="text-[40px] font-bold">Register</h1>

          <div className="flex w-full flex-col gap-4 font-bold">
            <label className="flex flex-col">
              Name
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="mt-1 h-[35px] w-full rounded-lg border border-slate-400 px-2"
                required
              />
            </label>

            <label className="flex flex-col">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 h-[35px] w-full rounded-lg border border-slate-400 px-2"
                required
              />
            </label>

            <label className="flex flex-col">
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 h-[35px] w-full rounded-lg border border-slate-400 px-2"
                required
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex w-full justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-2xl bg-gray-300 px-5 py-2 font-bold text-gray-700 hover:bg-gray-400"
            >
              Back to Login
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-purple-400 px-5 py-2 font-bold text-white hover:bg-purple-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
