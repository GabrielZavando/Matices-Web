import { describe, it, expect } from 'vitest';
import { B2B_LEAD_FIELDS, isHoneypotClean, getMissingRequired } from './leadPayload';

const REQUIRED = [
  B2B_LEAD_FIELDS.name,
  B2B_LEAD_FIELDS.email,
  B2B_LEAD_FIELDS.phone,
  B2B_LEAD_FIELDS.message,
] as const;

describe('B2B_LEAD_FIELDS contract', () => {
  it('debe exponer los nombres canónicos del payload B2BLeadPayload', () => {
    expect(B2B_LEAD_FIELDS.name).toBe('name');
    expect(B2B_LEAD_FIELDS.email).toBe('email');
    expect(B2B_LEAD_FIELDS.phone).toBe('phone');
    expect(B2B_LEAD_FIELDS.company).toBe('company');
    expect(B2B_LEAD_FIELDS.role).toBe('role');
    expect(B2B_LEAD_FIELDS.servicesOfInterest).toBe('services_of_interest');
    expect(B2B_LEAD_FIELDS.organizationalChallenges).toBe('organizational_challenges');
    expect(B2B_LEAD_FIELDS.organizationSize).toBe('organization_size');
    expect(B2B_LEAD_FIELDS.contactPreference).toBe('contact_preference');
    expect(B2B_LEAD_FIELDS.message).toBe('message');
    expect(B2B_LEAD_FIELDS.honeypot).toBe('_honeypot');
    expect(B2B_LEAD_FIELDS.accessKey).toBe('access_key');
  });
});

describe('isHoneypotClean', () => {
  it('es true cuando el honeypot está ausente', () => {
    const fd = new FormData();
    expect(isHoneypotClean(fd)).toBe(true);
  });

  it('es true cuando el honeypot está vacío', () => {
    const fd = new FormData();
    fd.set(B2B_LEAD_FIELDS.honeypot, '');
    expect(isHoneypotClean(fd)).toBe(true);
  });

  it('es false cuando el honeypot tiene contenido (bot)', () => {
    const fd = new FormData();
    fd.set(B2B_LEAD_FIELDS.honeypot, 'spam');
    expect(isHoneypotClean(fd)).toBe(false);
  });
});

describe('getMissingRequired', () => {
  it('lista todos los requeridos cuando el formulario está vacío', () => {
    const fd = new FormData();
    expect(getMissingRequired(fd).sort()).toEqual([...REQUIRED].sort());
  });

  it('no lista campos ya completados', () => {
    const fd = new FormData();
    fd.set(B2B_LEAD_FIELDS.name, 'Juan Pérez');
    fd.set(B2B_LEAD_FIELDS.email, 'j@empresa.cl');
    fd.set(B2B_LEAD_FIELDS.phone, '+56 9 1234 5678');
    fd.set(B2B_LEAD_FIELDS.contactPreference, 'Email');
    fd.set(B2B_LEAD_FIELDS.message, 'Hola');
    expect(getMissingRequired(fd)).toEqual([]);
  });

  it('ignora espacios en blanco como faltante', () => {
    const fd = new FormData();
    fd.set(B2B_LEAD_FIELDS.email, '   ');
    expect(getMissingRequired(fd)).toContain(B2B_LEAD_FIELDS.email);
  });
});
