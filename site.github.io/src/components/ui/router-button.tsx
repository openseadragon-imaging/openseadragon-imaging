import { createLink } from '@tanstack/react-router';
//import { Button, type ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';

// Create a router-compatible Button
export const RouterButton = createLink(
  forwardRef<HTMLButtonElement>((props, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
      />
    );
  }),
);
