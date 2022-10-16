import '../App.css';
import React, { useEffect } from 'react';
import { verifySession } from "../api/services"

function DoctorsTable() {

    const [doctorsList, setDoctorsList] = React.useState([]);
    useEffect(async () => {
        var res = await verifySession(localStorage.getItem("token"))
        setDoctorsList(res.doctors)
    }, []);

    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }

    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        First Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Last Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Race
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Gender
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        DoctorID
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {doctorsList.map((item) => (
                                    <tr class="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.firstName}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.lastName}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {titleCase(item.doctor_race)}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.doctor_gender == "male" && (
                                                <div>
                                                   Male
                                                </div>
                                            )}
                                            {item.doctor_gender == "female" && (
                                                <div>
                                                   Female
                                                </div>
                                            )}
                                            {item.doctor_gender == "other" && (
                                                <div>
                                                   Other
                                                </div>
                                            )}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.doctor_id}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorsTable;
