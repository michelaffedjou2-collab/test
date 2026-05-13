import { PortfolioData } from "@/types/portfolio";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

let geminiApiKey = process.env.GEMINI_API_KEY || "";

interface QuotaInfo {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastError: string | null;
  lastErrorTime: string | null;
  lastRequestTime: string | null;
}

interface UserRecord {
  id: string;
  fullName: string;
  professionalTitle: string;
  portfolioId: string;
  createdAt: string;
}

const quota: QuotaInfo = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  lastError: null,
  lastErrorTime: null,
  lastRequestTime: null,
};

const users: UserRecord[] = [];

export function verifyAdminPassword(password: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(ADMIN_PASSWORD);
    if (a.length !== b.length) {
      crypto.timingSafeEqual(a, a);
      return false;
    }
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function getGeminiApiKey(): string {
  return geminiApiKey;
}

export function setGeminiApiKey(key: string): void {
  geminiApiKey = key;
}

export function trackRequest(success: boolean, error?: string): void {
  quota.totalRequests++;
  quota.lastRequestTime = new Date().toISOString();
  if (success) {
    quota.successfulRequests++;
  } else {
    quota.failedRequests++;
    quota.lastError = error || "Unknown error";
    quota.lastErrorTime = new Date().toISOString();
  }
}

export function getQuotaInfo(): QuotaInfo {
  return { ...quota };
}

export function addUserRecord(portfolio: PortfolioData): void {
  users.push({
    id: portfolio.id,
    fullName: portfolio.fullName,
    professionalTitle: portfolio.professionalTitle,
    portfolioId: portfolio.id,
    createdAt: portfolio.createdAt,
  });
}

export function getUserRecords(): UserRecord[] {
  return [...users].reverse();
}
