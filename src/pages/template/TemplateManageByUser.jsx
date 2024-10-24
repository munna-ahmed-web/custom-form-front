import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTemplateByUserId } from "../../api/templateRequest";
import toast from "react-hot-toast";
import TemplateTableList from "../../components/template/TemplateTableList";

const TemplateManageByUser = () => {
  const [templateList, setTemplateList] = useState([]);
  const { id } = useSelector((state) => state.userInfo);

  const fetchTemplates = async () => {
    const loadId = toast.loading("fetching...");
    try {
      const res = await getTemplateByUserId(id);
      setTemplateList(res.data);
      toast.dismiss(loadId);
    } catch (error) {
      toast.dismiss(loadId);
      toast.error("Something wrong while fetching templates");
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTemplates();
    }
  }, [id]);

  return (
    <div>
      <div className="pt-5 flex justify-center items-center">
        <h1>Template Management</h1>
      </div>
      <div>
        <TemplateTableList
          templateList={templateList}
          fetchTemplate={fetchTemplates}
        />
      </div>
    </div>
  );
};

export default TemplateManageByUser;
