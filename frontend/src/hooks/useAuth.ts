import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  name?: string;
  email?: string;
  userType?: 'patient' | 'doctor' | 'admin';
  [key: string]: any;
}

// Simulated auth hook for demo purposes
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchUser = useCallback(async () => {
    try {
      // In a real app, you would make an API call to fetch user data
      // For demo purposes, we'll get user info from localStorage
      const userInfo = localStorage.getItem('user_info');
      
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to login
      // For demo purposes, we'll simulate a login
      
      // Simulate successful login
      localStorage.setItem('access_token', 'demo_token');
      localStorage.setItem('user_info', JSON.stringify({ 
        email, 
        name: email.split('@')[0] 
      }));
      
      await fetchUser();
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to register
      // For demo purposes, we'll simulate registration
      
      // Simulate successful registration
      localStorage.setItem('access_token', 'demo_token');
      localStorage.setItem('user_info', JSON.stringify(userData));
      
      await fetchUser();
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    setUser(null);
    toast.success('You have been logged out.');
  };
  
  return {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    signup,
    logout,
    fetchUser,
  };
};

// Hook to get the user role
export const useUserRole = () => {
  const { user } = useAuth();
  
  return {
    isLoading: false,
    data: user ? { role: user.userType || 'patient' } : null,
  };
};

// Utility function to get user role from user object
export const getUserRole = (user: User | null): 'patient' | 'doctor' | 'admin' | null => {
  if (!user) return null;
  return user.userType as 'patient' | 'doctor' | 'admin' || 'patient';
}; 