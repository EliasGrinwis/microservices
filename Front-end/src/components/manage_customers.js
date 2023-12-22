import React, {useState, useEffect} from "react";
import CustomerApi from "../apis/customer_api";
import Loading from "../components/loading";
import Error from "../components/error";

function ManageCustomers({userToken}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await CustomerApi.getCustomers(userToken);
        setCustomers(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [userToken]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Manage Customers</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Avatar</th>
            <th className="border p-2 text-left">First Name</th>
            <th className="border p-2 text-left">Last Name</th>
            <th className="border p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, i) => (
            <tr key={i}>
              <td className="border p-2">
                <img
                  className="w-10 rounded-full"
                  alt="avatar"
                  src={customer.picture}></img>
              </td>
              <td className="border p-2">{customer.firstName}</td>
              <td className="border p-2">{customer.lastName}</td>
              <td className="border p-2">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCustomers;
