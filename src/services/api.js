// src/services/api.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch all users

export const fetchAllData = async (tableName) => {
  try {
    const { data, error } = await supabase.from(tableName).select("*").order("id", { ascending: true });

    console.log("retreved data: ", data)

    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error; 
    }
    // console.log(data);
    return data;
  } catch (error) {
    console.error(`Unexpected error in fetchAllData for ${tableName}:`, error);
    throw error;
  }
};

export const updateData = async (dataCtg, updateData, id) => {
  
  console.log("ready to update data: ", updateData)

  try {
    const { data, error } = await supabase
      .from(dataCtg)
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error(`Error updating data in ${tableName}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error in updateData for ${tableName}:`, error);
    throw error;
  }
};


export default fetchAllData;
