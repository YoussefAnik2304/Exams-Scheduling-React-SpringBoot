import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfs } from "@/context/ProfsContext.tsx";
import { Prof } from "@/types/prof.ts";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { handleFetch } from "@/api/axios";
import { DataTable } from "@/components/data-table/data-table"; // Adjust the import path as needed
import {
    useReactTable,
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

export default function ProfViewPage() {
    const navigate = useNavigate();
    const { deleteProf } = useProfs();
    const [profs, setProfs] = useState<Prof[]>([]);

    useEffect(() => {
        const fetchProfs = async () => {
            try {
                const response = await handleFetch('Professors/List', 'GET');
                const profsData = response.data as Prof[]; // Assuming response.data contains the array of professors
                setProfs(profsData);
            } catch (error) {
                console.error("Error fetching professors:", error instanceof Error ? error.message : error);
            }
        };

        fetchProfs();
    }, []);

    const handleEdit = (prof: Prof) => {
        navigate(`/admin/edit/${prof.id}`, { state: { prof } });
    };

    const handleDelete = async (profId: number) => {
        await deleteProf(profId);
        setProfs(profs.filter((prof) => prof.id !== profId));
    };

    const columns = useMemo<ColumnDef<Prof>[]>(
        () => [
            {
                accessorKey: "firstName",
                header: "First Name",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "lastName",
                header: "Last Name",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "email",
                header: "Email",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "filiere",
                header: "Filiere",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "departement",
                header: "Departement",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div>
                        <Button
                            type="button"
                            onClick={() => handleEdit(row.original)}
                            className="bg-blue-500 text-white mr-2"
                        >
                            Edit
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleDelete(row.original.id!)}
                            className="bg-red-500 text-white"
                        >
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: profs,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Professors List</h1>
                <Button
                    type="button"
                    onClick={() => navigate("/admin/profs")}
                    className="text-white"
                >
                    Return Back
                </Button>
            </div>
            <DataTable table={table}/>
        </div>
    );
}
