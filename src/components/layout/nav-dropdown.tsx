'use client';

import React from 'react';
import Link from 'next/link';

export interface DropdownSimpleItem {
  title: string;
  description: string;
  href: string;
}

interface NavDropdownProps {
  title: string;
  items: DropdownSimpleItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function NavDropdown({ items, isOpen, onClose }: NavDropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-1 w-[290px] bg-white rounded-xl shadow-xl border border-neutral-200/90 p-2 z-50 transition-all animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseLeave={onClose}
    >
      <div className="space-y-0.5">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={onClose}
            className="group block p-2 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="text-[12.5px] font-bold text-neutral-900 group-hover:text-black transition-colors leading-snug">
              {item.title}
            </div>
            {item.description && (
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                {item.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
