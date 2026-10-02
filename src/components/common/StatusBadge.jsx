import React from 'react';
import { Badge } from './Badge';

export const StatusBadge = ({ status, className = '' }) => {
  const getBadgeProps = (st) => {
    switch (st?.toUpperCase()) {
      case 'OPEN':
      case 'REGISTERED':
      case 'ATTENDED':
      case 'PUBLISHED':
      case 'ACTIVE':
      case 'APPROVED':
      case 'PRESENT':
      case 'VALID':
        return { variant: 'success', label: st, dot: true };

      case 'WAITLIST':
      case 'WAITLISTED':
      case 'PENDING':
      case 'PENDING_APPROVAL':
        return { variant: 'warning', label: st === 'WAITLIST' ? 'WAITLIST OPEN' : st, dot: true };

      case 'FULL':
      case 'CLOSED':
      case 'CANCELLED':
      case 'SUSPENDED':
      case 'ABSENT':
      case 'INVALID':
        return { variant: 'danger', label: st, dot: true };

      case 'DRAFT':
        return { variant: 'purple', label: 'DRAFT', dot: false };

      case 'ONGOING':
        return { variant: 'electric', label: 'LIVE NOW', dot: true };

      case 'COMPLETED':
        return { variant: 'default', label: 'COMPLETED', dot: false };

      case 'NOT_ELIGIBLE':
        return { variant: 'danger', label: 'NOT ELIGIBLE', dot: false };

      default:
        return { variant: 'default', label: st || 'UNKNOWN', dot: false };
    }
  };

  const { variant, label, dot } = getBadgeProps(status);

  return (
    <Badge variant={variant} dot={dot} className={className}>
      {label}
    </Badge>
  );
};
