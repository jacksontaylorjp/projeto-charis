const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown,
  auth: boolean = true
): Promise<T> {
  const token = sessionStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (auth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data: T = await response.json();

    if (!response.ok) {
      throw new Error(data as unknown as string || "Erro na requisição");
    }

    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
}

export default apiFetch;
