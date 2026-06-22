import UserNavbar from "./UserNavbar";

function Profile() {

  const user = {
    name: "Chintu",
    email: "chintu@gmail.com",
    age: 20,
    gender: "Male",
    height: 170,
    weight: 60,
  };

  const fitness = {
    goal: "Muscle Gain",
    calories: 2500,
    protein: 120,
  };

  return (
    <div className="max-w-5xl mx-auto px-4">

      <UserNavbar />

      <div className="mt-6">

        <h1 className="text-3xl font-bold mb-2">
          Profile
        </h1>

        <p className="text-gray-500 mb-6">
          View your personal information and fitness details.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Personal Info */}

          <div className="bg-white shadow-lg rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Personal Information
            </h2>

            <div className="space-y-3">

              <p><strong>Name:</strong> {user.name}</p>

              <p><strong>Email:</strong> {user.email}</p>

              <p><strong>Age:</strong> {user.age} years</p>

              <p><strong>Gender:</strong> {user.gender}</p>

              <p><strong>Height:</strong> {user.height} cm</p>

              <p><strong>Weight:</strong> {user.weight} kg</p>

            </div>

          </div>

          {/* Fitness Goal */}

          <div className="bg-white shadow-lg rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Fitness Goal
            </h2>

            <div className="space-y-3">

              <p><strong>Goal:</strong> {fitness.goal}</p>

              <p>
                <strong>Daily Calories Target:</strong>{" "}
                {fitness.calories} kcal
              </p>

              <p>
                <strong>Daily Protein Target:</strong>{" "}
                {fitness.protein} g
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;