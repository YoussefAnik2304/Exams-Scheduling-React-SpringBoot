import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfs } from "@/context/ProfsContext.tsx";
import { Prof } from "@/types/prof.ts";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed

export default function ProfsViewPage() {
    const { getProfs, deleteProf } = useProfs();
    const [profs, setProfs] = useState<Prof[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfs = async () => {
            try {
                const profsData = await getProfs();
                setProfs(profsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching professors:", error instanceof Error ? error.message : error);
                setError("Error fetching professors");
                setLoading(false);
            }
        };

        fetchProfs();
    }, [getProfs]);

    const handleEdit = (prof: Prof) => {
        navigate(`/edit-prof/${prof.Id}`, { state: { prof } });
    };

    const handleDelete = async (profId: number) => {
        try {
            await deleteProf(profId);
            setProfs(profs.filter((prof) => prof.Id !== profId));
        } catch (error) {
            console.error("Error deleting professor:", error instanceof Error ? error.message : error);
            setError("Error deleting professor");
        }
    };

    return (
        <div>
            <h1>Professors View Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="grid md:grid-cols-3 gap-3">
                    {profs.map((prof) => (
                        <div key={prof.Id} className="p-4 border rounded shadow-md">
                            <h2 className="text-xl font-semibold">{prof.FirstName} {prof.LastName}</h2>
                            <div className="flex space-x-4 mt-4">
                                <Button
                                    type="button"
                                    onClick={() => handleEdit(prof)}
                                    className="w-full bg-blue-500 text-white"
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => handleDelete(prof.Id!)}
                                    className="w-full bg-red-500 text-white"
                                >
                                    Delete
                                </Button>
                            </div>
                            <Link to={`/prof/${prof.Id}`} className="text-blue-500 underline mt-4 block">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
