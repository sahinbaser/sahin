import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Mock Auth for development when keys are missing
export const mockAuth = {
  signIn: async (email: string) => {
    await AsyncStorage.setItem('mock_user', JSON.stringify({ email, id: 'mock-id' }));
    return { data: { user: { email, id: 'mock-id' } }, error: null };
  },
  signOut: async () => {
    await AsyncStorage.removeItem('mock_user');
  },
  getUser: async () => {
    const user = await AsyncStorage.getItem('mock_user');
    return user ? JSON.parse(user) : null;
  }
};
