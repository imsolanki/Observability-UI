import { useQuery } from '@tanstack/react-query';
import {
  fetchInfrastructureOverview,
  fetchInfrastructureComponents,
  fetchInfrastructureCapabilities,
  fetchInfrastructureTrends,
  fetchInfrastructureStatus,
  fetchInfrastructureConnectivity,
  InfrastructureSearchParams,
  searchInfrastructure,
} from '../api/infrastructureApi';

export function useInfrastructureOverview(infraId: string) {
  return useQuery({
    queryKey: ['infrastructure', 'overview', infraId],
    queryFn: () => fetchInfrastructureOverview(infraId),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    enabled: Boolean(infraId),
  });
}

export function useInfrastructureComponents(infraId: string) {
  return useQuery({
    queryKey: ['infrastructure', 'components', infraId],
    queryFn: () => fetchInfrastructureComponents(infraId),
    staleTime: 60 * 1000,
    enabled: Boolean(infraId),
  });
}

export function useInfrastructureCapabilities(infraId: string) {
  return useQuery({
    queryKey: ['infrastructure', 'capabilities', infraId],
    queryFn: () => fetchInfrastructureCapabilities(infraId),
    staleTime: 60 * 1000,
    enabled: Boolean(infraId),
  });
}

export function useInfrastructureTrends(
  infraId: string,
  metric?: string,
  interval?: string
) {
  return useQuery({
    queryKey: ['infrastructure', 'trends', infraId, metric, interval],
    queryFn: () => fetchInfrastructureTrends(infraId, metric, interval),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    enabled: Boolean(infraId),
  });
}

export function useInfrastructureStatus(infraId: string) {
  return useQuery({
    queryKey: ['infrastructure', 'status', infraId],
    queryFn: () => fetchInfrastructureStatus(infraId),
    staleTime: 60 * 1000,
    enabled: Boolean(infraId),
  });
}

export function useInfrastructureConnectivity(infraId: string) {
  return useQuery({
    queryKey: ['infrastructure', 'connectivity', infraId],
    queryFn: () => fetchInfrastructureConnectivity(infraId),
    staleTime: 60 * 1000,
    enabled: Boolean(infraId),
  });
}

export function useInfrastructureSearch(params: InfrastructureSearchParams) {
  return useQuery({
    queryKey: ['infrastructure', 'search', params],
    queryFn: () => searchInfrastructure(params),
    staleTime: 60 * 1000,
    enabled: Object.keys(params).length > 0,
  });
}
