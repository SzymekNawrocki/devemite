'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

const languages = [
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSwitcher({ scrolled }: { scrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.replace(newPathname);
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[1];

  return (
    <Select
      value={locale}
      onValueChange={handleLanguageChange}
      disabled={isPending}
    >
      <SelectTrigger
        aria-label="Select language"
        className={`w-[140px] h-10 gap-2 backdrop-blur-md transition-all duration-300 focus:ring-0 focus:ring-offset-0 ${
          scrolled
            ? 'bg-background/80 text-foreground border-border hover:bg-accent hover:text-accent-foreground'
            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="text-base leading-none">
            {currentLanguage.flag}
          </span>
          <span className="text-sm font-medium tracking-wide">
            {currentLanguage.label}
          </span>
        </div>
      </SelectTrigger>

      <SelectContent className="bg-popover text-popover-foreground backdrop-blur-xl border-border">
        {/* ... reszta kodu bez zmian ... */}
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-base leading-none">
                {lang.flag}
              </span>
              <span className="font-medium">{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}