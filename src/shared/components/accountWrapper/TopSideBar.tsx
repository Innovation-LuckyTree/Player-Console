import { FC, useEffect, useRef, useState } from "react";
import { UserInfo } from "../../../pages/account/hooks/UserInfo";
import { getImageString } from "../../../services/uploadService";

export const TopSideBar: FC = () => {
  const { userInfo } = UserInfo();
  const [propImg, setPropImg] = useState<string>("");
  const hasLoadedImage = useRef(false);

  useEffect(() => {
    const selfiePath = userInfo?.selfiePath;

    if (
      selfiePath &&
      selfiePath.trim() !== "" &&
      !hasLoadedImage.current
    ) {
      hasLoadedImage.current = true;
      getImageString(selfiePath)
        .then((resp) => {
          setPropImg(resp.data);
        })
        .catch((err) => {
          console.error("Image fetch failed", err);
          hasLoadedImage.current = false;
        });
    }
  }, [userInfo?.selfiePath]);

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-flex">
          <div className="avatar">
            {propImg && <img src={propImg} alt="prop" />}
          </div>
          <div>
            <div style={{ marginBottom: "10px" }}>
              {userInfo?.fullname || "..."}
            </div>
            <span className={`badge ${userInfo?.isVerified ? "success" : "pending"}`}>
              {userInfo?.isVerified ? "Verified" : "Pending"}
            </span>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-card-flex">
            <span>ID:</span>
            <span>{userInfo ? String(userInfo.accountInfoId).padStart(15, "0") : "..."}</span>
          </div>
          <div className="profile-card-flex">
            <span>DEFAULT</span>
            <span className="badge vip">VIP</span>
          </div>
        </div>
      </div>

      <div className="credits-card">
        <span>Credits</span>
        <strong>PHP 1250.43</strong>
      </div>
    </>
  );
};
