import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import LoginForm from './login-form'

const Login = () => {
  const navigate = useNavigate();
  const handleClick =()=>{
    navigate('/Signup')
  }
  return (
    <div
      className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 -z-10'>
      </div>
      <Card className='z-10 w-full border-none shadow-md sm:max-w-lg'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='space-y-2'>
            <CardTitle className='text-3xl font-bold tracking-tight'>Welcome Back</CardTitle>
            <CardDescription className='text-base'>Sign in to continue to AlgoFlow</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <LoginForm />
          
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-card px-2 text-muted-foreground'>Or</span>
            </div>
          </div>

          <p className='text-sm text-center text-muted-foreground'>
            Don't have an account?{' '}
            <button 
              onClick={handleClick} 
              className='font-medium text-primary hover:underline'
            >
              Sign up
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login
