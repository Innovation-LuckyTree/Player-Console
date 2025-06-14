import { HomeFilled } from "@ant-design/icons";
import { Button} from "antd";
import { useEffect, useRef, type FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useGameLink } from "./hooks/useGameLink";

export const GameWrapper: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {gameId} = useParams();
  const { gameLink, getGameDetails } = useGameLink();
  
  useEffect(() => {
    getGameDetails(gameId??"");
  }, []);

  return (
      <div className="w-screen h-screen relative overflow-hidden">
        <iframe
          src={gameLink}
          className="w-screen h-screen border-none"
          allowFullScreen
          title="Embedded Content"
          ref={iframeRef}
        />
        <Link to="/">
          <Button shape="circle" size="large" icon={<HomeFilled/>} style={{position:"absolute", bottom: 16, right:16}}/>
        </Link>
      </div>
  );
};