import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '' }) => {
  const badgeConfig: Record<RiskLevel, { bg: string; text: string; label: string }> = {
    LOW: { bg: 'bg-green-100 border-green-300', text: 'text-green-800', label: 'LOW RISK' },
    MODERATE: { bg: 'bg-yellow-100 border-yellow-300', text: 'text-yellow-800', label: 'MODERATE RISK' },
    HIGH: { bg: 'bg-orange-100 border-orange-300', text: 'text-orange-800', label: 'HIGH RISK' },
    CRITICAL: { bg: 'bg-red-100 border-red-300', text: 'text-red-800', label: 'CRITICAL RISK' }
  };

  const config = badgeConfig[level] || badgeConfig['MODERATE'];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${className}`}>
      {config.label}
    </span>
  );
};
