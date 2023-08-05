/* eslint-disable react/prop-types */

const TopUsersCard = ({ users, category }) => {
  // Ordenar los usuarios según la categoría seleccionada
  const sortedUsers = users.sort((a, b) => {
    switch (category) {
      case "tradesAsSeller":
        return b.tradesAsSeller - a.tradesAsSeller;
      case "tradesAsBuyer":
        return b.tradesAsBuyer - a.tradesAsBuyer;
      case "warnings":
        return b.warnings - a.warnings;
      case "ranking":
        return b.ranking - a.ranking;
      default:
        return 0;
    }
  });

  // Tomar los 3 primeros usuarios (top 3)
  const topUsers = sortedUsers.slice(0, 3);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg text-center mt-2">
      <h3 className="text-lg font-semibold mb-4">
        {category === "tradesAsSeller" && "Top 3 Vendedores con más Trades"}
        {category === "tradesAsBuyer" && "Top 3 Compradores con más Trades"}
        {category === "warnings" && "Top 3 Usuarios con más Advertencias"}
        {category === "ranking" && "Top 3 Usuarios con mayor Ranking"}
      </h3>
      {topUsers.map((user, index) => (
        <div key={index} className="flex items-center mb-2">
          <img
            src={user.photo}
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
          <p className="text-lg">{`${user.firstName} ${user.lastName}`}</p>
          {category === "ranking" && (
            <div className="ml-auto flex items-center">
              {Array.from({ length: Math.floor(user.ranking) }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="yellow"
                  className="w-4 h-4 text-yellow-500 mr-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0l3.09 8.566 8.559.098-6.559 4.961 2.47 8.375-7.47-5.503-7.25 5.584 2.391-8.438-6.078-4.914h7.098z" />
                </svg>
              ))}
              <span className="font-bold">{user.ranking}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopUsersCard;
