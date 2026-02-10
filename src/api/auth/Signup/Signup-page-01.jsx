import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import SignupForm from './signup-form'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate();
  const handleClickSignup =()=>{
    navigate('/Login')
  }
  return (
    <div
      className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 -z-10'>
      </div>
      <Card className='z-10 w-full border-none shadow-lg sm:max-w-lg'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='space-y-2'>
            <CardTitle className='text-3xl font-bold tracking-tight'>Create Account</CardTitle>
            <CardDescription className='text-base'>Join AlgoFlow and start your journey</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <SignupForm />

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-card px-2 text-muted-foreground'>Or</span>
            </div>
          </div>

          <p className='text-sm text-center text-muted-foreground'>
            Already have an account?{' '}
            <a onClick={handleClickSignup} className='font-medium text-primary hover:underline'>
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup
