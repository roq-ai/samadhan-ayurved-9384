const mapping: Record<string, string> = {
  'health-coaches': 'health_coach',
  organizations: 'organization',
  therapists: 'therapist',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
