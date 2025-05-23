import React, { useState, useEffect, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, disabled, ...props }, ref) => {
    const [view, setView] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const showPassword = () => {
      if (!disabled) {
        setIsMouseDown(true);
        setView(true);
      }
    };

    const hidePassword = () => {
      setIsMouseDown(false);
      setView(false);
    };

    useEffect(() => {
      if (view) {
        const timer = setTimeout(hidePassword, 800);
        return () => clearTimeout(timer);
      }
    }, [view]);

    return (
      <div className="relative">
        <Input
          placeholder={placeholder}
          ref={ref}
          type={view ? "text" : "password"}
          disabled={disabled}
          {...props}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="absolute right-4 top-1/2 -translate-y-1/2"
              tabIndex={-1}
            >
              {isMouseDown ? (
                <EyeOff
                  className="text-gray-600 h-5 w-5 cursor-pointer"
                  onMouseUp={hidePassword}
                  onMouseLeave={hidePassword}
                  onTouchEnd={hidePassword}
                  onTouchCancel={hidePassword}
                  onTouchMove={hidePassword}
                />
              ) : (
                <Eye
                  className="text-gray-600 h-5 w-5 cursor-pointer"
                  onMouseDown={showPassword}
                  onTouchStart={showPassword}
                />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>View Password</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
