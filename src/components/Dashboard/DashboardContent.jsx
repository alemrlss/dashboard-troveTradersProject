import { BsPersonCheck, BsPersonPlus, BsCheck, BsPlay } from "react-icons/bs";
import TopUsersCard from "./TopUsersCards";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Graphics from "./Graphics";

const DashboardContent = () => {
  const [data, setData] = useState(null);
  const [dataBar, setDataBar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/dashboard/info`
        );

        const responseBar = await axios.get(
          `http://localhost:3001/posts/categories/count`
        );
        setDataBar(responseBar.data);
        setLoading(false);
        setData([
          {
            title: "Usuarios verificados",
            count: response.data.verified,
            icon: BsPersonCheck,
            color: "#42a5f5",
          },
          {
            title: "Usuarios registrados",
            count: response.data.registered,
            icon: BsPersonPlus,
            color: "#66bb6a",
          },
          {
            title: "Trades Finalizados",
            count: response.data.finishedTradesCount,
            icon: BsCheck,
            color: "#fbc02d",
          },
          {
            title: "Trades en Ejecucion",
            count: response.data.runningTrades,
            icon: BsPlay,
            color: "#ef5350",
          },
        ]);
      } catch (error) {
        console.log(error); //PROGRAMAR ERROR.
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UserData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      photo: "https://via.placeholder.com/50?text=John",
      verified: true,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      photo: "https://via.placeholder.com/50?text=Jane",
      verified: false,
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael@example.com",
      photo: "https://via.placeholder.com/50?text=Michael",
      verified: true,
    },
    {
      id: 4,
      firstName: "David",
      lastName: "Brown",
      email: "david@example.com",
      photo: "https://via.placeholder.com/50?text=David",
      verified: true,
    },
    {
      id: 5,
      firstName: "Sarah",
      lastName: "Miller",
      email: "sarah@example.com",
      photo: "https://via.placeholder.com/50?text=Sarah",
      verified: false,
    },
    {
      id: 6,
      firstName: "Daniel",
      lastName: "Wilson",
      email: "daniel@example.com",
      photo: "https://via.placeholder.com/50?text=Daniel",
      verified: true,
    },
    {
      id: 7,
      firstName: "Emily",
      lastName: "Taylor",
      email: "emily@example.com",
      photo: "https://via.placeholder.com/50?text=Emily",
      verified: true,
    },
    {
      id: 8,
      firstName: "Christopher",
      lastName: "Anderson",
      email: "christopher@example.com",
      photo: "https://via.placeholder.com/50?text=Christopher",
      verified: false,
    },
    {
      id: 9,
      firstName: "Olivia",
      lastName: "Thomas",
      email: "olivia@example.com",
      photo: "https://via.placeholder.com/50?text=Olivia",
      verified: true,
    },
    {
      id: 10,
      firstName: "James",
      lastName: "Harris",
      email: "james@example.com",
      photo: "https://via.placeholder.com/50?text=James",
      verified: false,
    },
    {
      id: 11,
      firstName: "Sophia",
      lastName: "Martin",
      email: "sophia@example.com",
      photo: "https://via.placeholder.com/50?text=Sophia",
      verified: true,
    },
    {
      id: 12,
      firstName: "William",
      lastName: "Jackson",
      email: "william@example.com",
      photo: "https://via.placeholder.com/50?text=William",
      verified: true,
    },
    {
      id: 13,
      firstName: "Ava",
      lastName: "White",
      email: "ava@example.com",
      photo: "https://via.placeholder.com/50?text=Ava",
      verified: false,
    },
    {
      id: 14,
      firstName: "Alexander",
      lastName: "Lee",
      email: "alexander@example.com",
      photo: "https://via.placeholder.com/50?text=Alexander",
      verified: true,
    },
    {
      id: 15,
      firstName: "Mia",
      lastName: "Scott",
      email: "mia@example.com",
      photo: "https://via.placeholder.com/50?text=Mia",
      verified: true,
    },
    {
      id: 16,
      firstName: "Ethan",
      lastName: "Green",
      email: "ethan@example.com",
      photo: "https://via.placeholder.com/50?text=Ethan",
      verified: false,
    },
    {
      id: 17,
      firstName: "Abigail",
      lastName: "Hall",
      email: "abigail@example.com",
      photo: "https://via.placeholder.com/50?text=Abigail",
      verified: true,
    },
    {
      id: 18,
      firstName: "Benjamin",
      lastName: "Baker",
      email: "benjamin@example.com",
      photo: "https://via.placeholder.com/50?text=Benjamin",
      verified: true,
    },
    {
      id: 19,
      firstName: "Isabella",
      lastName: "Nelson",
      email: "isabella@example.com",
      photo: "https://via.placeholder.com/50?text=Isabella",
      verified: false,
    },
    {
      id: 20,
      firstName: "Daniel",
      lastName: "Johnson",
      email: "daniel2@example.com",
      photo: "https://via.placeholder.com/50?text=Daniel",
      verified: true,
    },
  ];

  return (
    <div className="p-2">
      {loading && <Loader />}
      {data && (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade animate-duration-1000">
            {data.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg text-center flex items-center p-2"
                  style={{ borderColor: item.color }}
                >
                  <div className="mr-4">
                    <Icon className="text-4xl" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-2xl font-bold text-blue-500">
                      {item.count}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Graphics
            usersVerified={data[0].count}
            usersRegistered={data[1].count}
            dataBar={dataBar}
          />

          <div className="hidden grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-2 animate-fade animate-duration-1000">
            <TopUsersCard users={UserData} category="tradesAsSeller" />
            <TopUsersCard users={UserData} category="ranking" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
