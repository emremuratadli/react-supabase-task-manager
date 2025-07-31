import { supabase } from "../supabaseClient";

export const fetchTasks = async (userId) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const addTask = async (task) => {
  const { data, error } = await supabase.from("tasks").insert([task]).select();
  if (error) throw error;
  return data[0];
};

export const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteTask = async (id) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
};
