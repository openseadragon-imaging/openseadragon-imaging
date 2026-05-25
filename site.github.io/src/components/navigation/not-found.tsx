import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function NotFound() {
  return (
    <div className="flex justify-center pt-4 text-xl">
      <Alert
        variant="destructive"
        className="max-w-md"
      >
        <AlertCircleIcon />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          The page you are looking for could not be found.
        </AlertDescription>
      </Alert>
    </div>
  );
}
