import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import LoginForm from './login-form'

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Signup')
  }

  return (
    <div className='relative flex min-h-screen overflow-x-hidden bg-background'>
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className='hidden lg:flex lg:w-1/2 relative bg-muted items-center justify-center p-12'>
        <div className='absolute top-8 left-8'>
          <Button 
            variant='ghost' 
            onClick={() => navigate('/')}
            className='gap-2'
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </div>
        <div className='max-w-md space-y-6'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-primary'>
              <Zap size={28} className='text-primary-foreground' />
            </div>
            <span className='text-3xl font-bold'>AlgoFlow</span>
          </div>
          <h2 className='text-4xl font-bold leading-tight'>
            Continue Your
            <br />
            Learning Journey
          </h2>
          <p className='text-lg text-muted-foreground'>
            Track your progress, solve new challenges, and master algorithms one problem at a time.
          </p>
          <div className='space-y-4 pt-6'>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 rounded-full bg-primary mt-2' />
              <div>
                <p className='font-semibold'>500+ Problems</p>
                <p className='text-sm text-muted-foreground'>Curated from top tech companies</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 rounded-full bg-primary mt-2' />
              <div>
                <p className='font-semibold'>AI-Powered Hints</p>
                <p className='text-sm text-muted-foreground'>Get help without spoilers</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 rounded-full bg-primary mt-2' />
              <div>
                <p className='font-semibold'>Progress Tracking</p>
                <p className='text-sm text-muted-foreground'>Visualize your growth over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='flex-1 flex items-center justify-center p-4 sm:p-8'>
        <div className='w-full max-w-md space-y-8'>
          {/* Mobile Header */}
          <div className='lg:hidden'>
            <Button 
              variant='ghost' 
              onClick={() => navigate('/')}
              className='gap-2 mb-6 -ml-2'
              size='sm'
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div className='flex items-center gap-2 mb-8'>
              <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary'>
                <Zap size={20} className='text-primary-foreground' />
              </div>
              <span className='text-2xl font-bold'>AlgoFlow</span>
            </div>
          </div>

          <Card className='border shadow-lg'>
            <CardHeader className='space-y-1 pb-6'>
              <CardTitle className='text-2xl sm:text-3xl font-bold tracking-tight'>
                Welcome Back
              </CardTitle>
              <CardDescription className='text-base'>
                Sign in to continue your learning journey
              </CardDescription>
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
                  className='font-semibold text-primary hover:underline'
                >
                  Sign up
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login
