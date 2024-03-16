export function getImage(photoUrl: string | undefined | null) {
  return photoUrl
    ? `${import.meta.env.FILE_BASE_URL}${photoUrl}`
    : "https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
}