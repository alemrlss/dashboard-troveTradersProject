/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
} from "recharts";
function Graphics({ usersVerified, usersRegistered, dataBar }) {
  console.log(dataBar);
  const verifiedUnverifiedData = [
    { name: "Verificados", value: usersVerified },
    { name: "No Verificados", value: usersRegistered - usersVerified },
  ];

  const COLORS = ["#91E06A", "#F95047", "#FF0000", "#800080", "#e0e0e0"];

  const COLORS_BAR = {
    Antiguedades: "#42a5f5",
    Musica: "#F74343",
    Cartas: "#FF0000",
    Tecnologia: "#800080",
    Comics: "#e0e0e0",
    Juguetes: "#64dd17",
    Deportes: "#ff9800",
    Libros: "#9c27b0",
    Otros: "#607d8b",
  };
  return (
    <div className="hidden sm:flex  mt-4">
      <div className="bg-white p-6 shadow-lg rounded-lg border-2 border-primary-300 w-1/2 mr-4">
        <h3 className="text-lg font-semibold mb-2">Usuarios Verificados</h3>
        <div className="flex justify-center items-center">
          <PieChart width={400} height={400}>
            <Pie
              data={verifiedUnverifiedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={150}
              fill="#8884d8"
            >
              {verifiedUnverifiedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="cursor-pointer hover:opacity-75"
                />
              ))}
            </Pie>
            <Legend align="center" layout="vertical" verticalAlign="bottom" />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#ffff",
                color: "#FF0000",
              }}
            />
          </PieChart>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg border-2 border-primary-300 w-1/2">
        <h3 className="text-lg font-semibold mb-2">
          Publicaciones por categorias
        </h3>
        <BarChart width={400} height={400} data={dataBar} className="pt-8">
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ backgroundColor: "#ffff", color: "#FF0000" }}
          />
          <Bar dataKey="value" fill="#8884d8">
            {dataBar.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS_BAR[entry.name] || "#716870"} // Usar el color del objeto COLORS_BAR
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}

export default Graphics;
