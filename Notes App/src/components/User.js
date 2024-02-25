import React, { useEffect, useState } from 'react'
import '../components/main.css'
// import axios, { all } from 'axios'
function User({user}) {

  const [followers,setFollowers] = useState()
  const [repos,setRepos] = useState()
  const fetchFollowers = async (url) => {
  let allFollowers = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(`${url}?page=${page}&per_page=100`);
    const followers = await response.json();

    // Append the current page's followers to the array
    allFollowers = allFollowers.concat(followers);

    // Check if there are more pages
    hasNextPage = followers.length === 100;
    page++;
  }

  return allFollowers;
};
useEffect(() => {
  
  // Usage
  fetchFollowers(user.followers_url)
    .then(followers => {
      console.log(followers);
      setFollowers(followers.length)
      console.log('Total followers:', followers.length);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  fetchFollowers(user.repos_url)
    .then(repos => {
      console.log(repos);
      setRepos(repos.length)
      console.log('Total followers:', repos.length);
    })
    .catch(error => {
      console.log('Error:', error);
    });

}, [setFollowers,setRepos,user])

  
  
  // axios.get(`${user.followers_url}?page=${page}&per_page=100`).then((res)=>{
    
  return (
    <div id='userBox'>
      <div id='image'>
        <img src={user.avatar_url} width={300} height={300} alt='imag not found'></img>
        <h2>{user.login}</h2>
      </div>
      <div id='details'>
        <div>
            <span>Total Followers : {followers}</span>
        </div>
        <div>
            <span>Total Repository : {repos}</span>

        </div>
      </div>
    </div>
  )
}

export default User
