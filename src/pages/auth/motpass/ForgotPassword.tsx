import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../../components/ui/use-toast';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailForm = z.infer<typeof emailSchema>;
type OtpForm = z.infer<typeof otpSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

enum Step {
  Email,
  Otp,
  Password,
}

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>(Step.Email);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitEmail = async (data: EmailForm) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      setEmail(data.email);
      setStep(Step.Otp);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP code",
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP. Please try again.",
      });
    }
  };

  const onSubmitOtp = async (data: OtpForm) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: data.otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      setStep(Step.Password);
      toast({
        title: "OTP Verified",
        description: "Please set your new password",
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
      });
    }
  };

  const onSubmitPassword = async (data: PasswordForm) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: data.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      toast({
        title: "Success",
        description: "Your password has been updated successfully",
      });
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update password. Please try again.",
      });
    }
  };

  const goBack = () => {
    if (step === Step.Otp) {
      setStep(Step.Email);
    } else if (step === Step.Password) {
      setStep(Step.Otp);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-md mx-auto p-6 mt-8">
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold">Reset Password</h1>
          </div>

          <AnimatePresence mode="wait">
            {step === Step.Email && (
              <motion.form
                key="email"
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...emailForm.register('email')}
                    className={emailForm.formState.errors.email ? 'border-red-500' : ''}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Send Reset Code
                </Button>
              </motion.form>
            )}

            {step === Step.Otp && (
              <motion.form
                key="otp"
                onSubmit={otpForm.handleSubmit(onSubmitOtp)}
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    {...otpForm.register('otp')}
                    className={otpForm.formState.errors.otp ? 'border-red-500' : ''}
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="text-red-500 text-sm mt-1">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Verify OTP
                  </Button>
                </div>
              </motion.form>
            )}

            {step === Step.Password && (
              <motion.form
                key="password"
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...passwordForm.register('password')}
                    className={passwordForm.formState.errors.password ? 'border-red-500' : ''}
                  />
                  {passwordForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register('confirmPassword')}
                    className={passwordForm.formState.errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Update Password
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
