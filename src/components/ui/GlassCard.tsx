import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article';
  className?: string;
}

export function GlassCard({
  children,
  className,
  as = 'div',
  ...props
}: GlassCardProps) {
  const Comp = as;
  return (
    <Comp className={cn('glass rounded-3xl', className)} {...props}>
      {children}
    </Comp>
  );
}
