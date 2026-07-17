import apiClient from './client';
import { generateInfrastructureOverview } from '../mocks/infrastructureMocks';

const useInfrastructureMocks = import.meta.env.VITE_USE_INFRA_MOCKS === 'true';

export interface InfrastructureAlertCounts {
  critical: number;
  warning: number;
  [key: string]: number;
}

export interface InfrastructureMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  [key: string]: number;
}

export interface InfrastructureInstance {
  instanceId: string;
  host: string;
  status: string;
  cpu: number;
  memory: number;
  [key: string]: string | number;
}

export interface InfrastructureOverview {
  infrastructureId: string;
  serviceName: string;
  health: string;
  availability: number;
  alerts: InfrastructureAlertCounts;
  metrics: InfrastructureMetrics;
  instances: InfrastructureInstance[];
  lastUpdated: string;
}

export interface InfrastructureComponent {
  [key: string]: unknown;
}

export interface InfrastructureCapability {
  [key: string]: unknown;
}

export interface InfrastructureTrendPoint {
  timestamp: string;
  value: number;
  [key: string]: unknown;
}

export interface InfrastructureSearchParams {
  serviceName?: string;
  activeInfra?: boolean;
  environment?: string;
  page?: number;
  size?: number;
}

export interface InfrastructureSearchResult {
  [key: string]: unknown;
}

export interface InfrastructureConnectivityResponse {
  [key: string]: unknown;
}

export async function fetchInfrastructureOverview(
  infraId: string
): Promise<InfrastructureOverview> {
  if (useInfrastructureMocks) {
    return generateInfrastructureOverview(infraId);
  }

  const response = await apiClient.get<InfrastructureOverview>(
    `/infrastructure/${encodeURIComponent(infraId)}/overview`
  );
  return response.data;
}

export async function fetchInfrastructureComponents(
  infraId: string
): Promise<InfrastructureComponent[]> {
  const response = await apiClient.get<InfrastructureComponent[]>(
    `/infrastructure/${encodeURIComponent(infraId)}/components`
  );
  return response.data;
}

export async function fetchInfrastructureCapabilities(
  infraId: string
): Promise<InfrastructureCapability[]> {
  const response = await apiClient.get<InfrastructureCapability[]>(
    `/infrastructure/${encodeURIComponent(infraId)}/capabilities`
  );
  return response.data;
}

export async function fetchInfrastructureTrends(
  infraId: string,
  metric?: string,
  interval?: string
): Promise<InfrastructureTrendPoint[]> {
  const response = await apiClient.get<InfrastructureTrendPoint[]>(
    `/infrastructure/${encodeURIComponent(infraId)}/trends`,
    {
      params: {
        metric,
        interval,
      },
    }
  );
  return response.data;
}

export async function searchInfrastructure(
  params: InfrastructureSearchParams
): Promise<InfrastructureSearchResult[]> {
  const response = await apiClient.get<InfrastructureSearchResult[]>(
    '/infrastructure/search',
    {
      params,
    }
  );
  return response.data;
}

export async function fetchInfrastructureStatus(
  infraId: string
): Promise<InfrastructureConnectivityResponse> {
  const response = await apiClient.get<InfrastructureConnectivityResponse>(
    `/infrastructure/${encodeURIComponent(infraId)}/status`
  );
  return response.data;
}

export async function fetchInfrastructureConnectivity(
  infraId: string
): Promise<InfrastructureConnectivityResponse> {
  const response = await apiClient.get<InfrastructureConnectivityResponse>(
    `/infrastructure/${encodeURIComponent(infraId)}/connectivity`
  );
  return response.data;
}

export async function validateInfrastructureConnectivity(
  infraId: string,
  payload: Record<string, unknown> = {}
): Promise<InfrastructureConnectivityResponse> {
  const response = await apiClient.post<InfrastructureConnectivityResponse>(
    `/infrastructure/${encodeURIComponent(infraId)}/connectivity`,
    payload
  );
  return response.data;
}
