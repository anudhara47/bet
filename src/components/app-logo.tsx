
import { cn } from "@/lib/utils";

const AppLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("font-headline font-black text-red-500", className)}>
      9X
    </div>
  );
};

export default AppLogo;
