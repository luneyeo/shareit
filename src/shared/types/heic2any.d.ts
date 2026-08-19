declare module "heic2any" {
  type Heic2anyOptions = {
    blob: Blob;
    toType?: "image/jpeg" | "image/png" | "image/gif";
    quality?: number;
  };

  export default function heic2any(options: Heic2anyOptions): Promise<Blob | Blob[]>;
}
