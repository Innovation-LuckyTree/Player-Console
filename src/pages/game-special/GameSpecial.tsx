import { HomeFilled } from "@ant-design/icons";
import { Button} from "antd";
import {useRef, type FC } from "react";
import { Link, useParams } from "react-router-dom";

export const GameSpecialWrapper: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {gameName} = useParams();
  console.log(gameName);

  if(gameName)

  return (
      <div className="w-screen h-screen relative overflow-hidden">
        <iframe
          src={gameName == "double-spin"? "https://roulette-cd8a8.web.app/#/game":""}
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