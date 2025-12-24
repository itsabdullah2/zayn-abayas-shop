type TVariant = {
  id: string;
  name: string;
  created_at: Date;
};

export const getColorName = (colorId: string, colors: TVariant[]) =>
  colors.find((c) => c.id === colorId)?.name || "غير معروف";

export const getSizeName = (sizeId: string, sizes: TVariant[]) =>
  sizes.find((s) => s.id === sizeId)?.name || "غير معروف";
