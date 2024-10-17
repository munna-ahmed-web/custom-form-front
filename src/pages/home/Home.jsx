import { useEffect, useState } from "react";
import SearchSection from "./SearchSection";
import { getTemplates, searchTemplates } from "../../api/templateRequest";
import toast from "react-hot-toast";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { addTemplateData } from "../../data/template";
import AddTemplateCard from "../../components/card/AddTemplateCard";

const Home = () => {
  const [templateList, setTemplateList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const fetchTemplates = async () => {
      const loadId = toast.loading("loading...");
      try {
        // const res = await getTemplates();
        const res = await searchTemplates(searchTerm);
        setTemplateList(res.data);
        toast.dismiss(loadId);
        console.log(res.data);
      } catch (error) {
        toast.dismiss(loadId);
        console.log(error);
        toast.error("Something went wrong to get templates");
      }
    };
    fetchTemplates();
  }, [searchTerm]);

  return (
    <div className="bg-gray-100">
      <div className="w-[75%] mx-auto">
        <SearchSection handleChange={handleSearch} value={searchTerm} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Link to="/template/create">
            <div className="cursor-pointer">
              <AddTemplateCard
                imgUrl={addTemplateData.imgUrl}
                title={addTemplateData.title}
                description={addTemplateData.description}
              />
            </div>
          </Link>
          {templateList.map((template) => (
            <Card
              key={template._id}
              imgUrl={template.imageUrl}
              description={template.description}
              title={template.title}
              id={template._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
