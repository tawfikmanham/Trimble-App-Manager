const sampleGroupNames = {
  0: 'Regional Drivers',
  4: 'Long-Haul Drivers',
  5: 'City Delivery Drivers',
  7: 'Depot Dispatchers',
  9: 'Vehicle Inspection Team',
  12: 'Linehaul Drivers',
  15: 'Safety Team',
  18: 'Fleet Maintenance Team',
};

export const demoGroups = Object.values(sampleGroupNames);

export function sampleAudience(id, status) {
  if (status !== 'Published') return null;
  if (id === 2) return { organization: true };
  const group = sampleGroupNames[id];
  return group ? { groups: [group] } : undefined;
}

export function withDefaultTheme(themes, preferredId) {
  const defaultId = preferredId ?? themes.find(theme => theme.type === 'Default')?.id ?? themes[0]?.id;
  return themes.map(theme => {
    const type = theme.id === defaultId ? 'Default' : 'Custom';
    return theme.type === type ? theme : { ...theme, type };
  });
}

function assignAudience(theme, audience) {
  return { ...theme, audience, status: audience ? 'Published' : 'Not published' };
}

export function publishTheme(themes, themeId, audience) {
  return themes.map(theme => {
    if (theme.id === themeId) return assignAudience(theme, audience);
    if (audience?.organization && theme.status === 'Published') return assignAudience(theme, null);
    if (!audience?.groups || !theme.audience?.groups) return theme;
    const remaining = theme.audience.groups.filter(group => !audience.groups.includes(group));
    if (remaining.length === theme.audience.groups.length) return theme;
    return assignAudience(theme, remaining.length ? { groups: remaining } : null);
  });
}

export function audienceLabel(theme) {
  if (theme.audience?.organization) return 'Whole organization';
  if (theme.audience?.groups) return theme.audience.groups.join(', ');
  if (theme.status === 'Published') return 'Audience not set';
  return '';
}
