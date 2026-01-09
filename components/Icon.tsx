import React from 'react';
import { 
  Compass, 
  DollarSign, 
  Megaphone, 
  Package, 
  Truck, 
  Users, 
  Cpu, 
  Headphones, 
  Scale, 
  Kanban,
  Bot,
  Sparkles,
  CheckCircle2,
  X,
  FlaskConical,
  BarChart3
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass, 
  DollarSign, 
  Megaphone, 
  Package, 
  Truck, 
  Users, 
  Cpu, 
  Headphones, 
  Scale, 
  Kanban,
  Bot,
  Sparkles,
  CheckCircle2,
  X,
  FlaskConical,
  BarChart3
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const LucideIcon = iconMap[name] || Bot;
  return <LucideIcon className={className} size={size} />;
};