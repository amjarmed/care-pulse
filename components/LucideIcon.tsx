import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size: number;
  styles: string;
}
const LucIcon = ({ name, color, size, styles }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={styles} />;
};

export default LucIcon;
