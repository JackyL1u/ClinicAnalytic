import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import RecordsTable from "../components/RecordsTable"

function Records() {

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div class="main">
          <br />
          <RecordsTable></RecordsTable>

        </div></div>
    </div>
  );
}

export default Records;
