import { useState } from 'react'
import ceoImg from '../../assets/images/ceo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:9000'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/register/`,
        form,
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.status === 201) {
        // register sukses
        navigate('/')
      } else {
        setError('Register gagal: ' + (res.data.message || 'Unknown error'))
      }
    } catch (err) {
      console.error(err)
      // Jika ada detail error dari DRF
      if (err.response?.data) {
        const msgs = Object.entries(err.response.data)
          .map(([field, msgs]) => `${field}: ${msgs}`)
          .join('\n')
        setError(msgs)
      } else {
        setError('Register gagal. Cek console untuk detail.')
      }
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
          onSubmit={handleSubmit}
          className="absolute right-0 top-0 flex h-full w-1/2 flex-col items-center justify-center gap-6 bg-white p-10 shadow-2xl shadow-blue-400"
        >
          <h1 className="text-[40px] font-bold">Register</h1>

          <div className="flex w-full flex-col gap-4 font-bold">
            {['username','email','password'].map(name => (
              <label key={name} className="flex flex-col">
                {name.charAt(0).toUpperCase() + name.slice(1)}
                <input
                  type={name === 'password' ? 'password' : (name === 'email' ? 'email' : 'text')}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="mt-1 h-[35px] w-full rounded-lg border border-slate-400 px-2"
                  required
                />
              </label>
            ))}
          </div>

          {error && (
            <pre className="text-sm text-red-500 whitespace-pre-wrap text-center">
              {error}
            </pre>
          )}

          <div className="flex w-full justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-2xl bg-gray-300 px-5 py-2 font-bold text-gray-700 hover:bg-gray-400"
              disabled={loading}
            >
              Back to Login
            </button>
            <button
              type="submit"
              className={`rounded-2xl px-5 py-2 font-bold text-white ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-400 hover:bg-purple-500'
              }`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
