// GenericTable.js
import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const GenericTable = ({ data, getEdit, mode = "read" }) => {

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const createDictionary = (headers) => {
        const dictionary = {};
        headers.forEach(header => {
            dictionary[header] = null;
        });
        console.log("dictionary: ", dictionary);
        return dictionary;
    };
    
    return (
        <div className='flex flex-col gap-4'>

            {/* INSERT DATA BUTTON */}
            {mode === "read" && (
                <button className='w-fit py-1 px-4 self-end border rounded-lg border-gray-200 text-black hover:bg-c-purple hover:text-white'
                    onClick={() => getEdit("insert", createDictionary(headers))}>
                    insert data
                </button>
            )}

            {/* TABLE */}
            <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-sm">
                    <thead className=" bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.replace(/_/g, ' ')}
                                </th>
                            ))}
                            {mode === "read" && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                {headers.map((header) => (
                                    <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item[header]}
                                    </td>
                                ))}
                                {mode === "read" && (
                                    <td className="px-6 py-4 flex gap-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className='p-1 border rounded-md text-blue-500' onClick={() => getEdit("edit", item)}>
                                            <MdOutlineEdit />
                                        </button>
                                        <button className='p-1 border rounded-md text-red-500'>
                                            <FaRegTrashAlt />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GenericTable;