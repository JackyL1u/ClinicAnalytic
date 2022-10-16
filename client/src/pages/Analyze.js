import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Button from '@mui/material/Button';
import { analyzeData } from "../api/services"
import React, { useEffect } from 'react';

function Analyze() {

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
  }

  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <div class="main">
          <br />
          <div class="bg-white dark:bg-gray-900">
            <div class="container px-6 py-8 mx-auto">
              <div class="xl:items-center xl:-mx-8 xl:flex">
                <div class="flex flex-col items-center xl:items-start xl:mx-8">
                  <h1 class="text-3xl font-medium text-gray-800 capitalize lg:text-4xl dark:text-white">Our Pricing Plan</h1>

                  <p class="mt-4 font-medium text-gray-500 dark:text-gray-300">
                    You can get All Access by selecting your plan!
                  </p>

                  <a href="#" class="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    <span class="mx-1">read more</span>
                    <svg class="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </a>
                </div>

                <div class="flex-1 xl:mx-8">
                  <div class="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                    <div class="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700">
                      <div class="p-6">
                        <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">Hospital</h1>

                        <p class="mt-4 text-gray-500 dark:text-gray-300">
                          Analyze all data from all hospital staff
                        </p>

                        <div className="centered">
                          <br /><br />
                          <span className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <Button onClick={handleSubmit} style={{ color: "white", textTransform: "none" }}>Analyze</Button>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700">
                      <div class="p-6">
                        <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">Doctor</h1>

                        <p class="mt-4 text-gray-500 dark:text-gray-300">
                          Analyze one Doctor and detect anomalies
                        </p>

                        <div className="centered">
                          <br /><br />
                          <span className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <Button onClick={handleSubmit} style={{ color: "white", textTransform: "none" }}>Analyze</Button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src={patientAsian}></img>

          <img src={patientBlack}></img>

          <img src={patientCancers}></img>

          <img src={patientDiabetes}></img>

          <img src={patientDiffGenders}></img>

          <img src={patientDiffRace}></img>

          <img src={patientFemale}></img>

          <img src={patientHispanic}></img>

          <img src={patientMale}></img>

          <img src={patientNativeIndian}></img>

          <img src={patientOther}></img>

          <img src={patientOverall}></img>

          <img src={patientSameGender}></img>

          <img src={patientSameRace}></img>

          <img src={patientStroke}></img>

          <img src={patientWhite}></img>
        </div></div>
    </div>
  );
}

export default Analyze;
