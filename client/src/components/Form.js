import '../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addPatient } from "../api/services"

function Form() {

    const [race, setRace] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [fileName, setFileName] = React.useState("");
    const handleChangeRace = (event) => {
        setRace(event.target.value);
    };

    const [gender, setGender] = React.useState('');
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const onChangePicture = e => {
        if (e.target.files[0]) {
            var filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0].name)
            setFileName(e.target.files[0].name)
            filereader.onload = function (evt) {
                var base64 = evt.target.result;
                setFile(base64)
            }
        };
    };

    async function handleSubmit(event) {
        event.preventDefault();
        let res = await addPatient(localStorage.getItem("token"), {
            race: race,
            gender: gender,
            img: file
        })
    }

    return (
        <div>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Submit Patient Information</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Submit information of Patients. Please upload Health Card and select race/gender for the patient.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Race</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={race}
                                                label="Race"
                                                onChange={handleChangeRace}
                                            >
                                                <MenuItem value={"native_indian"}>Native Indian</MenuItem>
                                                <MenuItem value={"asian"}>Asian</MenuItem>
                                                <MenuItem value={"black"}>Black</MenuItem>
                                                <MenuItem value={"hispanic"}>Hispanic or Latino</MenuItem>
                                                <MenuItem value={"white"}>White</MenuItem>
                                                <MenuItem value={"other"}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={gender}
                                                label="Gender"
                                                onChange={handleChangeGender}
                                            >
                                                <MenuItem value={"male"}>Male</MenuItem>
                                                <MenuItem value={"female"}>Female</MenuItem>
                                                <MenuItem value={"other"}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>


                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Health Card</label>
                                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                {file == null && (
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                                {file != null && (
                                                    <span className="block text-sm font-medium text-gray-700">{fileName}
                                                        <br /><br /></span>
                                                )}
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input onChange={onChangePicture} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
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

export default Form;
