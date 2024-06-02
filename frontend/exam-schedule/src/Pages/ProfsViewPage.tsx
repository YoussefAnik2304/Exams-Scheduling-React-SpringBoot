import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfs } from "@/context/ProfsContext";
import { Prof } from "@/types/prof";
import { Button } from "@/components/ui/button";
import { handleFetch } from "@/api/axios";

export default function ProfsViewPage() {
  const { getProfs, deleteProf } = useProfs();
  const [profs, setProfs] = useState<Prof[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfs();
  }, []);

  const fetchProfs = async () => {
    try {
      const response = await handleFetch("Professors/List", "GET");
      const profsData = response.data;
      setProfs(profsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching professors:", error instanceof Error? error.message : error);
      setError("Error fetching professors");
      setLoading(false);
    }
  };

  const handleEdit = (prof: Prof) => {
    navigate(`/admin/profs/edit/${prof.id}`, { state: { prof } });
  };

  const handleDelete = async (profId: number) => {
    try {
      await handleFetch(`Professors/remove/${profId}`, "DELETE");
      setProfs(profs.filter((prof) => prof.id !== profId));
    } catch (error) {
      console.error("Error deleting professor:", error instanceof Error? error.message : error);
      setError("Error deleting professor");
    }
  };

  return (
    <div>
      <h1>Professors View Page</h1>
      <Button onClick={fetchProfs}>Fetch Professors</Button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading &&!error && (
        <div className="grid md:grid-cols-3 gap-3">
          {profs.map((prof) => (
            <div key={prof.id} className="p-4 border rounded shadow-md">
              <h2 className="text-xl font-semibold">{prof.firstName} {prof.lastName}</h2>
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
                  onClick={() => handleDelete(prof.id)}
                  className="w-full bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
              <Button asChild className="mb-4 w-full bg-primary text-white hover:bg-blue-800">
                <Link to={`/prof/${prof.id}`} className="text-blue-500 underline mt-4 block">
                  View Details
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}