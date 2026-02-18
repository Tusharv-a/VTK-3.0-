import { z } from 'zod';
import { insertDiagnosticSchema, insertBatteryLogSchema, diagnosticResults, batteryLogs } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  diagnostics: {
    list: {
      method: 'GET' as const,
      path: '/api/diagnostics',
      responses: {
        200: z.array(z.custom<typeof diagnosticResults.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/diagnostics',
      input: insertDiagnosticSchema,
      responses: {
        201: z.custom<typeof diagnosticResults.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  batteryLogs: {
    list: {
      method: 'GET' as const,
      path: '/api/battery-logs',
      responses: {
        200: z.array(z.custom<typeof batteryLogs.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/battery-logs',
      input: insertBatteryLogSchema,
      responses: {
        201: z.custom<typeof batteryLogs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type CreateDiagnosticInput = z.infer<typeof api.diagnostics.create.input>;
export type DiagnosticListResponse = z.infer<typeof api.diagnostics.list.responses[200]>;
export type CreateBatteryLogInput = z.infer<typeof api.batteryLogs.create.input>;
export type BatteryLogListResponse = z.infer<typeof api.batteryLogs.list.responses[200]>;
