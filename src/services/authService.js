import { supabase } from "./supabaseClient";

export const signUp = async (email, password) => {
  const { error, data } = await supabase.auth.signUp({ email, password });
  // If there is an error or no user returned, throw error
  if (error || !data?.user) {
    if (
      error &&
      error.message &&
      (error.message.toLowerCase().includes("user already registered") ||
        error.message.toLowerCase().includes("already registered") ||
        error.message.toLowerCase().includes("user already exists") ||
        error.message.toLowerCase().includes("email already in use"))
    ) {
      throw new Error(
        "This email is already registered. Please sign in instead."
      );
    }
    // If no error but also no user, throw a generic error
    throw new Error(error?.message || "Registration failed. Please try again.");
  }
  return data;
};

export const signIn = async (email, password) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};
