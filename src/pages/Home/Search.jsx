import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Search = () => {
  const axiosInstance = useAxios();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("/blood-groups.json").then((res) => {
      setBloodGroups(res.data.bloodGroups);
    });

    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  // Form
  const handleSearch = async (e) => {
    e.preventDefault();

    axiosInstance.get(`/search-request?blood=${bloodGroup}&district=${district}&upazila=${upazila}`).then((res) => {
      console.log("Browser Output", res.data);
      setSearchResults(res.data);
    });
  };
  return (
    <div>
      {/* Search Filter */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Search now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSearch} className="fieldset">
                {/* Blood Group Selector */}
                <label className="label">Blood Group</label>
                <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} name="blood_group" defaultValue="" className="select">
                  <option value="" disabled>
                    -- Select Blood Group --
                  </option>
                  {bloodGroups?.map((bloodGroup) => (
                    <option value={bloodGroup?.id} key={bloodGroup?.id}>
                      {bloodGroup?.type}
                    </option>
                  ))}
                </select>
                {/* District Selector */}
                <label className="label">District</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" id="" defaultValue="" className="select">
                  <option value="" disabled>
                    -- Select District --
                  </option>
                  {districts.map((district) => (
                    <option value={district?.id} key={district?.id}>
                      {district?.name}
                    </option>
                  ))}
                </select>
                {/* Upazila Selector */}
                <label className="label">Upazila</label>
                <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" id="" defaultValue="" className="select">
                  <option value="" disabled>
                    -- Select Upazila --
                  </option>
                  {upazilas
                    .filter((upazila) => upazila?.district_id == district)
                    .map((upazila) => (
                      <option value={upazila?.id} key={upazila?.id}>
                        {upazila?.name}
                      </option>
                    ))}
                </select>
                <button className="btn btn-neutral mt-4">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Search Results */}
      <div className="">
        {searchResults.map((searchResult) => (
          <div className="card card-border bg-base-100 w-96">
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
