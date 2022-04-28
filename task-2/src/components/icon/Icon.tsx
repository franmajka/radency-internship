import { Icons } from "../../app/types"

export interface IconProps {
  color: string,
  size: string,
  icon: Icons
};

export const Icon = ({ color, size, icon } : IconProps) => (
  <span className={`icon-${icon}`} style={{
    color,
    fontSize: size
  }} />
)
