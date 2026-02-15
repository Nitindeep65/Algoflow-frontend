import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Zap, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SignupForm from './signup-form'

const Signup = () => {
  const navigate = useNavigate();
  const handleClickSignup = () => {
    navigate('/Login')
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
            Start Your Journey
            <br />
            to Mastery
          </h2>
          <p className='text-lg text-muted-foreground'>
            Join thousands of developers who are mastering algorithms and landing their dream jobs.
          </p>
          <div className='space-y-4 pt-6'>
            <div className='flex items-start gap-3'>
              <CheckCircle2 size={20} className='text-primary mt-0.5' />
              <div>
                <p className='font-semibold'>Free Forever Access</p>
                <p className='text-sm text-muted-foreground'>No credit card required</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <CheckCircle2 size={20} className='text-primary mt-0.5' />
              <div>
                <p className='font-semibold'>Comprehensive Learning</p>
                <p className='text-sm text-muted-foreground'>500+ curated problems</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <CheckCircle2 size={20} className='text-primary mt-0.5' />
              <div>
                <p className='font-semibold'>Smart AI Assistance</p>
                <p className='text-sm text-muted-foreground'>Learn without spoilers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
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
                Create Account
              </CardTitle>
              <CardDescription className='text-base'>
                Get started with AlgoFlow for free
              </CardDescription>
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
                <button 
                  onClick={handleClickSignup} 
                  className='font-semibold text-primary hover:underline'
                >
                  Sign in
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Signup
