import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 pt-5">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {firstName[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{`${firstName} ${lastName}`}</h3>
            </div>
            <div className="space-y-4">
              <InputField
                type="number"
                label={"Enter Amount"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={() => {
                  axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/account/transfer`,
                    {
                      receiver: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
