import React, {useEffect, useState} from "react";
import { useGroups } from "@/context/GroupContext";
import { Group } from "@/types/Group";
import {useNavigate, useParams} from "react-router-dom";
import {Card,CardContent,CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

const EditGroupPage: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const { getGroup, updateGroup } = useGroups();
    const navigate = useNavigate();
    const [group, setGroup] = useState<Group | null>(null);
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchGroup = async () => {
            if (groupId) {
                const groupData = await getGroup(Number(groupId));
                setGroup(groupData);
                setName(groupData.name);
            }
        };
        fetchGroup();
    }, [groupId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (group) {
            const updatedGroup: Group = { ...group, name };
            await updateGroup(updatedGroup, updatedGroup.id!);
            navigate(`/Groups/${group.id}`);
        }
    };

    if (!group) return <div>Loading...</div>;

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-xl font-bold">Edit Group</CardHeader>
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
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditGroupPage;