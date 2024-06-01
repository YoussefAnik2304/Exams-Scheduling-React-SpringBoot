import React, {useEffect, useState} from "react";
import { useGroups } from "@/context/GroupContext";
import { Group } from "@/types/Group";
import {Card,CardContent,CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";


const GroupsViewPage: React.FC = () => {
    const { getGroups } = useGroups();
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const groupsData = await getGroups();
            setGroups(groupsData);
        };
        fetchGroups();
    }, []);

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-xl font-bold">Groups</CardHeader>
            <CardContent>
                <Button asChild className="mb-4 w-full bg-primary text-white hover:bg-blue-800">
                    <Link to="/admin/Groups/create">Create</Link>
                </Button>

                <ul>
                    {groups.map((group) => (
                        <li key={group.id} className="mb-2">
                            <Link to={`/Groups/${group.id}`} className="text-blue-500 hover:underline">
                                {group.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default GroupsViewPage;