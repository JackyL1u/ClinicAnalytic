import '../App.css';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { verifySession } from "../api/services"
import { addProcedure } from "../api/services"

function FormProcedure() {
    const [disease, setDisease] = React.useState('');
    const [medicalStatus, setMedicalStatus] = React.useState('');
    const [doctor, setDoctor] = React.useState('');
    const [doctorsList, setDoctorsList] = React.useState([]);

    useEffect(async () => {
        var res = await verifySession(localStorage.getItem("token"))
        setDoctorsList(res.doctors)
    }, []);


    const handleChangeDisease = (event) => {
        setDisease(event.target.value);
    };

    const handleChangeMedical = (event) => {
        setMedicalStatus(event.target.value);
    };


    const handleChangeDoctor = (event) => {
        setDoctor(event.target.value);
    };


    async function handleSubmit(event) {
        event.preventDefault();
        var healthCardNumber = document.getElementById('health-card-number').value
        let res = await addProcedure(localStorage.getItem("token"),{
            disease: disease,
            healthCardNumber: healthCardNumber,
            medicalStatus: medicalStatus,
            doctor: doctor
        })
    }

    return (
        <div>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Submit Procedure Information</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Temp text
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={doctor}
                                                label="Prescription Outcome"
                                                onChange={handleChangeDoctor}
                                            >
                                                {doctorsList.map((item) => (
                                                    <MenuItem value={item.doctor_id}>{item.firstName} {item.lastName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Patient Health Card Number
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="healthCardNumber"
                                                id="health-card-number"
                                                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="5584-486-674-YM"
                                            />
                                        </div>
                                    </div>

                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Disease</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={disease}
                                                label="Surgery Outcome"
                                                onChange={handleChangeDisease}
                                            >
                                                <MenuItem value={"cancers"}>Cancer</MenuItem>
                                                <MenuItem value={"stroke"}>Stroke</MenuItem>
                                                <MenuItem value={"diabetes"}>Diabetes</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Medical Outcome</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={medicalStatus}
                                                label="Surgery Outcome"
                                                onChange={handleChangeMedical}
                                            >
                                                <MenuItem value={"success"}>Success</MenuItem>
                                                <MenuItem value={"fail"}>Failure</MenuItem>
                                                <MenuItem value={"fatal"}>Fatal</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    {/* <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab label="Surgery" />
                                                <Tab label="Prescription" />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Surgery Outcome</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={surgeryStatus}
                                                        label="Surgery Outcome"
                                                        onChange={handleChangeSurgery}
                                                    >
                                                        <MenuItem value={1}>Success</MenuItem>
                                                        <MenuItem value={2}>Failure</MenuItem>
                                                        <MenuItem value={3}>Fatal</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Prescription Outcome</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={prescriptionStatus}
                                                        label="Prescription Outcome"
                                                        onChange={handleChangePrescription}
                                                    >
                                                        <MenuItem value={1}>Success</MenuItem>
                                                        <MenuItem value={2}>Failure</MenuItem>
                                                        <MenuItem value={3}>Fatal</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TabPanel>
                                    </Box> */}

                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default FormProcedure;
