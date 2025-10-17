import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {
  const { id, user, images = [], files = [], ...rest } = productLike;

  const isCreating = id === "new";

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  // Preparar las imagenes
  if (files) {
    const newImageNames = await uploadFiles(files);
    images.push(...newImageNames);
  }

  const imageToSave = images.map((image) => {
    if (image.includes("http")) return image.split("/").pop() || "";
    return image;
  });

  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...rest,
      images: imageToSave,
    },
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}}`;
    }),
  };
};

export interface FileUploadREsponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await tesloApi<FileUploadREsponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });
    return data.fileName;
  });

  const uploadedFileNames = await Promise.all(uploadPromises);
  return uploadedFileNames;
};
