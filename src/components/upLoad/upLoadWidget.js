import React, { useCallback } from "react";
//////////////////////////Cloudinary//////////////////////////////
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { selectAuthData } from "../../redux/selectos.tsx";
import { useCustomSelector, useCustomDispatch } from "../../hooks/store.tsx";
import { fetchAuthMe, fetchDeleteAvatar, fetchUpdateInfo } from "../../redux/slices/authSlice.tsx";
// import { fetchGetContetn, fetchUpdateContent } from "../../redux/slices/contentSlice";
// import Avatar from "../../assets/png/avatar.png";
import s from "./UploadWidget.module.scss";
import { Navigate } from "react-router-dom";



export const UploadWidget = ({ ...props }) => {
  const dispatch = useCustomDispatch();
  const authState = useCustomSelector(selectAuthData);
  //   const contentState = useCustomSelector(selectContentData);
  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const [avatar, setAvatar] = React.useState(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnd2lc6qw",
    },
  });
  
  React.useEffect(() => {
    if (authState.isLoading === 'loaded') {
      setAvatar(authState.data?.user.avatar);
    }else{
      dispatch(fetchAuthMe())
    }
  }, [dispatch, authState.isLoading, authState.data?.user.avatar]);

  const upload = useCallback(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dnd2lc6qw',
      uploadPreset: 'xzmheeky',
      sources: [
        "local",
        "camera",
        "google_drive",
        "url"
      ],
    }, function (error, result) {
      try {
        const photoId = result.info.public_id;
        if (photoId) {
          console.log(avatar, '<<')
          const data = { id: authState?.data?.user?.id, avatar: photoId };
          dispatch(fetchDeleteAvatar(avatar))
          setTimeout(() => {
            dispatch(fetchUpdateInfo({ ...data }));
          }, 500)
        }
      } catch (e) {
        console.log(error);
      }
    });
    widgetRef.current.open()
  },[dispatch, avatar, authState?.data?.user?.id])

  const defaultAvatar = "https://res.cloudinary.com/dnd2lc6qw/image/upload/v1700142769/yiphqaz26efk5rmvzzaq.png";
  const userAvatar = cld.image(avatar ? avatar : defaultAvatar).format('auto').quality('auto');

  return (
    <>
      {
        authState.data && authState.data.user.avatar ?
          <AdvancedImage
            className={s.accaunt__avatar}
            onClick={() => upload()}
            cldImg={userAvatar}
          />
          :
          <img
            className={s.accaunt__avatar}
            src={defaultAvatar}
            alt="avatar"
            onClick={() => upload()}
          />
      }
    </>
  )
}


