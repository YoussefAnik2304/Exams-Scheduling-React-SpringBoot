import React, { useState } from "react";
import { useGroups } from "@/context/GroupContext";
import { Group } from "@/types/Group";
import { useNavigate } from "react-router-dom";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

const CreateGroupPage: React.FC = () => {
    const { createGroup } = useGroups();
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newGroup: Group = { id: 0, name, members: [] };
        await createGroup(newGroup);
        navigate("/Groups");
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
                    <Button type="submit" className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-700">
                        Create
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateGroupPage;