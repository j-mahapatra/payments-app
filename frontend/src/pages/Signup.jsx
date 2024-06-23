import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import Subheading from "../components/Subheading";
import FormFooter from "../components/FormFooter";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your infromation to create an account"} />
          <InputField
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputField
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputField
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="john@example.com"
            label={"Email"}
          />
          <InputField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="******"
            type="password"
            label={"Password"}
          />
          <div className="mt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}/user/signup`,
                  {
                    userName: username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
          <FormFooter
            label={"Already have an account?"}
            buttonText={"Sign in"}
            destinationLink={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;