import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://jxcstmpkezmeenrguzto.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Y3N0bXBrZXptZWVucmd1enRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNDA3ODksImV4cCI6MjA1MTkxNjc4OX0.2w-dxd7rPJ7Mv7PiAPyJtfVpBenoMxzRMBVjn7ZXwGQ");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;