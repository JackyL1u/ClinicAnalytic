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
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div class="main">
          <br />
          <Button onClick={handleSubmit}>Analyze</Button>
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
