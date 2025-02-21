import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";
import { useToast } from "../ui/use-toast";

// Composant pour afficher les toasts
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

// Exemple de composant pour ajouter un toast
function ExampleButton() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Report Submitted",
      description: "Your report has been successfully submitted!",
      variant: "default", // Utiliser une variante, "default" ou "destructive"
    });
  };

  return <button onClick={handleClick}>Submit Report</button>;
}

// Exporter si besoin
export { ExampleButton };
