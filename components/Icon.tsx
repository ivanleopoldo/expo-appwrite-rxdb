import { icons } from 'lucide-react-native';

import { iconWithClassName } from '@/lib/iconWithClassName';
import { cn } from '@/lib/utils';

export default function Icon({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
}) {
  const LucideIcon = icons[name];

  iconWithClassName(LucideIcon);

  return (
    <LucideIcon
      strokeWidth={1.5}
      color={color}
      size={size}
      className={cn(!color && 'text-foreground', className)}
    />
  );
}
