import { useNavigate, useParams } from "react-router-dom";
import {  useState } from "react";
import { Button } from "@/components/ui/button";
import {Prof} from "@/types/prof.ts";

const ProfViewPage = () => {
  const navigate = useNavigate();
  const { email, firstName, lastName } = useParams();
  const [prof] = useState<Prof>();


  /*useEffect(() => {
    const fetchProf = async () => {
      try {
        const profData = await getProf(Number(id));
        // Assuming response.data contains the single professor
        setProf(profData);
      } catch (error) {
        console.error("Error fetching professor:", error instanceof Error? error.message : error);
      }
    };

    fetchProf();
  }, [id]);*/

  return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Professor Details</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <tbody>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">First Name</td>
                <td className="px-6 py-4">{firstName}</td>
              </tr>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">Last Name</td>
                <td className="px-6 py-4">{lastName}</td>
              </tr>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">Email</td>
                <td className="px-6 py-4">{email}</td>
              </tr>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">Departement</td>
                <td className="px-6 py-4">{prof?.departement}</td>
              </tr>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">Filiere</td>
                <td className="px-6 py-4">{prof?.filiere}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => navigate("/admin/profs")} variant={"outline"}>
              Back
            </Button>
          </div>
        </div>
      </div>
  );
};

export default ProfViewPage;
