import { useImage } from "react-image";

function Image({ src }) {
  const { srcs } = useImage({
    srcList: src,
  });

  return <img src={srcs} />;
}

export default Image;
