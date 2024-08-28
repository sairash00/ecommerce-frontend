import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function AddProduct() {
  const [fileNames, setFileNames] = useState([]);
  const [disable , setDisable] = useState(false)
  const [msg, setMsg] = useState("")
  const[loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  })

  const handleFormData = (e) => {
    const {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
  }
  useEffect(() => {
    if(fileNames.length >= 4){
        setDisable(true)
  }
  },[fileNames])

  useEffect(() => {
    if(loading){
        setMsg("Loading...")
  }
  },[loading])
 
  
  const handleFileChange = (event) => {
    setFileNames([
        ...fileNames,
        event.target.files[0]
    ])
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    if(!values.name || !values.description || !values.price || !values.category || fileNames.length ===  0){
      return setMsg("All fields are required")
    }

    try {

        const formData = new FormData();
        formData.append("name",values.name)
        formData.append("price", parseInt(values.price))
        formData.append("description", values.description)
        formData.append("category", values.category)

        fileNames.forEach((file) => {
          formData.append("images", file)
        })

        const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/createProduct", formData)
        const data = response.data
        
        if(data.success){
          setLoading(false)
          setMsg(data.message)
          setValues({
            name: "",
            price: "",
            description: "",
            category: ""
          })
          setFileNames([])
        }
        
    } catch (error) {
       setLoading(false)
       setMsg(error.response.data.message)
    }
  }

  let i = 0
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="space-y-12 mt-10">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-[whitesmoke]">
            Add Product
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-[whitesmoke]"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleFormData}
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[whitesmoke] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-[whitesmoke]"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleFormData}
                    id="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[whitesmoke] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-[whitesmoke]"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleFormData}
                    id="category"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-[whitesmoke] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-[whitesmoke]"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  value={values.description}
                  onChange={handleFormData}
                  name="description"
                  rows={10}
                  className="block w-full rounded-md border-0 py-1.5 text-[whitesmoke] bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write detailed description about the product.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="images"
                className="block text-sm font-medium leading-6 text-[whitesmoke]"
              >
                Product Images
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className=" flex flex-col items-center text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />

                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="images"
                        name="images[]"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={handleFileChange}
                        disabled = {disable}
                      />

                    </label>
                  </div>
                    {
                        fileNames.map((file) => (
                            <p key={i++} className=" text-sm leading-6 text-gray-400">
                                {file.name}
                            </p>
                        ))
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className=" text-sm leading-6 text-gray-100"> {msg ? msg : ""}  </p>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-[whitesmoke]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 mb-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}
