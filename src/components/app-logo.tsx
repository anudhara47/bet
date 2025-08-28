
import { cn } from "@/lib/utils";

const AppLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("font-headline font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent", className)}>
      9X
    </div>
  );
};

export default AppLogo;
