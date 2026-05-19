import type { ReactNode } from 'react';
import { Footer, Header } from '@govie-ds/react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        addDefaultMobileMenu
        mobileMenuLabel="Menu"
        items={[
          {
            itemType: 'link',
            label: 'Log out',
            icon: 'logout',
            href: '/',
            showItemMode: 'always',
          },
        ]}
      />
      <main className="flex-1 px-lg py-lg md:px-2xl md:py-2xl">
        {children}
      </main>
      <Footer
        utilitySlot={
          <div className="flex flex-wrap gap-md">
            <a href="#" className="underline">
              Accessibility
            </a>
            <span>© 2026 Government of Ireland.</span>
          </div>
        }
      />
    </div>
  );
}
