// @ts-ignore
import Button from "@material-tailwind/react/Button";

interface ButtonProps {
  rounded?: boolean;
  className?: string;
  onClick?: (event: any) => void;
}

const IconButton: React.FC<ButtonProps> = ({
  children,
  rounded = false,
  className,
  onClick,
}) => {
  return (
    <Button
      color="gray"
      buttonType="outline"
      rounded={rounded}
      iconOnly={true}
      ripple="dark"
      className={`border-none ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default IconButton;
