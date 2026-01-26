import api from "../../api/client";

export default async function fetchHotelsServer() {
  const response = await api.get("/hotels");
  return response.data; 
}