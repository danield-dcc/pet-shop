import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface NavigationButtonProps {
  toolTipText: string;
  children: ReactNode;
  onClick: () => void;
}

export function NavigationButton({
  children,
  onClick,
  toolTipText,
}: NavigationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          className="h-12 w-9 bg-transparent border-border-primary text-content-primary
        hover:bg-background-primary hover:border-border-secondary hover:text-content-primary
          focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand
          focus:border-border-brand focus-visible:border-border-brand"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-background-tertiary">
        <p>{toolTipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
