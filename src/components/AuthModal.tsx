
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  onAuthSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isLogin ? "Logged In" : "Account Created",
        description: `Welcome to VS Code Online!`,
      });
      onAuthSuccess();
    }, 1000);
  };

  const handleDemoLogin = () => {
    toast({
      title: "Demo Mode",
      description: "Welcome to the demo! All features are available.",
    });
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
      <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-8 w-96">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">VS Code Online</h1>
          <p className="text-gray-400 text-sm">
            Professional code editor in your browser
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1e1e1e] border-[#3e3e42] text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1e1e1e] border-[#3e3e42] text-white"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white"
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#0e639c] hover:text-[#1177bb] text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#3e3e42]">
          <Button
            onClick={handleDemoLogin}
            variant="outline"
            className="w-full border-[#3e3e42] text-white hover:bg-[#3e3e42]"
          >
            Continue with Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
