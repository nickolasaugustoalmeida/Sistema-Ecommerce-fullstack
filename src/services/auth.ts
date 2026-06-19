export type Usuario = {
  id: number;
  nome: string;
  email: string;
  criado_em?: string;
};

type AuthResponse = {
  mensagem: string;
  token: string;
  usuario: Usuario;
};

const API_URL = "http://localhost:3001";
const TOKEN_KEY = "auth_token";

export function obterToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function salvarToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removerToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function tratarResposta<T>(resposta: Response): Promise<T> {
  const dados = (await resposta.json().catch(() => null)) as { erro?: string } | null;

  if (!resposta.ok) {
    throw new Error(dados?.erro || "Erro ao comunicar com o servidor");
  }

  return dados as T;
}

export async function cadastrarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
}) {
  const resposta = await fetch(`${API_URL}/auth/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return tratarResposta<AuthResponse>(resposta);
}

export async function loginUsuario(dados: { email: string; senha: string }) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return tratarResposta<AuthResponse>(resposta);
}

export async function buscarUsuarioLogado() {
  const token = obterToken();

  if (!token) {
    return null;
  }

  const resposta = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (resposta.status === 401) {
    removerToken();
    return null;
  }

  const dados = await tratarResposta<{ logado: boolean; usuario: Usuario }>(resposta);
  return dados.usuario;
}

export async function logoutUsuario() {
  const token = obterToken();

  if (!token) {
    removerToken();
    return;
  }

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } finally {
    removerToken();
  }
}
