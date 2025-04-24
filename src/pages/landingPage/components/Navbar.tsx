import { useState } from "react";
import LoginForm from "../../../modules/auth/components/LoginForm"
import UserRegistration from "../../../modules/auth/components/RegisterForm";
const Navbar = () => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);

  function handleCancel() {
    setOpenLogin(!openLogin);
  }

  function handleRegisterCancel() {
    setOpenRegister(!openRegister);
  }

  return (
    <>
          <nav
        id="navbar"
        className="bg-white font-bold flex items-center justify-between font-satoshi px-4 py-2 fixed w-full z-999 top-0 left-0"
      >
        <div className="text-primary">
          <img className="h-15" src="logo_trial.png" alt="Logo" />
        </div>
        <div className="flex items-center gap-9 p-4">
          <div className="hidden md:flex space-x-5 text-primary">
            <a href="/">Home</a>
            <a href="#features">About</a>
            <a href="#location">Location</a>
            <a href="#fleet">Fleet</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="flex space-x-5 text-primary">
            <button
              className="bg-secondary px-3 py-1 rounded-lg text-white"
              onClick={() => setOpenLogin(true)}
            >
              login
            </button>
            <button
              className="border-secondary border-1 px-3 py-1 rounded-lg text-secondary"
              onClick={() => setOpenRegister(true)}
            >
              sign up
            </button>
          </div>
        </div>
      </nav>

      {openLogin && <LoginForm onCancel={handleCancel} />}
      {openRegister && <UserRegistration onCancel={handleRegisterCancel} />}
    </>
  );
};

export default Navbar;
