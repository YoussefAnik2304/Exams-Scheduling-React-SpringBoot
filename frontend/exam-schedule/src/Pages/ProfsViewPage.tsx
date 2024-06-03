import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Prof } from "@/types/prof";
import { Button } from "@/components/ui/button";
import { handleFetch } from "@/api/axios";

export default function   ProfsViewPage() {
  // const { getProfs, deleteProf } = useProfs();
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

  const handleDelete = async (profId: number | undefined) => {
    try {
      await handleFetch(`Professors/remove/${profId}`, "DELETE");
      setProfs(profs.filter((prof) => prof.id !== profId));
    } catch (error) {
      console.error("Error deleting professor:", error instanceof Error? error.message : error);
      setError("Error deleting professor");
    }
  };

  return (
      <div className="flex flex-col justify-center sm:gap-4 sm:pl-14 bg-background">
        <div className="px-4 md:px-20 py-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Professors View Page</h1>
            <div className="flex space-x-2">
              <Button className="mt-4" variant="outline" onClick={fetchProfs}>
                Fetch Professors
              </Button>
              <Link to="/admin/profs/create" className="px-2 md:px-6">
                <Button className="space-x-2 w-full md:w-fit">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>Add Prof</span>
                </Button>
              </Link>
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
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
                      <Button asChild className="w-full" variant={"outline"}>
                        <Link to={`/admin/prof/${prof.id}`} className="text-black  mt-4 block">
                          View Details
                        </Link>
                      </Button>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
}