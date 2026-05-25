import { createFileRoute } from '@tanstack/react-router';
//import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    // <div
    //   id="home-page"
    //   className={'m-0 h-full p-4'}
    // >
    //   <h4>Home</h4>
    // </div>
    <div className="flex flex-1 flex-col gap-3 p-4">
      {/* <div className="min-h-[100vh] flex-1 rounded-sm bg-muted/50 md:min-h-min" />
      <div className="grid auto-rows-min gap-3 md:grid-cols-3">
        <div className="aspect-video rounded-sm bg-muted/50" />
        <div className="aspect-video rounded-sm bg-muted/50" />
        <div className="aspect-video rounded-sm bg-muted/50" />
      </div> */}
    </div>
  );
}
