import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Button from '@mui/material/Button';
import { analyzeData, analyzeDoctor } from "../api/services"
import React, { useEffect } from 'react';
import { verifySession } from "../api/services"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Analyze() {

  const [doctorsList, setDoctorsList] = React.useState([]);

  useEffect(async () => {
    var res = await verifySession(localStorage.getItem("token"))
    setDoctorsList(res.doctors)
  }, []);

  const [doctor, setDoctor] = React.useState('');
  const handleChangeDoctor = (event) => {
    setDoctor(event.target.value);
  };

  const [patientAsian, setPatientAsian] = React.useState("");
  const [patientBlack, setPatientBlack] = React.useState("");
  const [patientCancers, setPatientCancers] = React.useState("");
  const [patientDiabetes, setPatientDiabetes] = React.useState("");
  const [patientDiffGenders, setPatientDiffGenders] = React.useState("");
  const [patientDiffRace, setPatientDiffRace] = React.useState("");
  const [patientFemale, setPatientFemale] = React.useState("");
  const [patientHispanic, setPatientHispanic] = React.useState("");
  const [patientMale, setPatientMale] = React.useState("");
  const [patientNativeIndian, setPatientNativeIndian] = React.useState("");
  const [patientOther, setPatientOther] = React.useState("");
  const [patientOverall, setPatientOverall] = React.useState("");
  const [patientSameGender, setPatientSameGender] = React.useState("");
  const [patientSameRace, setPatientSameRace] = React.useState("");
  const [patientStroke, setPatientStroke] = React.useState("");
  const [patientWhite, setPatientWhite] = React.useState("");
  const [graphs, setGraphs] = React.useState([]);
  const [good, setGood] = React.useState([]);
  const [bad, setBad] = React.useState([]);

  const [currentState, setCurrentState] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let res = await analyzeData(localStorage.getItem("token"))
    setPatientAsian("data:image/png;base64, " + res.encoded_data.asian)
    setPatientBlack("data:image/png;base64, " + res.encoded_data.black)
    setPatientCancers("data:image/png;base64, " + res.encoded_data.cancers)
    setPatientDiabetes("data:image/png;base64, " + res.encoded_data.diabetes)
    setPatientDiffGenders("data:image/png;base64, " + res.encoded_data.different_gender)
    setPatientDiffRace("data:image/png;base64, " + res.encoded_data.different_race)
    setPatientFemale("data:image/png;base64, " + res.encoded_data.female)
    setPatientHispanic("data:image/png;base64, " + res.encoded_data.hispanic)
    setPatientMale("data:image/png;base64, " + res.encoded_data.male)
    setPatientNativeIndian("data:image/png;base64, " + res.encoded_data.native_indian)
    setPatientOther("data:image/png;base64, " + res.encoded_data.other)
    setPatientOverall("data:image/png;base64, " + res.encoded_data.overall)
    setPatientSameGender("data:image/png;base64, " + res.encoded_data.same_gender)
    setPatientSameRace("data:image/png;base64, " + res.encoded_data.same_race)
    setPatientStroke("data:image/png;base64, " + res.encoded_data.stroke)
    setPatientWhite("data:image/png;base64, " + res.encoded_data.white)
    setCurrentState("hospital")
  }

  async function handleSubmitDoctor(event) {
    event.preventDefault();
    let res = await analyzeDoctor(localStorage.getItem("token"), {
      doctor_id: doctor
    })
    setGraphs(res.graphs)
    setGood(res.good)
    setBad(res.bad)
    setCurrentState("doctor")
  }

  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <div class="main">
          <br />
          <div className="centered">
          </div>
          <div class="bg-white">
            <div class="container px-6 py-8 mx-auto">
              <div class="xl:items-center xl:-mx-8 xl:flex">
                <div class="flex-1 xl:mx-8">
                  <div class="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                    <div class="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700 dark:bg-gray-900" style={{ minHeight: "300px" }}>
                      <div class="p-6">
                        <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">Hospital - All Staff</h1>
                        <div className="centered">
                          <br /><br />
                          <span className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <Button onClick={handleSubmit} style={{ color: "white", textTransform: "none" }}>Analyze</Button>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700 dark:bg-gray-900" style={{ minHeight: "300px" }}>
                      <div class="p-6">
                        <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">Doctor - Specific Staff</h1>
                        <div className="mt-5 md:col-span-2 md:mt-0">
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
                            </div>
                          </div>
                        </div>

                        <div className="centered">
                          <br /><br />
                          <span className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <Button onClick={handleSubmitDoctor} style={{ color: "white", textTransform: "none" }}>Analyze</Button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {currentState == "hospital" && (
            <div>
              <div className="centered"><img src={patientAsian} className="centered"></img></div>

              <div className="centered"><img src={patientBlack}></img></div>

              <div className="centered"><img src={patientCancers}></img></div>

              <div className="centered"><img src={patientDiabetes}></img></div>

              <div className="centered"><img src={patientDiffGenders}></img></div>

              <div className="centered"><img src={patientDiffRace}></img></div>

              <div className="centered"><img src={patientFemale}></img></div>

              <div className="centered"><img src={patientHispanic}></img></div>

              <div className="centered"><img src={patientMale}></img></div>

              <div className="centered"><img src={patientNativeIndian}></img></div>

              <div className="centered"><img src={patientOther}></img></div>

              <div className="centered"><img src={patientOverall}></img></div>

              <div className="centered"><img src={patientSameGender}></img></div>

              <div className="centered"><img src={patientSameRace}></img></div>

              <div className="centered"><img src={patientStroke}></img></div>

              <div className="centered"><img src={patientWhite}></img></div>
            </div>)}

          {currentState == "doctor" && (
            <div>
              <b>Exceptional:</b> {good.join(", ")}
              <br />
              <b>Needs Improvement:</b> {bad.join(", ")}
              <br />
              <hr />
              {graphs.map((item) => (
                <div className="centered"><img src={"data:image/png;base64, " + item}></img></div>
              ))}
            </div>)}
        </div>
      </div>
    </div>
  );
}

export default Analyze;
