import React, { useEffect, useState } from "react";
import { useGroups } from "@/context/GroupContext";
import { Group } from "@/types/Group";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/data-table/data-table";
import {
    useReactTable,
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

const GroupsViewPage: React.FC = () => {
    const { getGroups, deleteGroup } = useGroups();
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const groupsData = await getGroups();
            setGroups(groupsData);
        };
        fetchGroups();
    }, [getGroups]);

    const handleDelete = async (groupId: number) => {
        try {
            await deleteGroup(groupId);
            setGroups(groups.filter((group) => group.id !== groupId));
        } catch (error) {
            console.error("Error deleting group:", error instanceof Error ? error.message : error);
        }
    };

    const handleEdit = (groupId: number) => {

    };

    const columns: ColumnDef<Group>[] = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "filiere", header: "Filiere" },
        { accessorKey: "departement", header: "Departement" },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div>
                    <Button onClick={() => handleEdit(row.original.id!)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.original.id!)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: groups,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-xl font-bold mb-4">Groups</h1>
            <DataTable<Group> table={table} />
            <Button asChild className="mb-4 w-full bg-primary text-white hover:bg-blue-800">
                <Link to="/admin/Groups/create">Create</Link>
            </Button>
        </div>
    );
};

export default GroupsViewPage;
