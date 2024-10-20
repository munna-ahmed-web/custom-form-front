import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTemplateByUserId } from "../../api/templateRequest";
import toast from "react-hot-toast";
import TemplateTableList from "../../components/template/TemplateTableList";

const TemplateManageByUser = () => {
  const [templateList, setTemplateList] = useState([]);
  const { id } = useSelector((state) => state.userInfo);

  const fetchTemplates = async () => {
    try {
      const loadId = toast.loading("fetching...");
      const res = await getTemplateByUserId(id);
      toast.dismiss(loadId);
      setTemplateList(res.data);
    } catch (error) {
      toast.dismiss(loadId);
      toast.error("Something wrong");
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
