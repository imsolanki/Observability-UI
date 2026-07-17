// ─── Infrastructure Mock Data ───
// Temporary local mock data for the Infrastructure overview endpoint.
// This file exists to support frontend development before the real backend API is available.

import type { InfrastructureOverview } from '../api/infrastructureApi';

export function generateInfrastructureOverview(infraId: string): InfrastructureOverview {
  const now = new Date().toISOString();

  return {
    infrastructureId: infraId,
    serviceName: `${infraId} Service`,
    health: 'UP',
    availability: 99.98,
    alerts: {
      critical: 1,
      warning: 3,
    },
    metrics: {
      cpu: 58,
      memory: 72,
      disk: 45,
      network: 34,
      responseTime: 125,
    },
    instances: [
      {
        instanceId: `${infraId}-01`,
        host: 'prod-app-01.example.com',
        status: 'UP',
        cpu: 55,
        memory: 70,
      },
      {
        instanceId: `${infraId}-02`,
        host: 'prod-app-02.example.com',
        status: 'UP',
        cpu: 62,
        memory: 75,
      },
    ],
    lastUpdated: now,
  };
}
