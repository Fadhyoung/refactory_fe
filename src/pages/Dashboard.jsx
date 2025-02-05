import React, { useState } from 'react';

// IMPORTS SERVICES
import fetchAllData, { updateData } from '../services/api';

// IMPORTS COMPONENTS
import Navbar from '../components/navbar';
import EditBar from '../components/editBar';
import GenericTable from '../components/tables';

// IMPORTS ICONS
import { IoMdPerson } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";

// IMPORTS CONTEXTS
import { useUser } from '../context/userContext';

const Dashboard = () => {

  const {user} = useUser();
  const [data, setData] = useState();
  const [dataCtg, setDataCtg] = useState('home')
  const [onEdit, setOnEdit] = useState(false)
  const [editData, setEditData] = useState();
  const [mode, setMode] = useState("read");
  const [error, setError] = useState(null);

  const handleGetAllData = async (dataType) => {
    try {
      const data = await fetchAllData(dataType);
      setData(data);
      setDataCtg(dataType)
      setError(null);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to fetch doctors. Please try again.");
    }
  }

  const handleHOme = () => {
    setDataCtg("home")
    setData(null)
  }

  const handleWrite = (mode, data) => {
    setOnEdit(true)
    setMode(mode)
    setEditData(data)
  }

  const handleSubmitEdit = async (formData, id) => {
      
      console.log('Form Data Submitted:', formData);      
      await updateData(dataCtg, formData, id);
      await handleGetAllData(dataCtg)
  };

  return (
    <>
    <div className='w-full h-full relative flex overflow-hidden'>

      <Navbar display={"flex"} getHome={handleHOme} getAllData={handleGetAllData}/>

      {/* CONTROL BOARD */}
      <div className='control_board w-full p-5 relative flex flex-col gap-5 overflow-x-auto'>
        
        <div className='flex p-5 border rounded-lg border-c-purple'>
          <h1 className='w-full text-lg text-left leading-relaxed text-black'>Welcome to the Dashboard <span className='px-4 py-2 rounded-lg bg-gray-200 text-c-purple'>{user["username"]}</span></h1>;
        </div>

        <div className='w-full p-3 relative flex gap-10 items-center rounded-xl bg-c-purple'>

            <div className='w-auto'>
              <div className='w-24 h-24 flex justify-center items-center rounded-full text-c-purple bg-gray-200'><IoMdPerson size={40}/></div>
            </div>

            <div className='flex flex-col justify-start'>
              <h1>{user["username"]}</h1>
              <h6>{user["email"]}</h6>
            </div>

            <RiEditFill className='absolute top-5 right-5 cursor-pointer' size={30} />

        </div>

        {/* DISPLAY DATA */}
        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

        {dataCtg != "home" ? (
            <GenericTable data={data} getEdit={handleWrite} />
        ) :dataCtg === "home" ? (
            <div>
              HOME
            </div>
        ): (
            <p className="text-gray-600">No data available. Click the button to fetch data.</p>
        )}
      </div>

      {/* EDIT BAR */}
      {onEdit && <EditBar mode={mode} dataCtg={dataCtg} onWrite={setOnEdit} editData={editData} submitEdit={handleSubmitEdit} fetchReferanceData={fetchAllData} />}

    </div>
    </>
  );
};

export default Dashboard;