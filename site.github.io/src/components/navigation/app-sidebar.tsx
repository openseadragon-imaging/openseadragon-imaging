import * as React from 'react';
import { useMatchRoute, Link, linkOptions } from '@tanstack/react-router';
//import { SearchForm } from '@/components/ui/search-form';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
//import { GalleryVerticalEndIcon, PlusIcon, MinusIcon } from 'lucide-react';
import { PlusIcon, MinusIcon } from 'lucide-react';
import osdlogo from '@/assets/osdlogo.png';

const menuSections = [
  {
    label: 'Libraries',
    options: linkOptions([
      //{ to: '/libraries/mousetracker', label: 'MouseTracker', activeOptions: { exact: false } },
    ]),
  },
  {
    label: 'Dev Tests',
    options: linkOptions([
      {
        to: '/devtests/mousetracker',
        label: 'MouseTracker',
        activeOptions: { exact: false },
      },
      {
        to: '/devtests/referencestrip',
        label: 'ReferenceStrip',
        activeOptions: { exact: false },
      },
      {
        to: '/devtests/canvasdragend',
        label: 'canvas-drag-end',
        activeOptions: { exact: false },
      },
      {
        to: '/devtests/viewerinputhook',
        label: 'ViewerInputHook',
        activeOptions: { exact: false },
      },
    ]),
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const matchRoute = useMatchRoute();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link to="/" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <GalleryVerticalEndIcon className="size-4" /> */}
                <img
                  src={osdlogo}
                  alt="OpenSeadragon Logo"
                  className="size-6"
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">OpenSeadragon Imaging</span>
                {/* <span className="">v1.0.0</span> */}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuSections.map((section) => (
              <Collapsible
                key={section.label}
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton render={<CollapsibleTrigger />}>
                    {section.label}{' '}
                    <PlusIcon className="ml-auto group-aria-expanded/menu-button:hidden" />
                    <MinusIcon className="ml-auto hidden group-aria-expanded/menu-button:block" />
                  </SidebarMenuButton>
                  {section.options?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {section.options.map((option) => {
                          const isActive = !!matchRoute({
                            to: option.to,
                            fuzzy: !option.activeOptions.exact,
                          });
                          return (
                            <SidebarMenuSubItem key={option.label}>
                              <SidebarMenuSubButton
                                isActive={isActive}
                                render={
                                  <Link
                                    {...option}
                                    key={option.to}
                                  >
                                    {option.label}
                                  </Link>
                                }
                              />
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
