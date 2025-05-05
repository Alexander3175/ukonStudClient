import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const ServerChecker = ({ children }: IProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function CheckServer() {
      try {
        const fetchCheckServer = await fetch("http://localhost:8080/api/ping");
        if (!fetchCheckServer.ok) {
          navigate("/server-down");
        } else {
          navigate("/");
        }
      } catch {
        navigate("/server-down");
      }
    }
    CheckServer();
  }, [navigate]);

  return children;
};
export default ServerChecker;
