import type { ReactNode } from "react";
import AppHeader from "@/components/app-header";

type BaseLayoutProps = {
  children: ReactNode;
  className?: string;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, className }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className || ''}`}>
      <AppHeader />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
