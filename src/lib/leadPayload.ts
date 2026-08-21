export const B2B_LEAD_FIELDS = {
  accessKey: 'access_key',
  name: 'name',
  email: 'email',
  phone: 'phone',
  company: 'company',
  role: 'role',
  servicesOfInterest: 'services_of_interest',
  organizationalChallenges: 'organizational_challenges',
  organizationSize: 'organization_size',
  contactPreference: 'contact_preference',
  message: 'message',
  honeypot: '_honeypot',
} as const;

const REQUIRED_FIELDS: readonly string[] = [
  B2B_LEAD_FIELDS.name,
  B2B_LEAD_FIELDS.email,
  B2B_LEAD_FIELDS.phone,
];

export function isHoneypotClean(formData: FormData): boolean {
  const honeypot = formData.get(B2B_LEAD_FIELDS.honeypot);
  return honeypot === null || honeypot === '';
}

export function getMissingRequired(formData: FormData): string[] {
  return REQUIRED_FIELDS.filter((field) => {
    const value = formData.get(field);
    if (value === null) return true;
    if (typeof value !== 'string') return false;
    return value.trim() === '';
  });
}
