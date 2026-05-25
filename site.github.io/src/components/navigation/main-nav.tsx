// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Outlet } from '@tanstack/react-router';
import { AppSidebar } from '@/components/navigation/app-sidebar';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <SidebarProvider
      className={className}
      id="main-nav"
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

// interface NavItem {
//   to: string;
//   label: string;
//   exact?: boolean;
// }

// interface MainNavProps {
//   items: NavItem[];
//   className?: string;
// }

// export function MainNav({ items, className }: MainNavProps) {
//   const matchRoute = useMatchRoute();

//   return (
//     <Tabs
//       id="main-nav"
//       className={className}
//     >
//       <TabsList variant="line">
//         {items.map((item) => {
//           const isActive = !!matchRoute({ to: item.to, fuzzy: !item.exact });

//           return (
//             <TabsTrigger
//               value={item.label}
//               key={item.to}
//               data-active={isActive}
//             >
//               <Link to={item.to}>{item.label}</Link>
//             </TabsTrigger>
//           );
//         })}
//       </TabsList>
//     </Tabs>
//   );
// }
