import '../App.css';
import logo from "./images/logo.png"

function Navbar() {

    return (
        <div class="navHead">
            <nav class="flex bg-white dark:bg-gray-900 dark:border-gray-700">
                <div class=" p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <a href="#" class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-gray-500 mx-1.5 sm:mx-6">
                        <b>ClinicAnalytic</b>
                    </a>
                </div>
                <div class="container flex items-center justify-end p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <a href="/login" onClick={() => localStorage.removeItem("token")} class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-gray-500 mx-1.5 sm:mx-6">
                        Logout
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
