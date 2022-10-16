import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import DoctorsTable from "../components/DoctorsTable"

function Doctors() {

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div class="main">
          <br />
          <DoctorsTable></DoctorsTable>

        </div></div>
    </div>
  );
}

export default Doctors;
