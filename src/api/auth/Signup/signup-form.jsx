import { useState } from 'react'
import { EyeIcon, EyeOffIcon, User, Mail, Lock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'

const API_URL = "http://localhost:5001/api/auth/signup"; 

const SignupForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' }
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    
    const levels = [
      { strength: 1, text: 'Weak', color: 'bg-red-500' },
      { strength: 2, text: 'Fair', color: 'bg-orange-500' },
      { strength: 3, text: 'Good', color: 'bg-yellow-500' },
      { strength: 4, text: 'Strong', color: 'bg-green-500' }
    ]
    return levels[strength - 1] || { strength: 0, text: '', color: '' }
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

const handleSubmit = async (e) => {
  e.preventDefault();

  // Prevent double submission
  if (isSubmitting) {
    console.log('⚠️ Already submitting, ignoring duplicate request');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setIsLoading(true);
  setIsSubmitting(true); // Lock submission

  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  const timestamp = new Date().toISOString();
  console.log(`🚀 [${timestamp}] Sending signup request to:`, API_URL);
  console.log('📦 Payload:', payload);

  try {
    const response = await axios.post(API_URL, payload);

    console.log("✅ Signup successful:", response.data);
    alert("Account created successfully! 🎉");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    console.error("❌ Error response:", error.response);

    const errorMessage =
      error?.response?.data?.message || "Signup failed. Please try again.";

    alert(`Error: ${errorMessage}`);
  } finally {
    setIsLoading(false);
    setTimeout(() => setIsSubmitting(false), 1000); // Reset after 1 second
  }
};

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className='space-y-2'>
        <Label htmlFor='userName' className='text-sm font-medium'>
          Full Name
        </Label>
        <div className='relative'>
          <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input 
            type='text' 
            id='userName' 
            placeholder='John Doe'
            className='pl-10 h-11 focus-visible:ring-2'
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className='space-y-2'>
        <Label htmlFor='userEmail' className='text-sm font-medium'>
          Email address
        </Label>
        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input 
            type='email' 
            id='userEmail' 
            placeholder='you@example.com'
            className='pl-10 h-11 focus-visible:ring-2'
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
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
          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            placeholder='Create a strong password'
            className='pl-10 pr-10 h-11 focus-visible:ring-2'
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible(!isVisible)}
            className='absolute inset-y-0 right-0 h-11 w-10 hover:bg-transparent'>
            {isVisible ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
          </Button>
        </div>
        {formData.password && passwordStrength.strength > 0 && (
          <div className='space-y-1'>
            <div className='flex gap-1'>
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    level <= passwordStrength.strength ? passwordStrength.color : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className='text-xs text-muted-foreground'>
              Password strength: <span className='font-medium'>{passwordStrength.text}</span>
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className='space-y-2'>
        <Label htmlFor='confirmPassword' className='text-sm font-medium'>
          Confirm Password
        </Label>
        <div className='relative'>
          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            id='confirmPassword'
            type={isConfirmVisible ? 'text' : 'password'}
            placeholder='Re-enter your password'
            className='pl-10 pr-10 h-11 focus-visible:ring-2'
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsConfirmVisible(!isConfirmVisible)}
            className='absolute inset-y-0 right-0 h-11 w-10 hover:bg-transparent'>
            {isConfirmVisible ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
          </Button>
          {passwordsMatch && (
            <CheckCircle2 className='absolute right-12 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500' />
          )}
        </div>
        {formData.confirmPassword && !passwordsMatch && (
          <p className='text-xs text-red-500'>Passwords do not match</p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className='flex items-start gap-2 pt-2'>
        <Checkbox 
          id='agreeToTerms'
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked})}
          required
        />
        <Label 
          htmlFor='agreeToTerms' 
          className='text-sm font-normal leading-relaxed cursor-pointer'
        >
          I agree to the{' '}
          <a href='#' className='text-primary hover:underline font-medium'>
            Terms of Service
          </a>
          {' '}and{' '}
          <a href='#' className='text-primary hover:underline font-medium'>
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button 
        className='w-full h-11 text-base font-medium' 
        type='submit'
        disabled={!formData.agreeToTerms || !passwordsMatch || isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  )
}

export default SignupForm
