import { useEffect, useState } from 'react';

// IMPORT COMPONENTS
import GenericTable from '../components/tables';

// IMPORT SERVICES
import fetchAllData from '../services/api';

// IMPORT ICONS
import { RiEditFill } from "react-icons/ri";

const EditBar = ({ mode, onWrite, editData, submitEdit }) => {
    const [visible, setVisible] = useState(false);
    const [referance, setReferance] = useState();
    const [referanceData, setReferanceData] = useState();
    const [formData, setFormData] = useState(editData);

    const isDisabledKey = (key) => {
        // Disable keys that end with '_id' or are exactly 'id' in edit mode
        return (key === 'id' || key.endsWith('_id'));
    };

    useEffect(() => {
        if (onWrite) {
            setVisible(true);
        } else {
            setTimeout(() => setVisible(false), 300); // Match the transition duration
        }
    }, [onWrite]);

    const handleCloseBar = () => {
        setFormData(null)
        onWrite(false);
    };

    const handleParentClick = () => {
        setFormData(null)
        onWrite(false);
    };

    const handleChildClick = (e) => {
        e.stopPropagation();
    };

    // Function to determine input type based on value type
    const getInputType = (value) => {
        if (typeof value === 'number') return 'number';
    
        if (typeof value === 'string' && !isNaN(Date.parse(value)) && value.includes('T')) {
          return 'datetime-local';
        }
    
        return 'text';
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleForeignKeyClick = async (key) => {
        const tableName = key.replace(/_id$/, 's');
        setReferance(tableName);
        const data = await fetchAllData(tableName);
        setReferanceData(data);
        console.log("referance data: ", referanceData)
    };

    return (
        <div    className={`w-full h-full absolute right-0 top-0 z-50 flex justify-end bg-black bg-opacity-50 transition-all ${
                onWrite ? 'flex' : 'hidden'}`} onClick={handleParentClick}>
            
            {/* CONTENT */}
            <div    className={`w-fit min-w-96 max-w-[35%] h-full flex flex-col items-start text-c-purple bg-white bg-opacity-100 transition-transform duration-300 ${
                    onWrite ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={handleChildClick}
                    style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}>

                <div className='w-full p-5 flex flex-col gap-2 text-black border-b border-c-purple'>
                    <h2 className='text-2xl font-bold'>{mode === 'edit' ? 'Update Data' : 'Insert Data'}</h2>
                    <p>{mode === 'edit' ? 'Data id tidak bisa diubah, ubah data lain selain data id kemudian tekan tombol enter untuk mengaktifkan data baru.' : 'Isi data baru dan tekan tombol simpan.'}</p>
                </div>

                <form className='w-full p-5 flex-grow text-black space-y-5 overflow-y-clip'>                    

                    {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="w-full grid grid-cols-3 gap-10 place-items-center text-start space-y-2">
                        <label htmlFor={key} className="w-full text-sm font-medium text-gray-700">
                            {key.replace(/_/g, ' ')} {/* Replace underscores with spaces for labels */}
                        </label>
                        <div className="w-full col-span-2 flex items-center gap-2">
                            <input
                                type={getInputType(value)}
                                id={key}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                disabled={isDisabledKey(key) || referance || (mode === 'insert' && key === 'id')}
                                placeholder={
                                    mode === 'insert' && key === 'id' ? 'id auto generated' : value
                                }
                                className={`w-full min-h-full py-1 px-4 border border-gray-300 rounded-md text-black 
                                ${getInputType(value) === 'datetime-local' ? 'datetime-input' : ''} ${ isDisabledKey(key) || referance ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                            />
                            {key.endsWith('_id') && (
                                <button type="button" onClick={() => handleForeignKeyClick(key)} className="p-2 bg-c-purple text-white rounded-md">
                                    <RiEditFill />
                                </button>
                            )}
                        </div>
                    </div>
                    ))}
                </form>

                <div className='w-full p-5 flex gap-2 self-start text-black border-t border-c-purple'>
                    <button className="py-1 px-5 border rounded-lg border-c-purple" onClick={handleCloseBar}>cancel</button>
                    <button className="py-1 px-5 text-white rounded-lg bg-c-purple" onClick={() => { submitEdit(formData, formData.id); handleCloseBar();}}>save</button>
                </div>
            </div>

            {/* TABLE REFERANCE */}
            <div onClick={handleChildClick}>
            { referanceData             
                ? 
                    <div className='min-w-40 h-full flex flex-col gap-10 text-black border-l border-c-purple bg-white'>
                        <h4 className='p-5 font-bold border-b border-c-purple'>Daftar {referance}</h4>
                        {referanceData.map((item, index) => (
                        <button key={index} className='p-2 mx-10 flex-col text-left border rounded-lg border-c-purple bg-white'>
                            {Object.entries(item)
                            .filter(([key]) => !key.includes("id") && !key.includes("_id") && !key.includes("created_at"))
                            .map(([key, value]) => (
                                <p key={key}>
                                    {value}
                                </p>
                            ))}
                        </button> 
                        ))}   
                        <button className="py-1 px-5 border rounded-lg border-c-purple" onClick={() => {setReferance(undefined); setReferanceData(undefined)}}>cancel</button>
                    
                    </div>
                : ""
            }
            </div>

        </div>
    );
};

export default EditBar;