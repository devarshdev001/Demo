import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from './DashboardOverview';
import { OrderStatistics } from './OrderStatistics';
import { CustomizeMenu } from './CustomizeMenu';
import { MenuQR } from './MenuQR';
import { Notifications } from './Notifications';
import { DashboardContact } from './DashboardContact';
import { Orders } from './Orders';
import { MenuPreview } from './MenuPreview';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type DashboardSection = 'overview' | 'orders' | 'customize-menu' | 'menu-qr' | 'preview' | 'notifications' | 'contact';

export function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [currentSection, setCurrentSection] = useState<DashboardSection>('overview');

  const renderSection = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <>
            <DashboardOverview />
            <OrderStatistics />
          </>
        );
      case 'orders':
        return <Orders />;
      case 'customize-menu':
        return <CustomizeMenu />;
      case 'menu-qr':
        return <MenuQR />;
      case 'preview':
        return <MenuPreview />;
      case 'notifications':
        return <Notifications />;
      case 'contact':
        return <DashboardContact />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout
      currentSection={currentSection}
      onNavigate={(section) => setCurrentSection(section as DashboardSection)}
      onLogout={onLogout}
      userEmail={userEmail}
    >
      {renderSection()}
    </DashboardLayout>
  );
}