export type Vendedor = {
  id: number;
  nome_loja: string;
  nome_responsavel: string;
  email: string;
  telefone?: string;
  criado_em?: string;
};

type VendedorAuthResponse = {
  mensagem: string;
  token: string;
  vendedor: Vendedor;
};

const API_URL = "http://localhost:3001";
const VENDEDOR_TOKEN_KEY = "vendedor_token";

export function obterTokenVendedor() {
  return localStorage.getItem(VENDEDOR_TOKEN_KEY);
}

export function salvarTokenVendedor(token: string) {
  localStorage.setItem(VENDEDOR_TOKEN_KEY, token);
}

export function removerTokenVendedor() {
  localStorage.removeItem(VENDEDOR_TOKEN_KEY);
}

async function tratarResposta<T>(resposta: Response): Promise<T> {
  const dados = (await resposta.json().catch(() => null)) as { erro?: string } | null;

  if (!resposta.ok) {
    throw new Error(dados?.erro || "Erro ao comunicar com o servidor");
  }

  return dados as T;
}

export async function cadastrarVendedor(dados: {
  nome_loja: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  senha: string;
}) {
  const resposta = await fetch(`${API_URL}/auth/vendedor/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return tratarResposta<VendedorAuthResponse>(resposta);
}

export async function loginVendedor(dados: { email: string; senha: string }) {
  const resposta = await fetch(`${API_URL}/auth/vendedor/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return tratarResposta<VendedorAuthResponse>(resposta);
}

export async function buscarVendedorLogado() {
  const token = obterTokenVendedor();

  if (!token) {
    return null;
  }

  const resposta = await fetch(`${API_URL}/auth/vendedor/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (resposta.status === 401) {
    removerTokenVendedor();
    return null;
  }

  const dados = await tratarResposta<{ logado: boolean; vendedor: Vendedor }>(resposta);
  return dados.vendedor;
}

export async function logoutVendedor() {
  const token = obterTokenVendedor();

  if (!token) {
    removerTokenVendedor();
    return;
  }

  try {
    await fetch(`${API_URL}/auth/vendedor/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } finally {
    removerTokenVendedor();
  }
}
