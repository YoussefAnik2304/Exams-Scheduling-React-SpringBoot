import React, {useEffect, useState} from "react";
import { useGroups } from "@/context/GroupContext";
import { Group } from "@/types/Group";
import {Link, useParams} from "react-router-dom";
import {Card,CardContent,CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";


const GroupViewPage: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const { getGroup } = useGroups();
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            if (groupId) {
                const groupData = await getGroup(Number(groupId));
                setGroup(groupData);
            }
        };
        fetchGroup();
    }, [groupId]);

    if (!group) return <div>Loading...</div>;

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-xl font-bold">{group.name}</CardHeader>
            <CardContent>
                <h2 className="text-lg font-medium mb-4">Members</h2>
                <ul className="mb-4">
                    {group.members.map((member) => (
                        <li key={member.Id}>
                            {member.FirstName} {member.LastName}
                        </li>
                    ))}
                </ul>
                <Button asChild className="bg-blue-500 text-white hover:bg-blue-700">
                    <Link to={`/Groups/edit/${group.id}`}>Edit</Link>
                </Button>

            </CardContent>
        </Card>
    );
};

export default GroupViewPage;