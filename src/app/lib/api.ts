// lib/api.ts
import axios from "axios";

export async function fetchCurrentUser() {
  const res = await axios.get("/api/user/me/");
  return res.data; // { id, email, first_name, last_name, user_type }
}
