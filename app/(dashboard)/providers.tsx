'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Provider as JotaiProvider } from 'jotai';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </JotaiProvider>
  );
}
