import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import FormFooter from "../components/FormFooter";
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import Subheading from "../components/Subheading";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Subheading
            label={"Enter your credentials below to access your account"}
          />
          <InputField
            placeholder="john@example.com"
            label={"Email"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            placeholder="******"
            label={"Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                const response = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}/user/signin`,
                  {
                    userName: username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
          <FormFooter
            label={"Don't have an account yet?"}
            buttonText={"Sign up"}
            destinationLink={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
