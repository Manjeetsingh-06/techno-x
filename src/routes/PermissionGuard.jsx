import React from 'react';
import { useAuth } from '../context/AuthContext';
import { RoleGuard } from './RoleGuard';

// Fine-grained permission definitions
export const PERMISSIONS = {
  MANAGE_STUDENTS: ['ADMIN', 'FACULTY'],
  MANUAL_REGISTRATION_OVERRIDE: ['ADMIN', 'FACULTY'],
  APPROVE_WAITLIST: ['ADMIN', 'FACULTY'],
  MARK_ATTENDANCE: ['ADMIN', 'FACULTY', 'MANAGEMENT_COMMITTEE'],
  CORRECT_ATTENDANCE: ['ADMIN', 'FACULTY', 'MANAGEMENT_COMMITTEE'],
  APPROVE_EVENTS: ['ADMIN', 'FACULTY'],
  SYSTEM_SETTINGS: ['ADMIN'],
  VIEW_AUDIT_LOGS: ['ADMIN'],
  PLAN_EVENTS: ['ADMIN', 'MANAGEMENT_COMMITTEE'],
};

export const PermissionGuard = ({ permission, children }) => {
  const allowed = PERMISSIONS[permission] || ['ADMIN'];
  return <RoleGuard allowedRoles={allowed}>{children}</RoleGuard>;
};
