import React, {useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import ManageHotels from "./manage_hotels";

function Dashboard({userToken}) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  // Sample data for tables
  const customersData = [
    {id: 1, name: "John Doe", email: "john@example.com"},
    {id: 2, name: "Jane Smith", email: "jane@example.com"},
    // Add more data as needed
  ];

  const roomsData = [
    {id: 1, roomNumber: 101, type: "Standard", price: 100},
    {id: 2, roomNumber: 201, type: "Suite", price: 200},
    // Add more data as needed
  ];

  const handleEdit = (row) => {
    // Add your edit logic here
    console.log("Edit row:", row);
  };

  const handleDelete = (id) => {
    // Add your delete logic here
    console.log("Delete row with ID:", id);
  };

  return (
    <div>
      <div className="container mx-auto">
        <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
          <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 border-gray-200">
            <Tab
              className={`cursor-pointer p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ${
                tabIndex === 0 ? "border-gray-500" : ""
              }`}>
              Customers
            </Tab>
            <Tab
              className={`cursor-pointer p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ${
                tabIndex === 1 ? "border-gray-500" : ""
              }`}>
              Hotels
            </Tab>
            <Tab
              className={`cursor-pointer p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ${
                tabIndex === 2 ? "border-gray-500" : ""
              }`}>
              Rooms
            </Tab>
          </TabList>

          <TabPanel>
            <h2>Customer Management</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customersData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>
                      <button onClick={() => handleEdit(row)}>Edit</button>
                      <button onClick={() => handleDelete(row.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>

          <TabPanel>
            <ManageHotels userToken={userToken} />
          </TabPanel>

          <TabPanel>
            <h2>Room Management</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Room Number</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roomsData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.roomNumber}</td>
                    <td>{row.type}</td>
                    <td>{row.price}</td>
                    <td>
                      <button onClick={() => handleEdit(row)}>Edit</button>
                      <button onClick={() => handleDelete(row.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
