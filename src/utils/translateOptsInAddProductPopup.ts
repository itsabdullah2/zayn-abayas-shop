export const translateCategoriesOpts = (category: string) => {
  let translatedCategory;
  switch (category) {
    case "luxury":
      translatedCategory = "فاخرة";
      break;
    case "modern":
      translatedCategory = "عصرية";
      break;
    case "classic":
      translatedCategory = "كلاسيكية";
      break;
    default:
      translatedCategory = category;
      break;
  }
  return translatedCategory;
};

export const translateVariantsOpts = (color: string) => {
  let translatedColor;

  switch (color) {
    case "white":
      translatedColor = "أبيض";
      break;
    case "black":
      translatedColor = "أسود";
      break;
    default:
      translatedColor = color;
      break;
  }

  return translatedColor;
};
