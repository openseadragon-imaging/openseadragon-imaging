import { createRootRoute } from '@tanstack/react-router';
//import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { MainNav } from '@/components/navigation/main-nav';
import { NotFound } from '@/components/navigation/not-found';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Main content wrapper */}
      <MainNav className="m-0 h-full w-full p-0" />

      {/* Portal root for overlays */}
      <div id="portal-root"></div>

      {/* <TanStackRouterDevtools /> */}
    </>
  ),
  notFoundComponent: NotFound,
});
