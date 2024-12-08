import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

function SubmitButton({ isLoading, className, children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={className ?? "shad-primary-btn w-full"}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-4 ">
          <Image
            src="/assets/icons/loader.svg"
            alt="loading"
            width={24}
            height={24}
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
