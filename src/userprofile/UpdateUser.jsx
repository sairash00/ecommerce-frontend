
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function UpdateUser({user}) {
    const navigate = useNavigate()
  
    const [details, setDetails] = useState({
        username: user?.username ||"",
        password: "",
        email: user?.email || "",
        address: user?.address || ""
    })
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (user) {
            setDetails({
                username: user.username || "",
                password: "",
                email: user.email || "",
                address: user.address || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {

        const {name, value} = e.target

        if(name === "username"){
            setDetails({
                ...details,
                username: value
            })
        }
        if(name === "password"){
            setDetails({
                ...details,
                password: value
            })
        }
        if(name === "email"){
            setDetails({
                ...details,
                email: value
            })
        }
        if(name === "address"){
            setDetails({
                ...details,
                address: value
            })
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!details.username && !details.password && !details.email && !details.address) {
            return setMsg("All fields are empty")
        }


        if(details.email){
            if(!details.email.includes("@")){
                return setMsg("Invalid email address")
            }
        }
        if(!details.password || details.password.length < 8){
                return setMsg("Password must be at least 8 characters")
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/updateUser",{details})
            const data = response.data
            setMsg(data.message)
            if(data.success){
                setDetails({
                    ...details,
                    password: ""
                })
            }
            
        } catch (error) {
            setMsg(error.response?.data?.message)
            const loggedIn = error.response.data.loggedIn
            if(!loggedIn){
              navigate("/login")
            }
        }
    }

    useEffect(() => {
        if(msg){
            setTimeout(() => {
                setMsg("")
            }, 3000)
        }
    }
    ,[msg])

  return (
    <form>
      <div className="space-y-1 mt-[4rem] px-2">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-[whitesmoke]">Update Profile</h2>
          <h2 className="text-sm mt-3 leading-6 text-gray-300">You can change single information also.</h2>
          <h2 className="text-sm leading-6 text-gray-300"> You can enter new password or enter the old password. </h2>
        
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-[whitesmoke]">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="username"
                    value = {details.username}
                    onChange = {handleChange}
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[whitesmoke] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-[whitesmoke]">
                Old Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[whitesmoke] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            </div> */}

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-[whitesmoke]">
               Password *
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="password"
                    value = {details.password}
                    onChange = {handleChange}
                    id="newPassword"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[whitesmoke] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-[whitesmoke]">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-300">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block  text-sm font-medium leading-6 text-[whitesmoke]">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value = {details.email}
                  onChange = {handleChange}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 bg-transparent text-[whitesmoke] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

        

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-[whitesmoke]">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  value = {details.address}
                  onChange={handleChange}
                  id="address"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 bg-transparent text-[whitesmoke] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-[whitesmoke]">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-[whitesmoke]">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-[whitesmoke]">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-[whitesmoke]">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-[whitesmoke]">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-[whitesmoke]">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-300">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-[whitesmoke]">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-[whitesmoke]">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-[whitesmoke]">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>*/}
      </div> 
          <h2 className="text-sm mt-3 leading-6 text-gray-300">{msg ? msg : ""}</h2>
      <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
        <button type="reset" className="text-sm font-semibold leading-6 text-[whitesmoke]">
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
    </form>
  )
}
