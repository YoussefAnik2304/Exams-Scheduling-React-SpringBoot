import React, { useState } from "react";
import { useGroups } from "@/context/GroupContext";
import { Group } from "@/types/Group";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const filiereOptions = ["Genie Mecanique", "Genie Civil", "Genie Informatique"];
const departementOptions = ["Mecanique", "Civil", "Informatique"];

const CreateGroupPage: React.FC = () => {
    const { createGroup } = useGroups();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [firstSelect, setFirstSelect] = useState("");
    const [secondSelect, setSecondSelect] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newGroup: Group = {
            id: 0,
            name,
            filiere: firstSelect === 'filiere' ? secondSelect : '',
            departement: firstSelect === 'departement' ? secondSelect : '',
        };
        await createGroup(newGroup);
        navigate("/admin/Groups");
    };

    const getSecondSelectOptions = () => {
        if (firstSelect === "filiere") {
            return filiereOptions;
        } else if (firstSelect === "departement") {
            return departementOptions;
        }
        return [];
    };

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-xl font-bold">Create Group</CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Name</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Create by</Label>
                        <Select
                            value={firstSelect}
                            onValueChange={(value) => {
                                setFirstSelect(value);
                                setSecondSelect(""); // Reset second select when first select changes
                            }}
                            required
                        >
                            <SelectTrigger className="mt-1 block w-full">
                                <SelectValue placeholder="Select Option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="filiere">Filiere</SelectItem>
                                <SelectItem value="departement">Departement</SelectItem>
                                <SelectItem value="random">Random</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {firstSelect && firstSelect !== 'random' && (
                        <div className="mb-4">
                            <Label className="block text-sm font-medium text-gray-700">
                                {firstSelect.charAt(0).toUpperCase() + firstSelect.slice(1)}
                            </Label>
                            <Select
                                value={secondSelect}
                                onValueChange={(value) => setSecondSelect(value)}
                                required
                            >
                                <SelectTrigger className="mt-1 block w-full">
                                    <SelectValue placeholder={`Select ${firstSelect.charAt(0).toUpperCase() + firstSelect.slice(1)}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {getSecondSelectOptions().map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <Button type="submit" className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-700">
                        Create
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateGroupPage;
