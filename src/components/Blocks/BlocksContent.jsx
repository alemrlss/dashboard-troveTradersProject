import Loader from "../Loader/Loader";
import BlockUser from "./BlockUser";
import BlockedUsersList from "./BlockUserList";
import { useState, useEffect } from "react";
import axios from "axios";
function BlocksContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/block/users`
        );

        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error); //PROGRAMAR ERROR.
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      {loading && <Loader />}
      {data && <BlockUser usuariosBloqueados={data} setUsuariosBloqueados={setData} />}
      {data && <BlockedUsersList usuariosBloqueados={data} setUsuariosBloqueados={setData} />}
    </div>
  );
}

export default BlocksContent;
