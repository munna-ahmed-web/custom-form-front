import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";
import { getUserInfoById } from "../../api/userRequest";
import toast from "react-hot-toast";
import { createSaleForce } from "../../api/saleforceRequest";
import { BeatLoader } from "react-spinners";

const initialState = {
  name: "",
  email: "",
  phone: "",
  accountName: "",
};
const ConnectToSalesForce = () => {
  const [salesforceState, setSalesforceState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  const handleChange = (e) => {
    setSalesforceState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      return toast.error("No user found");
    }
    const payload = {
      userId,
      ...salesforceState,
    };
    setLoading(true);
    try {
      const res = await createSaleForce(payload);
      setLoading(false);
      toast.success("Created Successsfully");
    } catch (error) {
      setLoading(false);
      if (error.status == 400) {
        toast.error("Email is already exists");
      }
      if (error.status == 409) {
        toast.error("This user is already created in SalesForce");
      }
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfoById(userId);
      setSalesforceState((prev) => {
        return {
          ...prev,
          name: data.name || "",
          email: data.email || "",
        };
      });
    } catch (error) {
      toast.error("Can not get data. Please provide data manually");
      console.log("error");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center">
        <h1 className="text-center mt-4 text-xl">
          SalesForce Contact Creation
        </h1>
      </div>
      <div className="flex gap-x-3 py-3 w-9/12 mx-auto ">
        <div className="w-[50%] mx-auto">
          <div>
            <label className="block p-1">Name</label>
            <input
              type="text"
              name="name"
              value={salesforceState.name}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block p-1">Email</label>
            <input
              type="text"
              name="email"
              value={salesforceState.email}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block p-1">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={salesforceState.accountName}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block p-1">Phone</label>
            <PhoneInput
              country={"us"}
              value={salesforceState.phone}
              onChange={(phone) =>
                setSalesforceState((prev) => {
                  return { ...prev, phone: phone };
                })
              }
              inputStyle={{
                width: "100%",
              }}
            />
          </div>
          <div>
            <BeatLoader size={17} loading={loading} />
          </div>
          <div className="mt-4">
            <button
              className="bg-primary px-3 py-2 rounded-md text-white hover:bg-[#39339e]"
              onClick={handleSubmit}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectToSalesForce;
