import fs from "fs/promises";
import path from "path";

type UploadAssetArgs = {
  phone: string;
  file: File;
  subfolder: string;
};

export async function uploadAsset(
  args: UploadAssetArgs
): Promise<string | null> {
  try {
    const { file, phone, subfolder } = args;
    const filepath = path.join("upload", phone, subfolder, file.name);
    const distPath = path.join(process.cwd(), "public", filepath);
    await fs.writeFile(distPath, Buffer.from(await file.arrayBuffer()));
    return filepath;
  } catch (err) {
    return null;
  }
}
