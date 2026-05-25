# openseadragon-tester

- [TanStack Router Docs](https://tanstack.com/router)

## Adding components

To add components to your app, run the following command:

```sh
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from '@/components/ui/button';
```

## Symlinks for Dependency Project Dev

```sh
npm ls -g --depth=0 --link=true
npm ls --depth=0 --link=true
```

To link:

```sh
cd \repos\openseadragon
npm link
cd \repos\openseadragon-tester
npm link openseadragon
```

To restore:

```sh
cd \repos\openseadragon-tester
npm unlink --no-save openseadragon
npm unlink -g openseadragon
npm install openseadragon
```

To link:

```sh
cd \repos\openseadragon-imaginghelper
npm link
cd ..\openseadragon-tester
npm link @openseadragon-imaging/openseadragon-imaginghelper
```

To restore:

```sh
cd \repos\openseadragon-tester
npm unlink --no-save @openseadragon-imaging/openseadragon-imaginghelper
npm unlink -g @openseadragon-imaging/openseadragon-imaginghelper
npm install @openseadragon-imaging/openseadragon-imaginghelper
```
