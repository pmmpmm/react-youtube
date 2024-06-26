import { Link } from "react-router-dom";
import { VideoItem } from "@/domain/Video";
import { regexReplace } from "@/common/RegexUtil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const VideoCard = ({ video }: { video: VideoItem }) => {
  const { id } = video;
  const { channelTitle, publishedAt, title, thumbnails } = video.snippet;

  const channerColor = `rgb(${Math.floor(Math.random() * 128 + 100)},${Math.floor(
    Math.random() * 128 + 100
  )},${Math.floor(Math.random() * 128 + 100)})`;
  return (
    <li>
      <Link to={`/videos/watch?v=${id}`} state={{ video }} className="flex flex-col">
        <div className="flex justify-center items-start w-full">
          <div className={`w-full rounded-2xl  overflow-hidden aspect-video`}>
            <img src={`${thumbnails.medium.url}`} className="w-full h-full object-cover" alt="섬네일 이미지" />
          </div>
        </div>
        <div className="flex items-start pt-2">
          <div
            className="flex-none w-[2rem] h-[2rem] mr-2 text-lg font-bold text-white text-center leading-[2rem] rounded-full overflow-hidden"
            style={{ backgroundColor: `${channerColor}` }}
          >
            {channelTitle.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-base-100 dark:font-semibold mb-1 text-base leading-5 line-clamp-2 break-all">
              {regexReplace(title)}
            </p>
            <div>
              <div
                className="flex-none w-[2rem] h-[2rem] mr-2 text-lg font-bold text-white text-center leading-[2rem] rounded-full overflow-hidden hidden"
                style={{ backgroundColor: `${channerColor}` }}
              >
                {channelTitle.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-base-500 font-normal leading-5">{channelTitle}</p>
            </div>
            <p className="text-sm text-base-500 font-normal leading-5">{dayjs(publishedAt).fromNow()}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoCard;
