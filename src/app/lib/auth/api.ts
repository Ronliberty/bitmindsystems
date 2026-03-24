import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "content-type": "application/json",
    },
});


export async function registerUserWithInvite(data: any) {
  // data should contain invite, email, phone_number, name, passkey
  return api.post(`/api/register/`, data);
}