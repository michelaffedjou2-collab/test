import { PortfolioData } from "@/types/portfolio";

const MAX_PORTFOLIOS = 500;

const portfolios = new Map<string, PortfolioData>();

export function savePortfolio(data: PortfolioData): void {
  if (portfolios.size >= MAX_PORTFOLIOS) {
    const oldestKey = portfolios.keys().next().value;
    if (oldestKey) {
      portfolios.delete(oldestKey);
    }
  }
  portfolios.set(data.id, data);
}

export function getPortfolio(id: string): PortfolioData | undefined {
  return portfolios.get(id);
}
