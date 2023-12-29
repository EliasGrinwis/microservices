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
    <div className="w-[95%] lg:w-[85%] mx-auto max-w-[1650px]">
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
          <TabList className="flex flex-wrap text-sm font-medium text-gray-500 mb-10">
            <Tab
              className={`cursor-pointer p-4 focus:outline-none text-left ${
                tabIndex === 0 ? "text-gray-600 border-b-2 border-gray-500" : ""
              }`}>
              Customers
            </Tab>
            <Tab
              className={`cursor-pointer p-4 focus:outline-none text-left ${
                tabIndex === 1 ? "text-gray-600 border-b-2 border-gray-500" : ""
              }`}>
              Hotels
            </Tab>
            <Tab
              className={`cursor-pointer p-4 focus:outline-none text-left ${
                tabIndex === 2 ? "text-gray-600 border-b-2 border-gray-500" : ""
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
