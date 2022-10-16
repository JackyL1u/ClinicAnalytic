import '../App.css';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Form from "../components/Form"
import FormProcedure from "../components/FormProcedure"
import FormDoctor from "../components/FormDoctor"

function Home() {

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div class="main">
          <br />
          <Form></Form>
          <br />
          <FormProcedure></FormProcedure>
          <br />
          <FormDoctor></FormDoctor>
        </div>
      </div>
    </div>
  );
}

export default Home;
