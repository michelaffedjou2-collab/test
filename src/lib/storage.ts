import { PortfolioData } from "@/types/portfolio";

const portfolios = new Map<string, PortfolioData>();

export function savePortfolio(data: PortfolioData): void {
  portfolios.set(data.id, data);
}

export function getPortfolio(id: string): PortfolioData | undefined {
  return portfolios.get(id);
}
