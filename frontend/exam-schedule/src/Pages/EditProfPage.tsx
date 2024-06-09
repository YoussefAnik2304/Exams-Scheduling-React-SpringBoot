import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfs } from "@/context/ProfsContext.tsx";
import { Prof } from "@/types/prof.ts";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EditProfPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateProf, getProf } = useProfs();
    const [prof, setProf] = useState<Prof | null>(null);
    const [formValues, setFormValues] = useState<Prof>({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        filiere: '',
        departement: '',
    });
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchProf = async () => {
            if (location.state && location.state.profId) {
                try {
                    const profData = await getProf(location.state.profId);
                    setProf(profData);
                    setFormValues(profData);
                } catch (error) {
                    console.error("Error fetching professor:", error instanceof Error ? error.message : error);
                }
            } else {
                console.error("profId is not available in location.state");
            }
        };

        fetchProf();
    }, [getProf, location.state]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (prof && prof.id) {
            await updateProf(formValues, prof.id);
            setIsPopoverOpen(false);
            navigate("/admin/profs");
        }
    };

    if (!location.state || !location.state.profId) {
        return <div>Error: Professor ID not found.</div>;
    }

    return (
        <div>
            {prof && (
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button onClick={() => setIsPopoverOpen(true)}>Edit Professor</Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="filiere">Filiere</Label>
                                <Input
                                    type="text"
                                    name="filiere"
                                    value={formValues.filiere}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="departement">Departement</Label>
                                <Input
                                    type="text"
                                    name="departement"
                                    value={formValues.departement}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button type="submit" className="w-full">
                                    Save Changes
                                </Button>
                                <Button type="button" className="w-full" onClick={() => setIsPopoverOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
}
