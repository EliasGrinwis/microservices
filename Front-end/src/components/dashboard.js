import React, {useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";

function Dashboard() {
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

  const hotelsData = [
    {id: 1, name: "Luxury Hotel", location: "City Center"},
    {id: 2, name: "Seaside Resort", location: "Beachfront"},
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
      <div className="h-[7vh] overflow-hidden relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="container mx-auto">
        <h1>Manage your hotel</h1>
        <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
          <TabList>
            <Tab>Customers</Tab>
            <Tab>Hotels</Tab>
            <Tab>Rooms</Tab>
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
            <h2>Hotel Management</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotelsData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.location}</td>
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
        <button onClick={() => console.log("Add new row")}>Add New</button>
      </div>
    </div>
  );
}

export default Dashboard;
