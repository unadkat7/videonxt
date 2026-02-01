import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const auth = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    });

    // 👇 RETURN FLAT OBJECT (IMPORTANT)
    return Response.json({
      token: auth.token,
      signature: auth.signature,
      expire: auth.expire,
    });
  } catch (error) {
    return Response.json(
      { error: "Authentication for ImageKit failed" },
      { status: 500 }
    );
  }
}
