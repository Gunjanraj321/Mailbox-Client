import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setInboxMails, setSentMails } from "../Redux/mailSlice";

const useFetchMail = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.isToken);

  const inboxMails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/mail/fetch`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const newMail = response.data.mails;
      dispatch(setInboxMails(newMail));
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  const sentMails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/mail/sent`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const newMail = response.data.mails;
      dispatch(setSentMails(newMail));
    } catch (error) {
      console.error("Error fetching sent mails:", error);
    }
  };

  return { sentMails, inboxMails };
};

export default useFetchMail;
