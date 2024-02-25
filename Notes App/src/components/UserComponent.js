import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
// import users from "../abc.json";
import "../components/main.css";
import Loader from "./Loader";

function UserComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(users);
    const [users, setUsers] = useState([]);
  // setUsers(data)
    useEffect(() => {
      async function fetchAllUsers() {
        try {
          let users = [];
          let page = 1;
          let response;

          do {
            response = await axios.get(`https://api.github.com/users?since=${page}`);
            users = users.concat(response.data);
            page++;
          } while (response.headers.link && response.headers.link.includes('rel="next"'));

          setUsers(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          setUsers([]);
        }
      }

      // fetchUserData(username);
      fetchAllUsers();
    }, []);

  if (users.length === 0) {
    return <Loader></Loader>;
  }

  return (
    <div>
      {/* <div>
        <h1>{userData.name}</h1>
        <p>{userData.bio}</p>
      </div> */}

      <div id="main">
        {/* {users.map((user,index) => ( */}
        <User user={users[currentIndex]}></User>
        {/* // ))} */}
        <div id="right">
          <div
            id="right_arrow"
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
            }}
          >
            Next
          </div>
        </div>
        {currentIndex!==0 &&
          <div id="left">
            {" "}
            <div
              id="left_arrow"
              onClick={() => {
                setCurrentIndex(currentIndex - 1);
              }}
            >
              Prev
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default UserComponent;
