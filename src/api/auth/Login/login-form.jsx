import { useState } from 'react'
import { EyeIcon, EyeOffIcon, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState(
    { email: '', password: '', rememberMe: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const loginData = {
      email : formData.email,
      password: formData.password,
    }
    try {
  const response = await axios.post(
    "https://algoflow-backend.onrender.com/api/auth/login",
    loginData
  );

  localStorage.setItem("token", response.data.token);
  
  if (response.data.user.role === "admin") {
    navigate("/Admin");
  } else {
    navigate("/Dashboard");
  }

  setFormData({
    email: "",
    password: "",
    rememberMe: false,
  });
} catch (error) {
  console.error('Login error:', error);
  if (error.response) {
    setError(error.response.data.message || 'Login failed. Please try again.');
  } else if (error.request) {
    setError('Cannot connect to server. Please check your connection.');
  } else {
    setError('An unexpected error occurred. Please try again.');
  }
} finally {
  setLoading(false)
}
  }

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      {/* Error Message */}
      {error && (
        <div className='bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm flex items-start gap-2'>
          <span className='text-lg'>⚠️</span>
          <span className='flex-1'>{error}</span>
        </div>
      )}
      
      {/* Email */}
      <div className='space-y-2'>
        <Label htmlFor='userEmail' className='text-sm font-medium'>
          Email address
        </Label>
        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
          <Input 
            type='email' 
            id='userEmail' 
            placeholder='you@example.com'
            className='pl-10 h-11'
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={loading}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className='space-y-2'>
        <Label htmlFor='password' className='text-sm font-medium'>
          Password
        </Label>
        <div className='relative'>
          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            placeholder='Enter your password'
            className='pl-10 pr-10 h-11'
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            disabled={loading}
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible(!isVisible)}
            className='absolute inset-y-0 right-0 h-11 w-10 hover:bg-transparent'
            disabled={loading}>
            {isVisible ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className='flex items-center justify-between text-sm'>
        <div className='flex items-center gap-2'>
          <Checkbox 
            id='rememberMe' 
            checked={formData.rememberMe}
            onCheckedChange={(checked) => setFormData({...formData, rememberMe: checked})}
            disabled={loading}
          />
          <Label 
            htmlFor='rememberMe' 
            className='font-normal cursor-pointer'
          >
            Remember me
          </Label>
        </div>
        <a href='#' className='font-medium text-primary hover:underline'>
          Forgot password?
        </a>
      </div>

      <Button 
        className='w-full h-11 text-base font-medium' 
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <>
            <span className='animate-spin mr-2'>⏳</span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  )
}

export default LoginForm
