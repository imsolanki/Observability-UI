import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';

import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { useInfrastructureOverview } from '../../hooks/useInfrastructureData';

const DEFAULT_INFRA_ID = 'PAYMENT-INF';

function formatAvailability(value: number) {
  return `${value.toFixed(2)}%`;
}

function formatMetric(value: number) {
  return `${value.toFixed(0)}`;
}

export default function InfrastructurePage() {
  const theme = useTheme();
  const overviewQuery = useInfrastructureOverview(DEFAULT_INFRA_ID);
  const { data, isLoading, isFetching, error, refetch } = overviewQuery;

  useEffect(() => {
    document.title = 'Infrastructure | Observability';
  }, []);

  if (isLoading) {
    return <LoadingState label="Loading infrastructure overview…" variant="skeleton-cards" rows={4} />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Unable to load infrastructure overview"
        message="We could not fetch infrastructure data for the selected identifier. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const { serviceName, health, availability, alerts, metrics, instances, lastUpdated } = data;

  return (
    <Box>
      <PageHeader
        icon={<DnsRoundedIcon />}
        title="Infrastructure"
        subtitle={`Overview for ${serviceName}`}
        actions={
          <Chip
            label={isFetching ? 'Refreshing…' : `Infra ID: ${DEFAULT_INFRA_ID}`}
            variant="outlined"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                Health
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {health}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                Availability
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatAvailability(availability)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                Alerts
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={`Critical: ${alerts.critical}`} color="error" size="small" />
                <Chip label={`Warning: ${alerts.warning}`} color="warning" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
                Key metrics
              </Typography>
              <Grid container spacing={1}>
                {['cpu', 'memory', 'disk', 'network', 'responseTime'].map((key) => (
                  <Grid key={key} size={{ xs: 12, sm: 6 }}>
                    <Card variant="outlined" sx={{ backgroundColor: alpha(theme.palette.background.paper, 0.98) }}>
                      <CardContent sx={{ py: 1.5, px: 2 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {key === 'responseTime' ? 'Response Time' : key.toUpperCase()}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.75 }}>
                          {formatMetric(metrics[key] ?? 0)}{key === 'responseTime' ? ' ms' : '%'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
                Last updated
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {new Date(lastUpdated).toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                Instance count
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {instances.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Instances
          </Typography>
          {instances.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No instances were returned for this infrastructure.
            </Typography>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                <Box component="thead" sx={{ display: 'table-header-group', backgroundColor: alpha(theme.palette.action.hover, 0.35) }}>
                  <Box component="tr">
                    {['Instance', 'Host', 'Status', 'CPU %', 'Memory %'].map((label) => (
                      <Box
                        component="th"
                        key={label}
                        sx={{
                          textAlign: 'left',
                          py: 1.5,
                          px: 1.5,
                          fontWeight: 700,
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {label}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {instances.map((instance) => (
                    <Box
                      component="tr"
                      key={instance.instanceId}
                      sx={{ '&:not(:last-child) td': { borderBottom: `1px solid ${alpha(theme.palette.divider, 0.55)}` } }}
                    >
                      <Box component="td" sx={{ py: 1.5, px: 1.5 }}>{instance.instanceId}</Box>
                      <Box component="td" sx={{ py: 1.5, px: 1.5 }}>{instance.host}</Box>
                      <Box component="td" sx={{ py: 1.5, px: 1.5 }}>
                        <Chip label={instance.status} size="small" color={instance.status === 'UP' ? 'success' : 'error'} />
                      </Box>
                      <Box component="td" sx={{ py: 1.5, px: 1.5 }}>{instance.cpu}%</Box>
                      <Box component="td" sx={{ py: 1.5, px: 1.5 }}>{instance.memory}%</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
