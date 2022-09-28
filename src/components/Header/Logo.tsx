import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Logo() {
  const router = useRouter();
  return (
    <Image
      src="https://i.ibb.co/85mfFwL/1634353681075-removebg-preview.png"
      cursor="pointer"
      w={150}
      onClick={() => router.reload()}
    />
  );
}
