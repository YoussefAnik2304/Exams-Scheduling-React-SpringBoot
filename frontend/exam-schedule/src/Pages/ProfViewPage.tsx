import { useNavigate, useParams } from "react-router-dom";
import { Prof } from "@/types/prof.ts";
import { useProfs } from "@/context/ProfsContext.tsx";
import { useEffect, useState } from "react";
const ProfDetailsPage = () => {
  const navigate = useNavigate();
  const { id,email,firstName,lastName } = useParams();
  const [prof, setProf] = useState<Prof>();
    const { getProf }=useProfs();
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
    <div>
      <h1>Professor Details</h1>
      
        <div>
          <p>First Name: {firstName}</p>
          
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          
        </div>
      
    </div>
  );
};

export default ProfDetailsPage;