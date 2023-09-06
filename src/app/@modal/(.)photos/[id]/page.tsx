import Frame from "@/components/frame/Frame";
import swagPhotos, { Photo } from "@/photos";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photos = swagPhotos;
  const photo: Photo = photos.find((p) => p.id === photoId)!;

  return <Frame photo={photo} />;
}
