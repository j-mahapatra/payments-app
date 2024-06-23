import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState();
  const [account, setAccount] = useState();
  
  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/user/get-users?filter=${localStorage.getItem('username')}`, config)
    .then((response) => {
      setCurrentUser(response.data.users?.[0] ?? []);
    });

    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/account/account-details`, config)
    .then((response) => {
      setAccount(response.data?.account ?? []);
    });
  }, [])

  return (
    <div>
      <AppBar currentUser={currentUser} />
      <div className="m-8">
        <Balance value={account?.balance ?? 0} />
        <Users />
      </div>
    </div>
  );
}
