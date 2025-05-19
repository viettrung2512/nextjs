// app/layout.tsx
import './globals.scss'; // đổi sang SCSS
import { ReactNode } from 'react';
import { TaskProvider } from '../context/TaskContext';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
