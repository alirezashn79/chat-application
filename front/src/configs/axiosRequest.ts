import axios from "axios";
import { BASE_URL } from "@/helpers/constants.ts";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default client;
