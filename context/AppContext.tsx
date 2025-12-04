import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post } from '../types';
import { generateMockPosts } from '../services/mockData';

interface AppContextType {
  user: User | null;
  posts: Post[];
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'user'>) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => {
      setPosts(generateMockPosts());
      setIsLoading(false);
    }, 800);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email.endsWith('@uci.edu')) {
          resolve(false);
          return;
        }
        
        // Create a fresh user or retrieve mock
        const newUser: User = {
          id: 'current-user',
          name: email.split('@')[0],
          email: email,
          isOnboarded: false,
        };
        
        setUser(newUser);
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'user'>) => {
    if (!user) return;
    
    const newPost: Post = {
      ...postData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      userId: user.id,
      user: user
    };
    
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, posts, login, logout, updateUser, addPost, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};