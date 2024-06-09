import * as React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Prof } from "@/types/prof";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useProfs } from "@/context/ProfsContext.tsx";
import { FormControl } from "@/components/ui/form.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const EditProfPopover = ({ isOpen, onClose, prof }: { isOpen: boolean, onClose: () => void, prof: Prof }) => {
    const methods = useForm<Prof>({
        defaultValues: {
            firstName: prof.firstName,
            lastName: prof.lastName,
            email: prof.email,
            password: prof.password,
            filiere: prof.filiere,
            departement: prof.departement,
        },
    });

    const { updateProf } = useProfs();
    const [formValues, setFormValues] = useState<Prof>({
        firstName: prof.firstName,
        lastName: prof.lastName,
        email: prof.email,
        password: prof.password,
        filiere: prof.filiere,
        departement: prof.departement,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (field: keyof Prof, value: string) => {
        setFormValues({ ...formValues, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (prof && prof.id !== undefined) {
            await updateProf(formValues, prof.id);
            onClose(); // Close the popover after updating the professor
        }
    };

    return (
        <FormProvider {...methods}>
            <Popover open={isOpen} onOpenChange={onClose}>
                <PopoverTrigger asChild>
                    <span></span>
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
                            <FormControl>
                                <Select value={formValues.filiere} onValueChange={(value) => handleSelectChange("filiere", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filiere" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="GENIEINFORMATIQUE">Software Engineering</SelectItem>
                                            <SelectItem value="GENIECIVIL">Civil Engineering</SelectItem>
                                            <SelectItem value="INGENIEIRIEDETATA">Data Engineering</SelectItem>
                                            <SelectItem value="GENIEENERGITIQUE">Energitic Engineering</SelectItem>
                                            <SelectItem value="GENIEMECANIQUE">Mechanical Engineering</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Label htmlFor="departement">Departement</Label>
                            <FormControl>
                                <Select value={formValues.departement} onValueChange={(value) => handleSelectChange("departement", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Departement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="INFORMATIQUE">Informatique</SelectItem>
                                            <SelectItem value="MECANIQUE">Mecanique</SelectItem>
                                            <SelectItem value="ENERGETIQUE">Energetique</SelectItem>
                                            <SelectItem value="CIVIL">Civil</SelectItem>
                                            <SelectItem value="DATA">Data</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button type="submit" className="w-full">
                                Save Changes
                            </Button>
                            <Button type="button" className="w-full" variant={"outline"} onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </PopoverContent>
            </Popover>
        </FormProvider>
    );
};
