'use client';

import { Button } from '@/components/ui/button';
import { ShoppingBag, Ticket } from 'lucide-react';

type NavSection = 'meeting' | 'goods';

interface NavbarProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-primary-light shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-primary-dark">
              유메키 팬미팅
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={activeSection === 'meeting' ? 'default' : 'ghost'}
              className={
                activeSection === 'meeting'
                  ? 'bg-secondary text-white hover:bg-secondary-dark'
                  : 'text-primary-dark hover:bg-primary-light'
              }
              onClick={() => onSectionChange('meeting')}
            >
              <Ticket className="w-4 h-4 mr-2" />
              팬미팅 정보
            </Button>
            <Button
              variant={activeSection === 'goods' ? 'default' : 'ghost'}
              className={
                activeSection === 'goods'
                  ? 'bg-secondary text-white hover:bg-secondary-dark'
                  : 'text-primary-dark hover:bg-primary-light'
              }
              onClick={() => onSectionChange('goods')}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              굿즈 정보
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

