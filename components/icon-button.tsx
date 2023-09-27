import { LucideIcon } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  icon: LucideIcon;
}

export default function IconButton({ icon: Icon, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-gray-300 h-12 w-12 rounded-full items-center justify-center"
    >
      <Icon size={20} />
    </TouchableOpacity>
  );
}
