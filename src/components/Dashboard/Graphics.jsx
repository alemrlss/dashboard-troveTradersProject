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
function Graphics({ usersVerified, usersRegistered }) {
  console.log(usersRegistered, usersVerified);
  const verifiedUnverifiedData = [
    { name: "Verificados", value: usersVerified },
    { name: "No Verificados", value: usersRegistered - usersVerified },
  ];

  const genderChartData = [
    { name: "Masculino", value: 29 },
    { name: "Femenino", value: 40 },
    { name: "No Especificado", value: 10 },
  ];

  const COLORS = ["#42a5f5", "#F74343", "#FF0000", "#800080", "#e0e0e0"];

  return (
    <div className="hidden sm:flex  mt-4">
      <div className="bg-white p-6 shadow-lg rounded-lg border-2 border-blue-500 w-1/2 mr-4">
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

      <div className="bg-white p-6 shadow-lg rounded-lg border-2 border-blue-500 w-1/2">
        <h3 className="text-lg font-semibold mb-2">Distribución de Género</h3>
        <BarChart
          width={400}
          height={400}
          data={genderChartData}
          className="pt-8"
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ backgroundColor: "#ffff", color: "#FF0000" }}
          />
          <Bar dataKey="value" fill="#8884d8">
            {genderChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index + (2 % COLORS.length)]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}

export default Graphics;
