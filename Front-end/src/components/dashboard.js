import React, {useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import ManageHotels from "./manage_hotels";
import ManageCustomers from "./manage_customers";
import ManageRooms from "./manage_rooms";

function Dashboard({userToken}) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
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
            <ManageCustomers userToken={userToken} />
          </TabPanel>

          <TabPanel>
            <ManageHotels userToken={userToken} />
          </TabPanel>

          <TabPanel>
            <ManageRooms userToken={userToken} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
