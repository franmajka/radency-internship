import { Icon, IconProps } from "./Icon"

export interface RoundIconProps extends IconProps {
  background: string
};

const parseSize = (size: string) => ({
  value: parseFloat(size),
  units: (size.match(/[a-z]+$/) ?? [])[0] ?? ''
})

export const RoundIcon = ({
  background,
  size,
  color,
  icon
} : RoundIconProps) => {
  const { value: sizeValue, units } = parseSize(size);

  return (
    <div
      style={{
        backgroundColor: background,
        width: size,
        height: size
      }}
      className={`
        inline-flex
        justify-center
        items-center
        rounded-full
      `}
    >
      <Icon
        color={color}
        icon={icon}
        size={`${sizeValue / 2}${units}`}
      />
    </div>
  );
};
