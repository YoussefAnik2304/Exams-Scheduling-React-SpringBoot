import { useToast } from "@/components/ui/use-toast";

const useToastHelper = () => {
    const { toast } = useToast();

    const showToast = (title: string, description: string) => {
        toast({
            title,
            description,
        });
    };

    return {
        showToast,
    };
};

export default useToastHelper;
